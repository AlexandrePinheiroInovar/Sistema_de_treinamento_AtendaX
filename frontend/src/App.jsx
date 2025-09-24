import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import backgroundImage from './assets/image/1_backgroundAtendax.jpg';

// Styles
import './styles/accessibility.css';

// Contexts
import { AuthProvider, useAuth } from './contexts/SimpleAuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Componentes
import UserManagement from './components/UserManagement';
import VideoTraining from './components/VideoTraining';
import Certification from './components/Certification';
import Reports from './components/Reports';
import ThemeSettings from './components/ThemeSettings';

// Páginas
function HomePage() {
  const navigate = useNavigate();
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Theme Settings Button */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => {
                console.log('Button clicked!');
                setShowThemeSettings(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              title="Configurações de Tema"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Sistema de Treinamento
              <span className="text-blue-600 dark:text-blue-400 block">AtendaX</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Plataforma completa de treinamento com controle de progresso e certificação
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

            {/* Gestão de Usuários */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Gestão de Usuários</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">Sistema completo para admins e usuários</p>
            </div>

            {/* Vídeos de Treinamento */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Vídeos de Treinamento</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">Player integrado com controle de progresso</p>
            </div>

            {/* Certificação */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-purple-700 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Certificação</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">Certificado automático após conclusão</p>
            </div>

            {/* Dashboard */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-orange-700 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">Acompanhamento de progresso em tempo real</p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Acessar Sistema
            </button>
            <button className="border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Sobre o Sistema
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">© 2024 AtendaX - Sistema de Treinamento</p>
          </div>

          {/* Theme Settings Modal */}
          <ThemeSettings
            isOpen={showThemeSettings}
            onClose={() => setShowThemeSettings(false)}
          />

        </div>
      </div>
    </div>
  );
}

// Página de Login
function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
          transform: 'scale(1.1)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-blue-800/40"></div>

      {/* Theme Settings Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            console.log('Login button clicked!');
            setShowThemeSettings(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          title="Configurações de Tema"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <div className="relative max-w-md w-full space-y-8 z-10">

        {/* Header */}
        <div className="text-center">
          <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/20">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16 10,8"/>
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Acesso ao Sistema
          </h2>
          <p className="text-white/90 drop-shadow">
            Sistema de Treinamento AtendaX
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
            </button>
          </form>

          {/* Credenciais de Teste */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Credenciais de Teste:</h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div><strong>Admin:</strong> admin@atendax.com / admin123</div>
                <div><strong>Supervisor:</strong> supervisor@atendax.com / super123</div>
                <div><strong>Usuário:</strong> usuario@atendax.com / user123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Settings Modal */}
        <ThemeSettings
          isOpen={showThemeSettings}
          onClose={() => setShowThemeSettings(false)}
        />

      </div>
    </div>
  );
}

// Dashboard
function DashboardPage() {
  const { user, logout, canManageUsers, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">

        {/* Theme Settings Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => {
              console.log('Dashboard button clicked!');
              setShowThemeSettings(true);
            }}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            title="Configurações de Tema"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard AtendaX</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Bem-vindo, <span className="font-semibold">{user?.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    user?.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user?.role === 'supervisor' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user?.role === 'admin' ? 'Administrador' :
                     user?.role === 'supervisor' ? 'Supervisor' : 'Usuário'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/')}
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Página Inicial
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Gestão de Usuários - Apenas Admin/Supervisor */}
          {canManageUsers() && (
            <div
              onClick={() => navigate('/users')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Gestão de Usuários</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Criar e gerenciar usuários do sistema</p>
              <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {isAdmin() ? 'Admin' : 'Supervisor'}
                </span>
              </div>
            </div>
          )}

          {/* Vídeos de Treinamento */}
          <div
            onClick={() => navigate('/videos')}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Vídeos de Treinamento</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Assistir e gerenciar conteúdo</p>
          </div>

          {/* Certificação */}
          <div
            onClick={() => navigate('/certifications')}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-700 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Certificação</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Gerar e baixar certificados</p>
          </div>

          {/* Relatórios */}
          <div
            onClick={() => navigate('/reports')}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-orange-700 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Relatórios</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Visualizar métricas e estatísticas</p>
          </div>

        </div>

        {/* Theme Settings Modal */}
        <ThemeSettings
          isOpen={showThemeSettings}
          onClose={() => setShowThemeSettings(false)}
        />

      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/videos" element={<VideoTraining />} />
          <Route path="/certifications" element={<Certification />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;