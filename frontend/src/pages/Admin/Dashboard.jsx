import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import {
  Users,
  PlayCircle,
  Award,
  TrendingUp,
  UserPlus,
  Plus,
  Eye,
  Calendar,
  BarChart
} from '../../components/Icons';

const AdminDashboard = () => {
  const { getCurrentUserToken } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoading(true);
        const token = await getCurrentUserToken();
        const dashboardData = await apiService.getAdminDashboard(token);
        setStats(dashboardData);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        setError('Erro ao carregar estatísticas do dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, [getCurrentUserToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="mt-2 text-gray-600">
            Visão geral do sistema de treinamento PrismX
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/admin/users"
            className="btn-secondary flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Gerenciar Usuários</span>
          </Link>
          <Link
            to="/admin/videos"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Gerenciar Vídeos</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Usuários */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </div>

        {/* Total de Vídeos */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <PlayCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Vídeos</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalVideos || 0}</p>
            </div>
          </div>
        </div>

        {/* Certificados Emitidos */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificados</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalCertificates || 0}</p>
            </div>
          </div>
        </div>

        {/* Taxa de Conclusão */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taxa de Conclusão</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.completionRate || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumo de Atividade */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Resumo de Atividade</h3>
            <BarChart className="h-5 w-5 text-primary-600" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Usuários Ativos</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.activeUsers || 0}
                </span>
                <p className="text-xs text-gray-500">
                  de {stats?.totalUsers || 0} usuários
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Treinamentos Concluídos</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.totalCertificates || 0}
                </span>
                <p className="text-xs text-gray-500">certificados emitidos</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <PlayCircle className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Conteúdo Disponível</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.totalVideos || 0}
                </span>
                <p className="text-xs text-gray-500">vídeos ativos</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Taxa de Engajamento</span>
              <span className="text-sm text-gray-600">
                {stats?.totalUsers > 0
                  ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
                  : 0}%
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${stats?.totalUsers > 0
                    ? (stats.activeUsers / stats.totalUsers) * 100
                    : 0}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>

          <div className="space-y-4">
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="bg-blue-100 group-hover:bg-blue-200 p-3 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">Gerenciar Usuários</h4>
                <p className="text-xs text-gray-600">
                  Criar, editar e visualizar usuários do sistema
                </p>
              </div>
              <Eye className="h-4 w-4 text-gray-400" />
            </Link>

            <Link
              to="/admin/videos"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="bg-purple-100 group-hover:bg-purple-200 p-3 rounded-lg">
                <PlayCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">Gerenciar Vídeos</h4>
                <p className="text-xs text-gray-600">
                  Adicionar e organizar conteúdo de treinamento
                </p>
              </div>
              <Eye className="h-4 w-4 text-gray-400" />
            </Link>

            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">Certificados</h4>
                <p className="text-xs text-gray-600">
                  {stats?.totalCertificates || 0} certificados foram emitidos
                </p>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {stats?.completionRate || 0}%
              </span>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">Sistema Atualizado</h4>
                <p className="text-xs text-gray-600">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Sistema Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Banco de Dados Conectado</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Autenticação Ativa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;