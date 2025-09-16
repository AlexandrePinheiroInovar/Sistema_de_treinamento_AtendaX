import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        {/* Logo */}
        <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10,8 16,12 10,16 10,8"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Treinamento AtendaX
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Plataforma completa de treinamento com controle de progresso e certificação
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gestão de Usuários</h3>
            <p className="text-sm text-gray-600">Sistema completo para admins e usuários</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Vídeos de Treinamento</h3>
            <p className="text-sm text-gray-600">Player integrado com controle de progresso</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Certificação</h3>
            <p className="text-sm text-gray-600">Certificado automático após conclusão</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
            <p className="text-sm text-gray-600">Acompanhamento de progresso em tempo real</p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 font-medium">Sistema Online e Funcionando!</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologias</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-1">
                Frontend
              </div>
              <p className="text-gray-600">React + Vite</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-1">
                Styling
              </div>
              <p className="text-gray-600">TailwindCSS</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium mb-1">
                Backend
              </div>
              <p className="text-gray-600">Node.js + Express</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-1">
                Database
              </div>
              <p className="text-gray-600">Firebase</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 AtendaX - Sistema de Treinamento</p>
          <p className="mt-1">Desenvolvido com React, TailwindCSS e Firebase</p>
        </div>
      </div>
    </div>
  );
}

export default App;