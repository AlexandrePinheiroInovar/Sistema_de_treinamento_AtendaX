import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/SimpleAuthContext';
import { BarChart, LineChart, MetricCard } from '../charts/SimpleCharts';
import {
  PlayCircle,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  BookOpen,
  Calendar,
  Target,
  Star,
  ChevronRight,
  User
} from '../Icons';

const UserDashboard = () => {
  const { user } = useAuth();

  // Mock data for user dashboard
  const stats = {
    availableVideos: 32,
    completedVideos: 24,
    completionPercentage: 75,
    certificates: 3
  };

  const personalProgressData = [
    { label: 'Atendimento', value: 95 },
    { label: 'Vendas', value: 87 },
    { label: 'Produto', value: 82 },
    { label: 'SAC', value: 65 },
    { label: 'Compliance', value: 45 }
  ];

  const accessHistoryData = [
    { label: 'Dom', value: 2 },
    { label: 'Seg', value: 5 },
    { label: 'Ter', value: 8 },
    { label: 'Qua', value: 6 },
    { label: 'Qui', value: 9 },
    { label: 'Sex', value: 7 },
    { label: 'Sáb', value: 3 }
  ];

  const modules = [
    {
      title: 'Vídeos de Treinamento',
      description: 'Acesse todos os vídeos de treinamento disponíveis',
      icon: <PlayCircle className="h-6 w-6" />,
      color: 'blue',
      path: '/videos'
    },
    {
      title: 'Meus Certificados',
      description: 'Visualize e baixe seus certificados conquistados',
      icon: <Award className="h-6 w-6" />,
      color: 'purple',
      path: '/certificates'
    }
  ];

  const recentVideos = [
    { id: 1, title: 'Técnicas de Atendimento ao Cliente', progress: 100, completed: true, duration: 25, lastWatched: '2h atrás' },
    { id: 2, title: 'Vendas Consultivas', progress: 75, completed: false, duration: 30, lastWatched: '1d atrás' },
    { id: 3, title: 'Conhecimento do Produto', progress: 60, completed: false, duration: 20, lastWatched: '2d atrás' },
    { id: 4, title: 'SAC e Pós-Vendas', progress: 100, completed: true, duration: 15, lastWatched: '3d atrás' }
  ];

  const achievements = [
    { title: 'Primeira Conclusão', description: 'Concluiu seu primeiro treinamento', icon: '🎯', earned: true },
    { title: 'Sequência de 5', description: 'Assistiu 5 vídeos consecutivos', icon: '🔥', earned: true },
    { title: 'Expert em Atendimento', description: 'Completou módulo de atendimento', icon: '🏆', earned: true },
    { title: 'Velocista', description: 'Concluiu 10 vídeos em uma semana', icon: '⚡', earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Meu Dashboard
            </h1>
            <p className="text-purple-100">
              Bem-vindo, {user?.name} • Continue sua jornada de aprendizado
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <User className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Vídeos Disponíveis"
          value={stats.availableVideos}
          icon={<PlayCircle className="h-6 w-6" />}
          color="blue"
        />
        <MetricCard
          title="Vídeos Concluídos"
          value={`${stats.completedVideos}/${stats.availableVideos}`}
          icon={<CheckCircle className="h-6 w-6" />}
          color="green"
          change={15}
        />
        <MetricCard
          title="Progresso Geral"
          value={`${stats.completionPercentage}%`}
          icon={<Target className="h-6 w-6" />}
          color="purple"
          change={8}
        />
        <MetricCard
          title="Certificados"
          value={stats.certificates}
          icon={<Award className="h-6 w-6" />}
          color="orange"
          change={1}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <BarChart
            data={personalProgressData}
            title="Progresso Individual (%)"
          />
        </div>

        {/* Access History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <LineChart
            data={accessHistoryData}
            title="Histórico de Acessos (Esta Semana)"
          />
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Atividade Recente
          </h3>
          <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>

        <div className="space-y-4">
          {recentVideos.map((video) => (
            <div key={video.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                video.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {video.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <PlayCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {video.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{video.duration} min</span>
                  </div>
                  <div>Última visualização: {video.lastWatched}</div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 flex items-center">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        video.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${video.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {video.progress}%
                  </span>
                </div>
              </div>

              <Link
                to={`/videos/${video.id}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                {video.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Revisar</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    <span>Continuar</span>
                  </>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Conquistas
          </h3>
          <Star className="h-5 w-5 text-yellow-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned
                  ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20'
                  : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/30'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${achievement.earned ? 'opacity-100' : 'opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-medium mb-1 ${
                  achievement.earned
                    ? 'text-yellow-800 dark:text-yellow-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${
                  achievement.earned
                    ? 'text-yellow-700 dark:text-yellow-400'
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Modules */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Módulos Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  module.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {module.icon}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/videos"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <PlayCircle className="h-5 w-5" />
          <span>Continuar Treinamento</span>
        </Link>
        <Link
          to="/certificates"
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Award className="h-5 w-5" />
          <span>Meus Certificados</span>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;