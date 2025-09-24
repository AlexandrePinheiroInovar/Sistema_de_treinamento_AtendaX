import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/SimpleAuthContext';
import { BarChart, PieChart, LineChart, MetricCard } from '../charts/SimpleCharts';
import {
  Users,
  Award,
  TrendingUp,
  FileText,
  UserCheck,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Eye
} from '../Icons';

const SupervisorDashboard = () => {
  const { user } = useAuth();

  // Mock data for supervisor dashboard
  const stats = {
    teamMembers: 12,
    completedVideos: 89,
    teamCertificates: 34,
    avgProgress: 73
  };

  const teamProductivityData = [
    { label: 'Ana S.', value: 95 },
    { label: 'João P.', value: 87 },
    { label: 'Maria L.', value: 82 },
    { label: 'Carlos F.', value: 78 },
    { label: 'Lucia M.', value: 65 }
  ];

  const trainingStatusData = [
    { label: 'Concluído', value: 34 },
    { label: 'Em Andamento', value: 28 },
    { label: 'Pendente', value: 15 }
  ];

  const teamProgressData = [
    { label: 'Sem 1', value: 45 },
    { label: 'Sem 2', value: 52 },
    { label: 'Sem 3', value: 61 },
    { label: 'Sem 4', value: 73 },
    { label: 'Sem 5', value: 78 },
    { label: 'Sem 6', value: 89 },
    { label: 'Sem 7', value: 95 }
  ];

  const modules = [
    {
      title: 'Relatórios da Equipe',
      description: 'Acompanhe o desempenho e progresso da sua equipe',
      icon: <FileText className="h-6 w-6" />,
      color: 'blue',
      path: '/supervisor/reports'
    },
    {
      title: 'Acompanhamento',
      description: 'Monitore o progresso individual dos membros',
      icon: <Eye className="h-6 w-6" />,
      color: 'green',
      path: '/supervisor/tracking'
    },
    {
      title: 'Certificação da Equipe',
      description: 'Gerencie certificados dos supervisionados',
      icon: <Award className="h-6 w-6" />,
      color: 'purple',
      path: '/supervisor/certificates'
    }
  ];

  const teamMembers = [
    { name: 'Ana Silva', progress: 95, status: 'completed', lastActivity: '2h atrás', certificates: 3 },
    { name: 'João Pereira', progress: 87, status: 'in-progress', lastActivity: '5h atrás', certificates: 2 },
    { name: 'Maria Lima', progress: 82, status: 'in-progress', lastActivity: '1d atrás', certificates: 2 },
    { name: 'Carlos Ferreira', progress: 78, status: 'in-progress', lastActivity: '2d atrás', certificates: 1 },
    { name: 'Lucia Martins', progress: 65, status: 'pending', lastActivity: '3d atrás', certificates: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Dashboard do Supervisor
            </h1>
            <p className="text-green-100">
              Bem-vindo, {user?.name} • Equipe de 12 pessoas
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <UserCheck className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Membros da Equipe"
          value={stats.teamMembers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
          change={2}
        />
        <MetricCard
          title="Vídeos Concluídos"
          value={stats.completedVideos}
          icon={<CheckCircle className="h-6 w-6" />}
          color="green"
          change={18}
        />
        <MetricCard
          title="Certificados da Equipe"
          value={stats.teamCertificates}
          icon={<Award className="h-6 w-6" />}
          color="purple"
          change={12}
        />
        <MetricCard
          title="Progresso Médio"
          value={`${stats.avgProgress}%`}
          icon={<Target className="h-6 w-6" />}
          color="orange"
          change={8}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Productivity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <BarChart
            data={teamProductivityData}
            title="Produtividade por Membro (%)"
          />
        </div>

        {/* Training Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <PieChart
            data={trainingStatusData}
            title="Status dos Treinamentos"
          />
        </div>
      </div>

      {/* Team Progress Evolution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <LineChart
          data={teamProgressData}
          title="Evolução de Conclusão da Equipe (%)"
        />
      </div>

      {/* Team Members Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Visão Geral da Equipe
          </h3>
          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Membro
                </th>
                <th className="text-left pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Progresso
                </th>
                <th className="text-left pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="text-left pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Última Atividade
                </th>
                <th className="text-left pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Certificados
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      member.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {member.status === 'completed' ? 'Concluído' :
                       member.status === 'in-progress' ? 'Em Andamento' :
                       'Pendente'}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {member.lastActivity}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.certificates}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supervisor Modules */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Módulos do Supervisor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-green-300 dark:hover:border-green-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  module.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  module.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {module.icon}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
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
          to="/supervisor/reports"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <FileText className="h-5 w-5" />
          <span>Ver Relatórios</span>
        </Link>
        <Link
          to="/supervisor/tracking"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Eye className="h-5 w-5" />
          <span>Acompanhar Progresso</span>
        </Link>
        <Link
          to="/supervisor/certificates"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Award className="h-5 w-5" />
          <span>Certificados</span>
        </Link>
      </div>
    </div>
  );
};

export default SupervisorDashboard;