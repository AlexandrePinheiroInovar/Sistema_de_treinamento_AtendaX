import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import {
  PlayCircle,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen
} from '../components/Icons';

const Dashboard = () => {
  const { userData, getCurrentUserToken } = useAuth();
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [certificateEligibility, setCertificateEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const token = await getCurrentUserToken();

        const [videosData, progressData, eligibilityData] = await Promise.all([
          apiService.getVideos(token),
          apiService.getUserProgress(token),
          apiService.checkCertificateEligibility(token)
        ]);

        setVideos(videosData);
        setProgress(progressData);
        setCertificateEligibility(eligibilityData);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [getCurrentUserToken]);

  const getProgressStats = () => {
    const completedVideos = progress.filter(p => p.completed).length;
    const totalVideos = videos.length;
    const completionPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

    return {
      completedVideos,
      totalVideos,
      completionPercentage
    };
  };

  const getRecentActivity = () => {
    return progress
      .sort((a, b) => new Date(b.lastWatched?.seconds * 1000) - new Date(a.lastWatched?.seconds * 1000))
      .slice(0, 3);
  };

  const getNextVideo = () => {
    const completedVideoIds = progress.filter(p => p.completed).map(p => p.videoId);
    return videos.find(video => !completedVideoIds.includes(video.id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
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

  const stats = getProgressStats();
  const recentActivity = getRecentActivity();
  const nextVideo = getNextVideo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bem-vindo, {userData?.name}!
        </h1>
        <p className="text-primary-100">
          Continue seu treinamento no Sistema PrismX
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Progresso Total */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progresso</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completionPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Vídeos Completados */}
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.completedVideos}/{stats.totalVideos}
              </p>
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
              <p className="text-sm font-medium text-gray-600">Total Vídeos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVideos}</p>
            </div>
          </div>
        </div>

        {/* Status do Certificado */}
        <div className="card">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${certificateEligibility?.eligible ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Award className={`h-6 w-6 ${certificateEligibility?.eligible ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificado</p>
              <p className={`text-sm font-medium ${certificateEligibility?.eligible ? 'text-green-600' : 'text-gray-600'}`}>
                {certificateEligibility?.eligible ? 'Disponível' : 'Em progresso'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximo Vídeo */}
        {nextVideo && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Continuar Assistindo</h3>
              <BookOpen className="h-5 w-5 text-primary-600" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{nextVideo.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {nextVideo.description || 'Descrição não disponível'}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{Math.ceil(nextVideo.duration / 60)} min</span>
                </div>
                <Link
                  to={`/videos/${nextVideo.id}`}
                  className="btn-primary text-sm flex items-center space-x-1"
                >
                  <span>Assistir</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Certificado */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Certificado de Conclusão</h3>
            <Award className="h-5 w-5 text-primary-600" />
          </div>

          {certificateEligibility?.eligible ? (
            <div className="text-center py-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Parabéns!</h4>
              <p className="text-sm text-gray-600 mb-4">
                Você concluiu todos os vídeos e pode baixar seu certificado.
              </p>
              <Link
                to="/certificate"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Award className="h-4 w-4" />
                <span>Baixar Certificado</span>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Em Progresso</h4>
              <p className="text-sm text-gray-600 mb-2">
                Complete todos os vídeos para desbloquear seu certificado.
              </p>
              <p className="text-xs text-gray-500">
                Restam {certificateEligibility?.remainingVideos || 0} vídeo(s)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Atividade Recente */}
      {recentActivity.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const video = videos.find(v => v.id === activity.videoId);
              const lastWatched = activity.lastWatched?.seconds
                ? new Date(activity.lastWatched.seconds * 1000).toLocaleDateString('pt-BR')
                : 'Recente';

              return (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.completed ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {activity.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {video?.title || 'Vídeo não encontrado'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.completed ? 'Concluído' : 'Em progresso'} • {lastWatched}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((activity.watchedSeconds / (video?.duration || 1)) * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/videos"
          className="btn-primary flex items-center justify-center space-x-2 flex-1"
        >
          <PlayCircle className="h-4 w-4" />
          <span>Ver Todos os Vídeos</span>
        </Link>

        {certificateEligibility?.eligible && (
          <Link
            to="/certificate"
            className="btn-secondary flex items-center justify-center space-x-2 flex-1"
          >
            <Award className="h-4 w-4" />
            <span>Certificado</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;