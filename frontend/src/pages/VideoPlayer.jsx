import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  PlayCircle
} from '../components/Icons';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { getCurrentUserToken } = useAuth();
  const playerRef = useRef(null);
  const updateIntervalRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [canMarkComplete, setCanMarkComplete] = useState(false);

  // YouTube Player API
  useEffect(() => {
    // Carregar YouTube IFrame API
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API pronta');
      };
    }
  }, []);

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
        const currentVideo = videosData.find(v => v.id === videoId);

        if (!currentVideo) {
          setError('Vídeo não encontrado');
          return;
        }

        setVideo(currentVideo);

        const videoProgress = progressData.find(p => p.videoId === videoId);
        setProgress(videoProgress);

        if (videoProgress) {
          setCurrentTime(videoProgress.watchedSeconds);
        }

      } catch (error) {
        console.error('Erro ao carregar vídeo:', error);
        setError('Erro ao carregar vídeo');
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      loadData();
    }
  }, [videoId, getCurrentUserToken]);

  // Inicializar player quando o vídeo estiver carregado
  useEffect(() => {
    if (video && window.YT && window.YT.Player && !isPlayerReady) {
      initializePlayer();
    }
  }, [video, isPlayerReady]);

  const initializePlayer = () => {
    if (playerRef.current && video.youtubeId) {
      const player = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: video.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          disablekb: 0,
          enablejsapi: 1,
          fs: 1,
          modestbranding: 1,
          rel: 0,
          start: Math.floor(currentTime)
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            startProgressTracking(event.target);
          },
          onStateChange: (event) => {
            handlePlayerStateChange(event);
          }
        }
      });
    }
  };

  const startProgressTracking = (player) => {
    // Atualizar progresso a cada 5 segundos
    updateIntervalRef.current = setInterval(async () => {
      try {
        const currentTime = await player.getCurrentTime();
        const duration = await player.getDuration();

        if (currentTime && duration) {
          setCurrentTime(currentTime);

          // Verificar se pode marcar como completo (60% do vídeo)
          const watchedPercentage = (currentTime / duration) * 100;
          setCanMarkComplete(watchedPercentage >= 60);

          // Salvar progresso
          await saveProgress(currentTime);
        }
      } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
      }
    }, 5000);
  };

  const handlePlayerStateChange = (event) => {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      // Vídeo terminou - marcar como completo automaticamente
      markAsComplete();
    }
  };

  const saveProgress = async (watchedSeconds) => {
    try {
      const token = await getCurrentUserToken();
      await apiService.updateProgress({
        videoId: video.id,
        watchedSeconds: Math.floor(watchedSeconds)
      }, token);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  const markAsComplete = async () => {
    if (!canMarkComplete && currentTime < (video.duration * 0.6)) {
      alert('Você precisa assistir pelo menos 60% do vídeo para marcá-lo como concluído.');
      return;
    }

    try {
      const token = await getCurrentUserToken();
      const watchedSeconds = Math.max(currentTime, video.duration * 0.6);

      const updatedProgress = await apiService.updateProgress({
        videoId: video.id,
        watchedSeconds: Math.floor(watchedSeconds)
      }, token);

      setProgress(updatedProgress);

      // Mostrar mensagem de sucesso
      alert('Vídeo marcado como concluído!');

    } catch (error) {
      console.error('Erro ao marcar como concluído:', error);
      alert('Erro ao marcar vídeo como concluído');
    }
  };

  const getNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === videoId);
    return currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;
  };

  const getPreviousVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === videoId);
    return currentIndex > 0 ? videos[currentIndex - 1] : null;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!video.duration || !currentTime) return 0;
    return Math.min((currentTime / video.duration) * 100, 100);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando vídeo...</p>
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
          <Link
            to="/videos"
            className="mt-4 btn-primary inline-flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar aos Vídeos</span>
          </Link>
        </div>
      </div>
    );
  }

  const nextVideo = getNextVideo();
  const previousVideo = getPreviousVideo();
  const isCompleted = progress?.completed;
  const progressPercentage = getProgressPercentage();

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/videos"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar aos Vídeos</span>
        </Link>

        <div className="flex items-center space-x-4">
          {previousVideo && (
            <Link
              to={`/videos/${previousVideo.id}`}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Link>
          )}

          {nextVideo && (
            <Link
              to={`/videos/${nextVideo.id}`}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Próximo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Video Player */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-video bg-black">
          <div ref={playerRef} className="w-full h-full"></div>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h1>
              {video.description && (
                <p className="text-gray-600 leading-relaxed">{video.description}</p>
              )}
            </div>

            {isCompleted && (
              <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg ml-4">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Concluído</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso</span>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{formatTime(currentTime)} / {formatTime(video.duration)}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  progressPercentage >= 60 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {progressPercentage < 60 && (
              <p className="text-xs text-gray-500 mt-1">
                Assista pelo menos 60% do vídeo para marcá-lo como concluído
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isCompleted && canMarkComplete && (
              <button
                onClick={markAsComplete}
                className="btn-primary flex items-center justify-center space-x-2 flex-1"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Marcar como Concluído</span>
              </button>
            )}

            <div className="flex gap-2 flex-1">
              {previousVideo && (
                <Link
                  to={`/videos/${previousVideo.id}`}
                  className="btn-secondary flex items-center justify-center space-x-2 flex-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Vídeo Anterior</span>
                </Link>
              )}

              {nextVideo && (
                <Link
                  to={`/videos/${nextVideo.id}`}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1"
                >
                  <span>Próximo Vídeo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Duração:</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{formatTime(video.duration)}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500">Progresso:</span>
                <div className="font-medium mt-1">{Math.round(progressPercentage)}%</div>
              </div>

              <div>
                <span className="text-gray-500">Status:</span>
                <div className={`font-medium mt-1 ${
                  isCompleted ? 'text-green-600' : progressPercentage > 0 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {isCompleted ? 'Concluído' : progressPercentage > 0 ? 'Em progresso' : 'Não iniciado'}
                </div>
              </div>

              <div>
                <span className="text-gray-500">Posição:</span>
                <div className="font-medium mt-1">
                  #{video.order || videos.findIndex(v => v.id === videoId) + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Video Preview */}
      {nextVideo && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximo Vídeo</h3>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {nextVideo.youtubeId ? (
                <img
                  src={`https://img.youtube.com/vi/${nextVideo.youtubeId}/hqdefault.jpg`}
                  alt={nextVideo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{nextVideo.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {nextVideo.description || 'Próximo vídeo do treinamento'}
              </p>
            </div>
            <Link
              to={`/videos/${nextVideo.id}`}
              className="btn-primary flex items-center space-x-2"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Assistir</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;