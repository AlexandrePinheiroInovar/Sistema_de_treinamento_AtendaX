# 🎓 Sistema de Treinamento AtendaX

> Plataforma completa de treinamento corporativo com controle de progresso, certificação automática e sistema anti-cheat.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Firebase](https://img.shields.io/badge/Firebase-9.17.0-orange?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2.6-blue?logo=tailwindcss)

## 📋 Sobre o Projeto

O Sistema de Treinamento AtendaX é uma plataforma moderna e completa para gerenciamento de treinamentos corporativos, desenvolvida com foco na experiência do usuário e controle rigoroso de progresso. O sistema oferece recursos avançados de monitoramento, certificação automática e interface adaptável para diferentes necessidades de acessibilidade.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação Segura**: Sistema completo com Firebase Auth
- 👥 **Gestão de Usuários**: Controle de roles (Admin, Supervisor, Usuário)
- 🎥 **Player de Vídeo Avançado**: Integração com YouTube API e sistema anti-cheat
- 📊 **Dashboard Intuitivo**: Acompanhamento de progresso em tempo real
- 🏆 **Certificação Automática**: Geração de certificados PDF após conclusão
- 🌙 **Modo Escuro**: Interface adaptável com temas personalizáveis
- ♿ **Acessibilidade**: Design inclusivo para daltonismo e outras necessidades
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop e mobile

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal
- **Vite** - Build tool moderna e rápida
- **TailwindCSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento SPA
- **Firebase SDK** - Autenticação e banco de dados
- **jsPDF + html2canvas** - Geração de certificados

### Backend
- **Node.js + Express** - Server e API REST
- **Firebase Admin** - Gerenciamento server-side
- **CORS + Helmet** - Segurança e proteção
- **Rate Limiting** - Controle de taxa de requisições
- **JWT** - Tokens de autenticação

### Infraestrutura
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Authentication** - Sistema de autenticação
- **Firebase Hosting** - Hospedagem web
- **GitHub Actions** - CI/CD (planejado)

## 🏗️ Arquitetura do Sistema

```
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Context API (Auth, Theme)
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── assets/          # Imagens e recursos
│   │   └── styles/          # Estilos globais
│   └── public/              # Arquivos estáticos
├── backend/                 # API Node.js
│   ├── server.js           # Servidor principal
│   ├── routes/             # Rotas da API
│   └── middleware/         # Middlewares personalizados
└── docs/                   # Documentação
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Conta no Firebase
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/YanMM50/Sistema_de_treinamento_AtendaX.git
cd Sistema_de_treinamento_AtendaX
```

### 2. Configuração do Firebase
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Configure Authentication (Email/Password)
3. Crie um banco Firestore
4. Obtenha as chaves de configuração

### 3. Configuração do Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações Firebase
npm run dev
```

### 4. Configuração do Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite o .env com suas configurações Firebase
npm run dev
```

### 5. Aplicar Regras do Firestore
```bash
firebase deploy --only firestore:rules
```

## 🚀 Como Usar

1. **Acesse**: http://localhost:5173
2. **Login inicial**: Use as credenciais de teste do SETUP.md
3. **Administração**: Gerencie usuários e conteúdos via dashboard admin
4. **Treinamentos**: Usuários podem assistir vídeos e gerar certificados

## 🎨 Funcionalidades em Destaque

### Sistema Anti-Cheat
- Detecção de mudança de aba/janela
- Controle de velocidade de reprodução
- Monitoramento de progresso em tempo real
- Validação server-side do progresso

### Certificação Automática
- Geração automática após 100% de conclusão
- Design profissional em PDF
- QR Code para validação
- Histórico de certificados

### Acessibilidade
- Paleta de cores para daltonismo
- Suporte a leitores de tela
- Navegação por teclado
- Contraste otimizado

## 📱 Screenshots

*Em breve - Screenshots da aplicação serão adicionados*

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Yan Mendes Matos**
- GitHub: [@YanMM50](https://github.com/YanMM50)
- Email: yanmendes50@gmail.com

---

### 📈 Status do Projeto

🚧 **Em Desenvolvimento Ativo** - Novas funcionalidades sendo adicionadas regularmente

### 🔮 Próximas Funcionalidades

- [ ] Sistema de notificações push
- [ ] Integração com outros provedores de vídeo
- [ ] Relatórios avançados com gráficos
- [ ] API pública para integrações
- [ ] App mobile (React Native)
- [ ] Sistema de gamificação

### 📊 Métricas do Projeto

- ⭐ Stars: Em crescimento
- 🍴 Forks: Aberto para colaboração
- 🐛 Issues: Monitoramento ativo
- 📈 Commits: Desenvolvimento contínuo

---

<div align="center">

**Desenvolvido com ❤️ por Yan Mendes Matos**

[⬆ Voltar ao topo](#-sistema-de-treinamento-atendax)

</div>