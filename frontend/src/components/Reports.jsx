import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SimpleAuthContext';
import ThemeSettings from './ThemeSettings';

const Reports = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30'); // dias
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedReport, setSelectedReport] = useState('progress'); // progress, engagement, admin
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  // Dados mockados para demonstração
  const [reportData] = useState({
    // KPIs principais
    totalUsers: 156,
    activeUsers: 124,
    completedCourses: 89,
    avgCompletionTime: 4.2, // dias

    // Progresso por usuário
    userProgress: [
      { id: 1, name: 'João Silva', email: 'joao@empresa.com', module: 'Cadastro de Cliente', progress: 100, timeSpent: 180, completedAt: '2024-01-15', certificate: true },
      { id: 2, name: 'Maria Santos', email: 'maria@empresa.com', module: 'Vendas', progress: 75, timeSpent: 135, completedAt: null, certificate: false },
      { id: 3, name: 'Pedro Costa', email: 'pedro@empresa.com', module: 'Comunicação', progress: 45, timeSpent: 90, completedAt: null, certificate: false },
      { id: 4, name: 'Ana Oliveira', email: 'ana@empresa.com', module: 'Gestão de Usuários', progress: 100, timeSpent: 210, completedAt: '2024-01-18', certificate: true },
      { id: 5, name: 'Carlos Lima', email: 'carlos@empresa.com', module: 'Vendas', progress: 90, timeSpent: 160, completedAt: null, certificate: false },
      { id: 6, name: 'Lucia Mendes', email: 'lucia@empresa.com', module: 'Cadastro de Cliente', progress: 60, timeSpent: 95, completedAt: null, certificate: false },
      { id: 7, name: 'Roberto Silva', email: 'roberto@empresa.com', module: 'Vendas', progress: 0, timeSpent: 0, completedAt: null, certificate: false },
      { id: 8, name: 'Patricia Lima', email: 'patricia@empresa.com', module: 'Comunicação', progress: 0, timeSpent: 0, completedAt: null, certificate: false },
      { id: 9, name: 'Fernando Costa', email: 'fernando@empresa.com', module: 'Gestão de Usuários', progress: 0, timeSpent: 0, completedAt: null, certificate: false },
    ],

    // Dados para gráficos
    progressByModule: [
      { module: 'Cadastro de Cliente', completed: 45, inProgress: 23, notStarted: 12 },
      { module: 'Vendas', completed: 38, inProgress: 31, notStarted: 15 },
      { module: 'Comunicação', completed: 42, inProgress: 18, notStarted: 20 },
      { module: 'Gestão de Usuários', completed: 35, inProgress: 25, notStarted: 18 },
    ],

    // Estatísticas por período
    dailyProgress: [
      { date: '2024-01-15', newCompletions: 8, activeUsers: 45 },
      { date: '2024-01-16', newCompletions: 12, activeUsers: 52 },
      { date: '2024-01-17', newCompletions: 6, activeUsers: 38 },
      { date: '2024-01-18', newCompletions: 15, activeUsers: 61 },
      { date: '2024-01-19', newCompletions: 9, activeUsers: 43 },
    ],

    // Dados de Engagement
    engagement: {
      mostWatchedVideos: [
        { id: 1, title: 'Introdução ao AtendaX', module: 'Cadastro de Cliente', views: 145, avgWatchTime: 8.2, completionRate: 92 },
        { id: 2, title: 'Processo de Vendas', module: 'Vendas', views: 132, avgWatchTime: 12.5, completionRate: 87 },
        { id: 3, title: 'Comunicação Efetiva', module: 'Comunicação', views: 128, avgWatchTime: 9.8, completionRate: 89 },
        { id: 4, title: 'Gestão de Perfis', module: 'Gestão de Usuários', views: 98, avgWatchTime: 7.3, completionRate: 76 },
        { id: 5, title: 'Relatórios de Vendas', module: 'Vendas', views: 84, avgWatchTime: 15.2, completionRate: 68 },
      ],

      dropoffRates: [
        { module: 'Cadastro de Cliente', totalUsers: 80, dropoffs: 8, dropoffRate: 10 },
        { module: 'Vendas', totalUsers: 84, dropoffs: 18, dropoffRate: 21 },
        { module: 'Comunicação', totalUsers: 80, dropoffs: 12, dropoffRate: 15 },
        { module: 'Gestão de Usuários', totalUsers: 78, dropoffs: 22, dropoffRate: 28 },
      ],

      peakHours: [
        { hour: '08:00', users: 12 },
        { hour: '09:00', users: 28 },
        { hour: '10:00', users: 45 },
        { hour: '11:00', users: 52 },
        { hour: '14:00', users: 38 },
        { hour: '15:00', users: 41 },
        { hour: '16:00', users: 32 },
        { hour: '17:00', users: 18 },
      ],

      comments: [
        { videoId: 1, videoTitle: 'Introdução ao AtendaX', comments: 23, avgRating: 4.5 },
        { videoId: 2, videoTitle: 'Processo de Vendas', comments: 31, avgRating: 4.2 },
        { videoId: 3, videoTitle: 'Comunicação Efetiva', comments: 18, avgRating: 4.7 },
        { videoId: 4, videoTitle: 'Gestão de Perfis', comments: 15, avgRating: 3.9 },
        { videoId: 5, videoTitle: 'Relatórios de Vendas', comments: 8, avgRating: 4.1 },
      ]
    },

    // Dados Administrativos
    admin: {
      systemStats: {
        totalStorage: 45.8, // GB
        usedStorage: 28.3, // GB
        totalUsers: 156,
        activeUsers: 124,
        inactiveUsers: 32,
        totalVideos: 48,
        totalModules: 4,
        avgSessionTime: 35, // minutos
      },

      userActivity: [
        { date: '2024-01-15', logins: 89, newUsers: 5, sessionsTime: 2840 },
        { date: '2024-01-16', logins: 92, newUsers: 8, sessionsTime: 3120 },
        { date: '2024-01-17', logins: 76, newUsers: 3, sessionsTime: 2650 },
        { date: '2024-01-18', logins: 103, newUsers: 12, sessionsTime: 3580 },
        { date: '2024-01-19', logins: 87, newUsers: 7, sessionsTime: 2980 },
        { date: '2024-01-20', logins: 95, newUsers: 9, sessionsTime: 3240 },
        { date: '2024-01-21', logins: 82, newUsers: 4, sessionsTime: 2780 },
      ],

      certificates: {
        totalIssued: 89,
        thisMonth: 23,
        byModule: [
          { module: 'Cadastro de Cliente', issued: 25 },
          { module: 'Vendas', issued: 21 },
          { module: 'Comunicação', issued: 23 },
          { module: 'Gestão de Usuários', issued: 20 },
        ]
      },

      systemHealth: {
        uptime: 99.8, // %
        avgResponseTime: 245, // ms
        errorRate: 0.02, // %
        lastBackup: '2024-01-21 03:00',
      },

      topUsers: [
        { id: 1, name: 'João Silva', modulesCompleted: 4, totalTime: 720, certificates: 4 },
        { id: 2, name: 'Ana Oliveira', modulesCompleted: 4, totalTime: 680, certificates: 4 },
        { id: 3, name: 'Carlos Lima', modulesCompleted: 3, totalTime: 520, certificates: 3 },
        { id: 4, name: 'Maria Santos', modulesCompleted: 3, totalTime: 490, certificates: 3 },
        { id: 5, name: 'Pedro Costa', modulesCompleted: 2, totalTime: 380, certificates: 2 },
      ]
    }
  });

  const modules = [
    { value: 'all', label: 'Todos os Módulos' },
    { value: 'cadastro-cliente', label: 'Cadastro de Cliente' },
    { value: 'vendas', label: 'Vendas' },
    { value: 'comunicacao', label: 'Comunicação' },
    { value: 'gestao-usuarios', label: 'Gestão de Usuários' },
  ];

  // Filtrar dados baseado nos filtros selecionados
  const getFilteredData = () => {
    let filtered = reportData.userProgress;

    if (selectedModule !== 'all') {
      const moduleMap = {
        'cadastro-cliente': 'Cadastro de Cliente',
        'vendas': 'Vendas',
        'comunicacao': 'Comunicação',
        'gestao-usuarios': 'Gestão de Usuários'
      };
      filtered = filtered.filter(user => user.module === moduleMap[selectedModule]);
    }

    return filtered;
  };

  // Calcular estatísticas dos dados filtrados
  const getStats = () => {
    const filtered = getFilteredData();
    const completed = filtered.filter(user => user.progress === 100).length;
    const inProgress = filtered.filter(user => user.progress > 0 && user.progress < 100).length;
    const notStarted = filtered.filter(user => user.progress === 0).length;
    const avgProgress = filtered.reduce((sum, user) => sum + user.progress, 0) / filtered.length || 0;

    return { completed, inProgress, notStarted, avgProgress, total: filtered.length };
  };

  const stats = getStats();

  // Função para exportar dados (simulação)
  const exportData = (format) => {
    const filtered = getFilteredData();
    console.log(`Exportando ${filtered.length} registros para ${format}`);
    alert(`Relatório exportado para ${format.toUpperCase()}! \n${filtered.length} registros processados.`);
  };

  // Renderizar relatório de Progresso
  const renderProgressReport = () => {
    return (
      <>
        {/* KPIs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Em Progresso</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Não Iniciados</p>
                <p className="text-2xl font-bold text-red-600">{stats.notStarted}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.27 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Progresso por Módulo</h3>
          <div className="space-y-4">
            {reportData.progressByModule.map((module, index) => {
              const total = module.completed + module.inProgress + module.notStarted;
              const completedPercentage = (module.completed / total) * 100;
              const inProgressPercentage = (module.inProgress / total) * 100;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{module.module}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{total} usuários</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 flex overflow-hidden">
                    <div
                      className="bg-green-500 h-4 transition-all duration-300"
                      style={{ width: `${completedPercentage}%` }}
                      title={`${module.completed} concluídos`}
                    ></div>
                    <div
                      className="bg-yellow-500 h-4 transition-all duration-300"
                      style={{ width: `${inProgressPercentage}%` }}
                      title={`${module.inProgress} em progresso`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>✅ {module.completed} concluídos</span>
                    <span>⏳ {module.inProgress} em progresso</span>
                    <span>⭕ {module.notStarted} não iniciados</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detalhamento por Usuário</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Módulo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tempo (min)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Certificado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {getFilteredData().map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.module}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${user.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.timeSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.progress === 100
                          ? 'bg-green-100 text-green-800'
                          : user.progress > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {user.progress === 100 ? 'Concluído' : user.progress > 0 ? 'Em Progresso' : 'Não Iniciado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.certificate ? (
                        <span className="text-green-600">✅ Emitido</span>
                      ) : (
                        <span className="text-gray-400">⏳ Pendente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // Renderizar relatório de Engagement
  const renderEngagementReport = () => {
    return (
      <>
        {/* KPIs de Engagement */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vídeos Mais Assistidos</p>
                <p className="text-2xl font-bold text-purple-600">{reportData.engagement.mostWatchedVideos.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Taxa Média de Conclusão</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(reportData.engagement.mostWatchedVideos.reduce((sum, video) => sum + video.completionRate, 0) / reportData.engagement.mostWatchedVideos.length)}%
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Comentários Totais</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reportData.engagement.comments.reduce((sum, video) => sum + video.comments, 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avaliação Média</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(reportData.engagement.comments.reduce((sum, video) => sum + video.avgRating, 0) / reportData.engagement.comments.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Vídeos Mais Assistidos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Vídeos Mais Assistidos</h3>
          <div className="space-y-4">
            {reportData.engagement.mostWatchedVideos.map((video, index) => (
              <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{video.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{video.module}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">{video.views}</p>
                    <p className="text-gray-500 dark:text-gray-400">Visualizações</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">{video.avgWatchTime}min</p>
                    <p className="text-gray-500 dark:text-gray-400">Tempo Médio</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-green-600">{video.completionRate}%</p>
                    <p className="text-gray-500 dark:text-gray-400">Conclusão</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taxa de Abandono */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Taxa de Abandono por Módulo</h3>
          <div className="space-y-4">
            {reportData.engagement.dropoffRates.map((module, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{module.module}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{module.totalUsers} usuários iniciaram</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 flex overflow-hidden">
                  <div
                    className="bg-red-500 h-4 transition-all duration-300"
                    style={{ width: `${module.dropoffRate}%` }}
                    title={`${module.dropoffs} abandonaram (${module.dropoffRate}%)`}
                  ></div>
                  <div
                    className="bg-green-500 h-4 transition-all duration-300"
                    style={{ width: `${100 - module.dropoffRate}%` }}
                    title={`${module.totalUsers - module.dropoffs} concluíram`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>❌ {module.dropoffs} abandonaram ({module.dropoffRate}%)</span>
                  <span>✅ {module.totalUsers - module.dropoffs} concluíram ({100 - module.dropoffRate}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horários de Pico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Horários de Maior Engajamento</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {reportData.engagement.peakHours.map((hour, index) => {
              const maxUsers = Math.max(...reportData.engagement.peakHours.map(h => h.users));
              const intensity = (hour.users / maxUsers) * 100;

              return (
                <div key={index} className="text-center">
                  <div className="flex flex-col items-center justify-end h-24 mb-2">
                    <div
                      className="bg-blue-500 w-8 rounded-t transition-all duration-300"
                      style={{ height: `${Math.max(intensity, 10)}%` }}
                      title={`${hour.users} usuários às ${hour.hour}`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{hour.hour}</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{hour.users}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  // Renderizar relatório Administrativo
  const renderAdminReport = () => {
    return (
      <>
        {/* KPIs Administrativos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Usuários Totais</p>
                <p className="text-2xl font-bold text-blue-600">{reportData.admin.systemStats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Certificados Emitidos</p>
                <p className="text-2xl font-bold text-green-600">{reportData.admin.certificates.totalIssued}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Uptime do Sistema</p>
                <p className="text-2xl font-bold text-purple-600">{reportData.admin.systemHealth.uptime}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Armazenamento</p>
                <p className="text-2xl font-bold text-orange-600">{reportData.admin.systemStats.usedStorage}GB</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">de {reportData.admin.systemStats.totalStorage}GB</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Atividade do Sistema */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Atividade do Sistema (Últimos 7 dias)</h3>
          <div className="grid grid-cols-7 gap-4">
            {reportData.admin.userActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-600 dark:text-gray-300">{new Date(day.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                  <p className="text-lg font-bold text-blue-600">{day.logins}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">logins</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">+{day.newUsers}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">novos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status do Sistema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Saúde do Sistema */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Saúde do Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Tempo de Resposta Médio</span>
                <span className="font-semibold text-green-600">{reportData.admin.systemHealth.avgResponseTime}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Taxa de Erro</span>
                <span className="font-semibold text-green-600">{reportData.admin.systemHealth.errorRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Último Backup</span>
                <span className="font-semibold text-gray-900 dark:text-white">{reportData.admin.systemHealth.lastBackup}</span>
              </div>
              <div className="pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Uso de Armazenamento</span>
                  <span className="font-semibold">{Math.round((reportData.admin.systemStats.usedStorage / reportData.admin.systemStats.totalStorage) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(reportData.admin.systemStats.usedStorage / reportData.admin.systemStats.totalStorage) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificados por Módulo */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Certificados por Módulo</h3>
            <div className="space-y-4">
              {reportData.admin.certificates.byModule.map((module, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{module.module}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(module.issued / Math.max(...reportData.admin.certificates.byModule.map(m => m.issued))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-green-600 w-8">{module.issued}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Usuários */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Usuários por Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Posição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Módulos Completos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tempo Total (min)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Certificados
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {reportData.admin.topUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.modulesCompleted}/4
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.totalTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {user.certificates} emitidos
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">

        {/* Theme Settings Button */}
        <button
          onClick={() => setShowThemeSettings(true)}
          className="fixed top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          title="Configurações de Tema"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">Relatórios de Treinamento</h1>
                <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300">Acompanhe o progresso e performance da equipe</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => exportData('excel')}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Excel
              </button>
              <button
                onClick={() => exportData('pdf')}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar com Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Filtros</h3>

              {/* Período */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Período</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="7">Últimos 7 dias</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="365">Último ano</option>
                </select>
              </div>

              {/* Módulo */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Módulo AtendaX</label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {modules.map(module => (
                    <option key={module.value} value={module.value}>{module.label}</option>
                  ))}
                </select>
              </div>

              {/* Tipo de Relatório */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Relatório</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="progress"
                      checked={selectedReport === 'progress'}
                      onChange={(e) => setSelectedReport(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">Progresso de Treinamento</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="engagement"
                      checked={selectedReport === 'engagement'}
                      onChange={(e) => setSelectedReport(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">Engagement</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="admin"
                      checked={selectedReport === 'admin'}
                      onChange={(e) => setSelectedReport(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">Administrativo</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resumo Rápido</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Usuários Ativos:</span>
                  <span className="font-semibold text-green-600">{reportData.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Taxa de Conclusão:</span>
                  <span className="font-semibold text-blue-600">{Math.round((stats.completed / stats.total) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Progresso Médio:</span>
                  <span className="font-semibold text-purple-600">{Math.round(stats.avgProgress)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedReport === 'progress' && renderProgressReport()}
            {selectedReport === 'engagement' && renderEngagementReport()}
            {selectedReport === 'admin' && renderAdminReport()}
          </div>
        </div>
      </div>

      {/* Theme Settings Modal */}
      {showThemeSettings && (
        <ThemeSettings onClose={() => setShowThemeSettings(false)} />
      )}
    </div>
  );
};

export default Reports;