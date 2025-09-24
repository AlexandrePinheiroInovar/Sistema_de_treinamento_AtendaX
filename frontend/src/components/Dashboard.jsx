import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SimpleAuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, logout, canManageUsers, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard PrismX</h1>
                <p className="text-gray-600">
                  Bem-vindo, <span className="font-semibold">{userData?.name || 'Usuário'}</span>
                  {userData?.role && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      userData.role === 'admin' ? 'bg-red-100 text-red-700' :
                      userData.role === 'supervisor' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {userData.role === 'admin' ? 'Administrador' :
                       userData.role === 'supervisor' ? 'Supervisor' : 'Usuário'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBackToHome}
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

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Gestão de Usuários - Apenas Admin/Supervisor */}
          {canManageUsers() && (
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Gestão de Usuários</h3>
              <p className="text-gray-600 text-sm">Criar e gerenciar usuários do sistema</p>
              <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {isAdmin() ? 'Admin' : 'Supervisor'}
                </span>
              </div>
            </div>
          )}

          {/* Vídeos de Treinamento */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Vídeos de Treinamento</h3>
            <p className="text-gray-600 text-sm">Assistir e gerenciar conteúdo</p>
          </div>

          {/* Certificação */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Certificação</h3>
            <p className="text-gray-600 text-sm">Acompanhar progresso e certificados</p>
          </div>

          {/* Relatórios */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Relatórios</h3>
            <p className="text-gray-600 text-sm">Visualizar métricas e estatísticas</p>
          </div>

        </div>

        {/* Status Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Status do Sistema</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Sistema Online</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Autenticação Ativa</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Banco de Dados Conectado</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Login realizado com sucesso!</p>
                  <p>Você está conectado ao Sistema de Treinamento PrismX.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;