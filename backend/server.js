import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Muitas solicitações deste IP, tente novamente em 15 minutos.'
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Firebase Admin initialization
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log('✅ Firebase Admin inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase Admin:', error.message);
  }
}

// Middleware de autenticação
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação necessário' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Buscar dados do usuário no Firestore
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(decodedToken.uid)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      ...userDoc.data()
    };

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar se é admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

// Rotas básicas
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sistema de Treinamento AtendaX API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rotas de usuários
app.get('/api/users', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const usersSnapshot = await admin.firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .get();

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/users', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { name, email, role = 'user' } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    // Criar usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: 'AtendaX2024!', // Senha padrão - usuário deve alterar
      displayName: name
    });

    // Salvar dados no Firestore
    const userData = {
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await admin.firestore()
      .collection('users')
      .doc(userRecord.uid)
      .set(userData);

    res.status(201).json({
      id: userRecord.uid,
      ...userData,
      message: 'Usuário criado com sucesso. Senha padrão: AtendaX2024!'
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rotas de vídeos
app.get('/api/videos', authenticateUser, async (req, res) => {
  try {
    const videosSnapshot = await admin.firestore()
      .collection('videos')
      .where('isActive', '==', true)
      .orderBy('order', 'asc')
      .get();

    const videos = videosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(videos);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/videos', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { title, description, youtubeUrl, duration, order } = req.body;

    if (!title || !youtubeUrl) {
      return res.status(400).json({ error: 'Título e URL do YouTube são obrigatórios' });
    }

    // Extrair ID do vídeo do YouTube
    const youtubeId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
    if (!youtubeId) {
      return res.status(400).json({ error: 'URL do YouTube inválida' });
    }

    const videoData = {
      title,
      description: description || '',
      youtubeUrl,
      youtubeId,
      duration: duration || 0,
      order: order || 0,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await admin.firestore()
      .collection('videos')
      .add(videoData);

    res.status(201).json({
      id: docRef.id,
      ...videoData
    });
  } catch (error) {
    console.error('Erro ao criar vídeo:', error);
    res.status(500).json({ error: 'Erro ao criar vídeo' });
  }
});

// Rotas de progresso
app.get('/api/progress', authenticateUser, async (req, res) => {
  try {
    const progressSnapshot = await admin.firestore()
      .collection('user_progress')
      .where('userId', '==', req.user.uid)
      .get();

    const progress = progressSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(progress);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/progress', authenticateUser, async (req, res) => {
  try {
    const { videoId, watchedSeconds } = req.body;

    if (!videoId || watchedSeconds === undefined) {
      return res.status(400).json({ error: 'Video ID e tempo assistido são obrigatórios' });
    }

    // Buscar vídeo para verificar duração
    const videoDoc = await admin.firestore()
      .collection('videos')
      .doc(videoId)
      .get();

    if (!videoDoc.exists) {
      return res.status(404).json({ error: 'Vídeo não encontrado' });
    }

    const video = videoDoc.data();
    const completed = watchedSeconds >= (video.duration * 0.6); // 60% do vídeo

    // Verificar se já existe progresso para este vídeo
    const existingProgressQuery = await admin.firestore()
      .collection('user_progress')
      .where('userId', '==', req.user.uid)
      .where('videoId', '==', videoId)
      .limit(1)
      .get();

    const progressData = {
      userId: req.user.uid,
      videoId,
      watchedSeconds,
      completed,
      lastWatched: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    let progressRef;

    if (!existingProgressQuery.empty) {
      // Atualizar progresso existente
      progressRef = existingProgressQuery.docs[0].ref;
      await progressRef.update(progressData);
    } else {
      // Criar novo progresso
      progressData.createdAt = admin.firestore.FieldValue.serverTimestamp();
      progressRef = await admin.firestore()
        .collection('user_progress')
        .add(progressData);
    }

    res.json({
      id: progressRef.id,
      ...progressData
    });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para verificar se usuário completou todos os vídeos
app.get('/api/certificate/eligibility', authenticateUser, async (req, res) => {
  try {
    // Buscar todos os vídeos ativos
    const videosSnapshot = await admin.firestore()
      .collection('videos')
      .where('isActive', '==', true)
      .get();

    // Buscar progresso do usuário
    const progressSnapshot = await admin.firestore()
      .collection('user_progress')
      .where('userId', '==', req.user.uid)
      .where('completed', '==', true)
      .get();

    const totalVideos = videosSnapshot.size;
    const completedVideos = progressSnapshot.size;
    const eligible = totalVideos > 0 && completedVideos === totalVideos;

    res.json({
      eligible,
      totalVideos,
      completedVideos,
      remainingVideos: totalVideos - completedVideos
    });
  } catch (error) {
    console.error('Erro ao verificar elegibilidade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para gerar certificado
app.post('/api/certificate', authenticateUser, async (req, res) => {
  try {
    // Verificar elegibilidade
    const eligibilityResponse = await fetch(`${req.protocol}://${req.get('host')}/api/certificate/eligibility`, {
      headers: { authorization: req.headers.authorization }
    });
    const eligibility = await eligibilityResponse.json();

    if (!eligibility.eligible) {
      return res.status(400).json({
        error: 'Usuário não completou todos os vídeos necessários',
        ...eligibility
      });
    }

    // Verificar se já existe certificado
    const existingCertQuery = await admin.firestore()
      .collection('certificates')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();

    let certificateData;

    if (!existingCertQuery.empty) {
      // Certificado já existe
      const existingCert = existingCertQuery.docs[0];
      certificateData = {
        id: existingCert.id,
        ...existingCert.data()
      };
    } else {
      // Criar novo certificado
      certificateData = {
        userId: req.user.uid,
        userName: req.user.name,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const certRef = await admin.firestore()
        .collection('certificates')
        .add(certificateData);

      certificateData.id = certRef.id;
    }

    res.json(certificateData);
  } catch (error) {
    console.error('Erro ao gerar certificado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Dashboard para admin - estatísticas
app.get('/api/admin/dashboard', authenticateUser, requireAdmin, async (req, res) => {
  try {
    // Contar usuários
    const usersSnapshot = await admin.firestore().collection('users').get();
    const totalUsers = usersSnapshot.size;

    // Contar vídeos
    const videosSnapshot = await admin.firestore()
      .collection('videos')
      .where('isActive', '==', true)
      .get();
    const totalVideos = videosSnapshot.size;

    // Contar certificados emitidos
    const certificatesSnapshot = await admin.firestore().collection('certificates').get();
    const totalCertificates = certificatesSnapshot.size;

    // Usuários que completaram pelo menos um vídeo
    const progressSnapshot = await admin.firestore()
      .collection('user_progress')
      .where('completed', '==', true)
      .get();

    const userProgress = {};
    progressSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (!userProgress[data.userId]) {
        userProgress[data.userId] = 0;
      }
      userProgress[data.userId]++;
    });

    const activeUsers = Object.keys(userProgress).length;
    const completionRate = totalUsers > 0 ? (totalCertificates / totalUsers * 100) : 0;

    res.json({
      totalUsers,
      totalVideos,
      totalCertificates,
      activeUsers,
      completionRate: Math.round(completionRate * 100) / 100
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});