import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/SimpleAuthContext';
import { BarChart, PieChart, LineChart, MetricCard } from '../charts/SimpleCharts';
import {
  Users,
  PlayCircle,
  Award,
  TrendingUp,
  Settings,
  FileText,
  UserCheck,
  Calendar,
  Activity,
  Database,
  Shield,
  ChevronRight
} from '../Icons';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 245,
    totalVideos: 32,
    totalCertificates: 156,
    monthlyAccess: 1247
  };

  const userActivityData = [
    { label: 'Ativos', value: 189 },
    { label: 'Inativos', value: 56 }
  ];

  const popularVideosData = [
    { label: 'Atendimento', value: 45 },
    { label: 'Vendas', value: 32 },
    { label: 'Produto', value: 28 },
    { label: 'SAC', value: 19 },
    { label: 'Outros', value: 12 }
  ];

  const weeklyAccessData = [
    { label: 'Seg', value: 180 },
    { label: 'Ter', value: 220 },
    { label: 'Qua', value: 190 },
    { label: 'Qui', value: 250 },
    { label: 'Sex', value: 280 },
    { label: 'Sab', value: 160 },
    { label: 'Dom', value: 120 }
  ];

  const modules = [
    {
      title: 'Gestão de Usuários',
      description: 'Gerenciar usuários, permissões e departamentos',
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      path: '/admin/users'
    },
    {
      title: 'Vídeos de Treinamento',
      description: 'Upload, edição e organização de conteúdos',
      icon: <PlayCircle className="h-6 w-6" />,
      color: 'purple',
      path: '/videos'
    },
    {
      title: 'Certificação',
      description: 'Configurar e gerenciar certificados',
      icon: <Award className="h-6 w-6" />,
      color: 'green',
      path: '/admin/certificates'
    },
    {
      title: 'Relatórios',
      description: 'Analytics e relatórios detalhados',
      icon: <FileText className="h-6 w-6" />,
      color: 'orange',
      path: '/admin/reports'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Dashboard Administrativo
            </h1>
            <p className="text-blue-100">
              Bem-vindo, {user?.name} • Sistema AtendaX
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Shield className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Usuários"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
          change={8}
        />
        <MetricCard
          title="Vídeos Publicados"
          value={stats.totalVideos}
          icon={<PlayCircle className="h-6 w-6" />}
          color="purple"
          change={12}
        />
        <MetricCard
          title="Certificados Emitidos"
          value={stats.totalCertificates}
          icon={<Award className="h-6 w-6" />}
          color="green"
          change={5}
        />
        <MetricCard
          title="Acessos no Mês"
          value={stats.monthlyAccess.toLocaleString()}
          icon={<TrendingUp className="h-6 w-6" />}
          color="orange"
          change={15}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <BarChart
            data={userActivityData}
            title="Usuários Ativos vs Inativos"
          />
        </div>

        {/* Popular Videos Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <PieChart
            data={popularVideosData}
            title="Vídeos Mais Assistidos"
          />
        </div>
      </div>

      {/* Weekly Access Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <LineChart
          data={weeklyAccessData}
          title="Evolução de Acessos Semanais"
        />
      </div>

      {/* Admin Modules */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Módulos Administrativos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  module.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  module.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                  module.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {module.icon}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
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

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Atividade Recente
          </h3>
          <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="space-y-4">
          {[
            { user: 'João Silva', action: 'completou o curso de Atendimento', time: '2 min atrás', type: 'success' },
            { user: 'Maria Santos', action: 'iniciou o módulo de Vendas', time: '15 min atrás', type: 'info' },
            { user: 'Carlos Ferreira', action: 'obteve certificado', time: '1 hora atrás', type: 'success' },
            { user: 'Ana Costa', action: 'fez login no sistema', time: '2 horas atrás', type: 'info' },
            { user: 'Pedro Lima', action: 'completou avaliação', time: '3 horas atrás', type: 'success' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/admin/users/new"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Users className="h-5 w-5" />
          <span>Adicionar Usuário</span>
        </Link>
        <Link
          to="/videos/new"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <PlayCircle className="h-5 w-5" />
          <span>Novo Vídeo</span>
        </Link>
        <Link
          to="/admin/reports"
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <FileText className="h-5 w-5" />
          <span>Ver Relatórios</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;