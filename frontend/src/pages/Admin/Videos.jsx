import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import {
  PlayCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Clock,
  LinkIcon,
  AlertTriangle,
  X,
  Eye,
  EyeOff
} from '../../components/Icons';

const AdminVideos = () => {
  const { getCurrentUserToken } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '',
    order: ''
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const token = await getCurrentUserToken();
      const videosData = await apiService.getVideos(token);
      setVideos(videosData);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      setError('Erro ao carregar vídeos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideo = async (e) => {
    e.preventDefault();

    if (!newVideo.title.trim() || !newVideo.youtubeUrl.trim()) {
      alert('Título e URL do YouTube são obrigatórios');
      return;
    }

    // Validar URL do YouTube
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    if (!youtubeRegex.test(newVideo.youtubeUrl)) {
      alert('URL do YouTube inválida');
      return;
    }

    try {
      setCreating(true);
      const token = await getCurrentUserToken();

      const videoData = {
        ...newVideo,
        duration: newVideo.duration ? parseInt(newVideo.duration) : 0,
        order: newVideo.order ? parseInt(newVideo.order) : 0
      };

      const createdVideo = await apiService.createVideo(videoData, token);

      setVideos(prev => [...prev, createdVideo].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setNewVideo({ title: '', description: '', youtubeUrl: '', duration: '', order: '' });
      setShowCreateModal(false);

      alert('Vídeo criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar vídeo:', error);
      alert('Erro ao criar vídeo: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const getFilteredVideos = () => {
    if (!searchTerm) return videos;

    return videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min`;
  };

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
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
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-700">{error}</p>
          <button onClick={loadVideos} className="mt-4 btn-primary">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const filteredVideos = getFilteredVideos();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Vídeos</h1>
          <p className="mt-2 text-gray-600">{videos.length} vídeo(s) cadastrado(s)</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Vídeo</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar vídeos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>

      {/* Videos List */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <PlayCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhum vídeo encontrado' : 'Nenhum vídeo cadastrado'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Tente ajustar o termo de busca.'
              : 'Cadastre o primeiro vídeo do treinamento.'}
          </p>
          {!searchTerm && (
            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              Cadastrar Primeiro Vídeo
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const youtubeId = getYouTubeId(video.youtubeUrl);

            return (
              <div key={video.id} className="card">
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Order Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      #{video.order || 0}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {video.isActive ? (
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>Ativo</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <EyeOff className="h-3 w-3" />
                          <span>Inativo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>

                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{video.description}</p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="h-4 w-4" />
                      <span>YouTube</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Criado em: {formatDate(video.createdAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <button className="btn-secondary flex items-center space-x-1 flex-1 text-sm">
                      <Edit className="h-3 w-3" />
                      <span>Editar</span>
                    </button>
                    <button className="text-red-600 hover:text-red-700 p-2 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Video Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Novo Vídeo</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Vídeo *
                </label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field w-full"
                  placeholder="Digite o título do vídeo"
                  required
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field w-full"
                  rows="3"
                  placeholder="Descrição opcional do vídeo"
                />
              </div>

              {/* URL do YouTube */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do YouTube *
                </label>
                <input
                  type="url"
                  value={newVideo.youtubeUrl}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                  className="input-field w-full"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cole o link do vídeo no YouTube
                </p>
              </div>

              {/* Duração e Ordem */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração (segundos)
                  </label>
                  <input
                    type="number"
                    value={newVideo.duration}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                    className="input-field w-full"
                    placeholder="300"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordem
                  </label>
                  <input
                    type="number"
                    value={newVideo.order}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, order: e.target.value }))}
                    className="input-field w-full"
                    placeholder="1"
                    min="0"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> O vídeo será ativado automaticamente após a criação.
                  A duração é usada para calcular o progresso dos usuários.
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary flex-1"
                  disabled={creating}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  disabled={creating}
                >
                  {creating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Criando...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Criar Vídeo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;