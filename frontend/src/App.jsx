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
import MainDashboard from './components/MainDashboard';

// Páginas
function HomePage() {
  const navigate = useNavigate();
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

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
            <button
              onClick={() => setShowAboutModal(true)}
              className="border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sobre o Sistema
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">© 2025 AtendaX - Sistema de Treinamento</p>
          </div>

          {/* About System Modal */}
          {showAboutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10,8 16,12 10,16 10,8"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sobre o Sistema AtendaX</h2>
                      <p className="text-gray-600 dark:text-gray-300">Plataforma de Treinamento Corporativo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAboutModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  {/* Introduction */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      O que é o AtendaX?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      O Sistema de Treinamento AtendaX é uma plataforma moderna e completa para gerenciamento de treinamentos corporativos,
                      desenvolvida com foco na experiência do usuário e controle rigoroso de progresso. Oferecemos uma solução inovadora
                      que combina tecnologia avançada com facilidade de uso.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Security */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-green-800 dark:text-green-300">Sistema Anti-Cheat</h4>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        Monitoramento avançado que detecta tentativas de burla, garantindo a integridade do processo de aprendizagem.
                      </p>
                    </div>

                    {/* Certificates */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-800 dark:text-purple-300">Certificação Automática</h4>
                      </div>
                      <p className="text-purple-700 dark:text-purple-400 text-sm">
                        Geração automática de certificados profissionais em PDF após conclusão completa dos treinamentos.
                      </p>
                    </div>

                    {/* Management */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-300">Gestão Completa</h4>
                      </div>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        Controle total de usuários, departamentos e conteúdos com diferentes níveis de permissão.
                      </p>
                    </div>

                    {/* Accessibility */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-orange-800 dark:text-orange-300">Acessibilidade</h4>
                      </div>
                      <p className="text-orange-700 dark:text-orange-400 text-sm">
                        Interface adaptativa com suporte para daltonismo, modo escuro e navegação por teclado.
                      </p>
                    </div>
                  </div>


                  {/* Developer */}
                  <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Desenvolvido por</h3>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">Yan Mendes Matos</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Desenvolvedor Full Stack especializado em soluções corporativas</p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-center rounded-b-2xl border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => {
                      setShowAboutModal(false);
                      navigate('/login');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Fazer Login
                  </button>
                  <button
                    onClick={() => setShowAboutModal(false)}
                    className="border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 py-3 px-6 rounded-lg font-medium transition-all duration-300"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          )}

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

        {/* Dashboard Específico do Usuário */}
        <div className="mt-8">
          <MainDashboard />
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