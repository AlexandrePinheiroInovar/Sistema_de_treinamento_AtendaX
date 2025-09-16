import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import {
  PlayCircle,
  Clock,
  CheckCircle,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

const Videos = () => {
  const { getCurrentUserToken } = useAuth();
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = await getCurrentUserToken();

        const [videosData, progressData] = await Promise.all([
          apiService.getVideos(token),
          apiService.getUserProgress(token)
        ]);

        setVideos(videosData);
        setProgress(progressData);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        setError('Erro ao carregar vídeos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getCurrentUserToken]);

  const getVideoProgress = (videoId) => {
    return progress.find(p => p.videoId === videoId);
  };

  const getFilteredVideos = () => {
    let filtered = videos;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (filter === 'completed') {
      filtered = filtered.filter(video => {
        const videoProgress = getVideoProgress(video.id);
        return videoProgress?.completed;
      });
    } else if (filter === 'incomplete') {
      filtered = filtered.filter(video => {
        const videoProgress = getVideoProgress(video.id);
        return !videoProgress?.completed;
      });
    }

    return filtered;
  };

  const formatDuration = (seconds) => {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min`;
  };

  const getProgressPercentage = (videoId) => {
    const videoProgress = getVideoProgress(videoId);
    if (!videoProgress) return 0;

    const video = videos.find(v => v.id === videoId);
    if (!video || !video.duration) return 0;

    return Math.round((videoProgress.watchedSeconds / video.duration) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando vídeos...</p>
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

  const filteredVideos = getFilteredVideos();
  const completedCount = videos.filter(video => getVideoProgress(video.id)?.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vídeos de Treinamento</h1>
          <p className="mt-2 text-gray-600">
            {completedCount} de {videos.length} vídeos concluídos
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
          <span className="text-sm text-gray-600">
            {Math.round((completedCount / videos.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / videos.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vídeos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field pl-10 pr-8 appearance-none bg-white"
          >
            <option value="all">Todos os vídeos</option>
            <option value="completed">Concluídos</option>
            <option value="incomplete">Não concluídos</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <PlayCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filter !== 'all' ? 'Nenhum vídeo encontrado' : 'Nenhum vídeo disponível'}
          </h3>
          <p className="text-gray-600">
            {searchTerm || filter !== 'all'
              ? 'Tente ajustar os filtros de busca.'
              : 'Os vídeos serão disponibilizados em breve.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => {
            const videoProgress = getVideoProgress(video.id);
            const isCompleted = videoProgress?.completed;
            const progressPercentage = getProgressPercentage(video.id);

            return (
              <div key={video.id} className="card hover:shadow-lg transition-shadow duration-200">
                {/* Video Thumbnail/Preview */}
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {video.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {isCompleted ? (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Concluído</span>
                      </div>
                    ) : progressPercentage > 0 ? (
                      <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {progressPercentage}%
                      </div>
                    ) : (
                      <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Novo
                      </div>
                    )}
                  </div>

                  {/* Order Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      #{video.order || index + 1}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {video.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                  </div>

                  {/* Progress Bar (se tiver progresso) */}
                  {progressPercentage > 0 && !isCompleted && (
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={`/videos/${video.id}`}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>{isCompleted ? 'Reassistir' : progressPercentage > 0 ? 'Continuar' : 'Assistir'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;