# 🚀 Setup do Sistema de Treinamento AtendaX

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase
- Git (opcional)

## 🔥 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nomeie o projeto (ex: `atendax-treinamento`)
4. Aceite os termos e crie o projeto

### 2. Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique na aba **Sign-in method**
3. Ative **Email/password**
4. Salve as configurações

### 3. Configurar Firestore

1. Vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Começar no modo de teste** (temporário)
4. Selecione uma região (preferencialmente próxima ao Brasil)
5. Crie o banco

### 4. Configurar Firebase Hosting (Opcional)

1. Vá em **Hosting**
2. Clique em **Começar**
3. Siga as instruções de instalação do Firebase CLI

### 5. Gerar Chaves do Projeto

#### Frontend (Web App):
1. Vá em **Configurações do projeto** (ícone de engrenagem)
2. Na aba **Geral**, role até **Seus aplicativos**
3. Clique em **Adicionar aplicativo** → **Web** (ícone </>)
4. Registre o aplicativo com nome "Frontend"
5. **Copie o código de configuração** que aparece

#### Backend (Service Account):
1. Vá em **Configurações do projeto**
2. Clique na aba **Contas de serviço**
3. Clique em **Gerar nova chave privada**
4. Escolha **JSON** e clique em **Gerar chave**
5. **Baixe o arquivo JSON** (mantenha seguro!)

## ⚙️ Configuração do Ambiente

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Firebase Configuration (Cole o conteúdo do arquivo JSON da Service Account)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Opcional - Database URL (se usando Realtime Database)
FIREBASE_DATABASE_URL=https://seu-projeto-default-rtdb.firebaseio.com/

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
```

Edite o arquivo `.env` com as configurações do seu Firebase Web App:

```env
# Firebase Configuration (do painel Web App)
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Instalação e Execução

### 1. Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Firestore Rules

Aplique as regras de segurança:

```bash
# Na raiz do projeto
firebase deploy --only firestore:rules
```

### 3. Executar o Sistema

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

O sistema estará disponível em:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 👤 Primeiro Acesso

### Criar Usuário Admin

Como o sistema não tem registro público, você precisa criar o primeiro admin diretamente no Firebase:

1. Acesse **Firebase Console** → **Authentication** → **Users**
2. Clique em **Add user**
3. Preencha:
   - Email: `admin@atendax.com` (ou seu email)
   - Password: `AtendaX2024!`
4. Salve o usuário

### Adicionar Dados do Admin no Firestore

1. Vá em **Firestore Database**
2. Crie a collection `users`
3. Adicione um documento com ID igual ao UID do usuário criado:

```json
{
  "name": "Administrador",
  "email": "admin@atendax.com",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Login no Sistema

1. Acesse http://localhost:5173
2. Faça login com:
   - **Email**: `admin@atendax.com`
   - **Senha**: `AtendaX2024!`

## 📱 Funcionalidades Disponíveis

### Para Admins:
- ✅ Dashboard com estatísticas
- ✅ Gerenciar usuários (criar, listar)
- ✅ Gerenciar vídeos (criar, listar)
- ✅ Monitorar progresso dos usuários

### Para Usuários:
- ✅ Dashboard pessoal
- ✅ Assistir vídeos com controle de progresso
- ✅ Gerar certificado (após 100% de conclusão)

## 🚀 Deploy em Produção

### Firebase Hosting

```bash
# Build do frontend
cd frontend
npm run build

# Deploy
firebase deploy
```

### Backend (Alternativas)

1. **Firebase Functions** (Recomendado)
2. **Vercel**
3. **Railway**
4. **DigitalOcean**

## 🔧 Solução de Problemas

### Erro: "Firebase Admin não inicializado"
- Verifique se o arquivo `.env` está configurado corretamente
- Confirme se a Service Account Key está válida

### Erro: "Firestore permission denied"
- Verifique se as regras do Firestore estão aplicadas
- Confirme se o usuário tem o role correto

### Erro: "YouTube video não carrega"
- Verifique se a URL do YouTube está correta
- Confirme se o vídeo é público

## 📞 Suporte

Para dúvidas sobre configuração:
1. Verifique a documentação do Firebase
2. Consulte os logs do navegador (F12)
3. Verifique os logs do servidor

---

## 📋 Checklist de Setup

- [ ] Projeto Firebase criado
- [ ] Authentication configurado (Email/Password)
- [ ] Firestore Database criado
- [ ] Chaves Firebase obtidas
- [ ] Arquivo `.env` do backend configurado
- [ ] Arquivo `.env` do frontend configurado
- [ ] Dependências instaladas
- [ ] Regras Firestore aplicadas
- [ ] Usuário admin criado
- [ ] Sistema rodando localmente
- [ ] Login realizado com sucesso

✨ **Parabéns! Seu Sistema de Treinamento AtendaX está pronto para uso!**