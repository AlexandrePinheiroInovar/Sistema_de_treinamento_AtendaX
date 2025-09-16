# Sistema de Treinamento AtendaX

Sistema web completo para treinamento com autenticação Firebase, gestão de usuários, reprodução de vídeos com controle de progresso e geração de certificados.

## 🏗️ Arquitetura

```
├── frontend/          # React + Vite + TailwindCSS
├── backend/           # Node.js + Express
├── firebase.json      # Configurações Firebase
└── README.md
```

## 🚀 Funcionalidades

### Autenticação e Usuários
- ✅ Login/Registro com Firebase Authentication
- ✅ Dois perfis: Admin e Usuário
- ✅ CRUD de usuários (somente Admin)

### Gestão de Vídeos
- ✅ CRUD de vídeos YouTube (somente Admin)
- ✅ Player responsivo com embed
- ✅ Controle de progresso (60% mínimo)

### Certificação
- ✅ Geração automática após conclusão
- ✅ Download em PDF
- ✅ Personalização com logo AtendaX

### Administração
- ✅ Dashboard para acompanhar progresso
- ✅ Relatórios de conclusão

## 🛠️ Tecnologias

- **Frontend**: React, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **PDF**: jsPDF, html2canvas
- **Deploy**: Firebase Hosting

## 📱 Responsividade

Sistema otimizado para:
- 🖥️ Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (até 767px)

## 🔧 Instalação

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend
```bash
cd backend
npm install
npm start
```

### 3. Firebase Setup
1. Criar projeto no Firebase Console
2. Ativar Authentication (Email/Password)
3. Configurar Firestore
4. Baixar arquivo de configuração
5. Adicionar variáveis de ambiente

## 📋 Estrutura do Banco (Firestore)

### Collections

#### users
```javascript
{
  id: "userId",
  name: "Nome do Usuário",
  email: "email@exemplo.com",
  role: "admin" | "user",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### videos
```javascript
{
  id: "videoId",
  title: "Título do Vídeo",
  description: "Descrição",
  youtubeUrl: "https://youtube.com/watch?v=...",
  duration: 300, // segundos
  order: 1,
  isActive: true,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### user_progress
```javascript
{
  id: "progressId",
  userId: "userId",
  videoId: "videoId",
  watchedSeconds: 180,
  completed: false,
  lastWatched: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### certificates
```javascript
{
  id: "certificateId",
  userId: "userId",
  userName: "Nome do Usuário",
  completedAt: timestamp,
  certificateUrl: "url-do-pdf",
  createdAt: timestamp
}
```

## 🔐 Regras de Segurança

- Usuários só acessam seus próprios dados
- Admins têm acesso completo ao sistema
- Validação de progresso de vídeo (60% mínimo)
- Certificados só após conclusão completa

## 🎯 Regras de Negócio

1. **Progresso de Vídeo**: Usuário deve assistir pelo menos 60% para marcar como concluído
2. **Certificado**: Liberado apenas após conclusão de todos os vídeos
3. **Acesso Admin**: Somente admins podem cadastrar usuários e vídeos
4. **Responsividade**: Interface adaptada para todos os dispositivos

## 📄 Licença

Projeto proprietário - AtendaX