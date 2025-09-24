import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SimpleAuthContext';
import ThemeSettings from './ThemeSettings';
import MainDashboard from './MainDashboard';

const VideoTraining = () => {
  const navigate = useNavigate();
  const { userData, getCurrentUser } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [showFAQ, setShowFAQ] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [newVideoForm, setNewVideoForm] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    module: 'cadastro-cliente',
    level: 'Iniciante',
    instructor: ''
  });
  const [videoComments, setVideoComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(300);
  const [videoPositions, setVideoPositions] = useState({});
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [videoEvaluations, setVideoEvaluations] = useState({});
  const [currentEvaluation, setCurrentEvaluation] = useState({
    rating: 0,
    learningComment: '',
    suggestions: '',
    wouldRecommend: null,
    completedAt: null
  });

  // Dados mockados de vídeos (em um sistema real, viria da API)
  const [videos] = useState([
    {
      id: '1',
      title: 'Introdução ao Atendimento ao Cliente',
      description: 'Aprenda os fundamentos essenciais para um atendimento de qualidade.',
      youtubeId: 'dQw4w9WgXcQ', // Exemplo - substitua pelos seus IDs reais
      duration: '15:30',
      module: 'cadastro-cliente',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      level: 'Iniciante',
      instructor: 'Prof. Maria Silva',
      views: 1250,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Técnicas de Vendas Avançadas',
      description: 'Estratégias comprovadas para aumentar suas vendas e fidelizar clientes.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '22:15',
      module: 'vendas',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      level: 'Avançado',
      instructor: 'Prof. João Santos',
      views: 980,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Comunicação Eficaz no Trabalho',
      description: 'Desenvolva habilidades de comunicação para melhorar seu desempenho profissional.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '18:45',
      module: 'comunicacao',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      level: 'Intermediário',
      instructor: 'Prof. Ana Costa',
      views: 750,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Gestão de Conflitos',
      description: 'Aprenda a resolver conflitos de forma profissional e eficiente.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '25:20',
      module: 'gestao-usuarios',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      level: 'Intermediário',
      instructor: 'Prof. Carlos Lima',
      views: 620,
      rating: 4.6
    }
  ]);

  // FAQ Data
  const [faqData] = useState([
    {
      question: 'Como acompanho meu progresso nos vídeos?',
      answer: 'Seu progresso é salvo automaticamente. Você pode ver na barra de progresso de cada vídeo quanto já assistiu.'
    },
    {
      question: 'Posso baixar os vídeos para assistir offline?',
      answer: 'Os vídeos são hospedados no YouTube e seguem as políticas da plataforma. Recomendamos assistir online.'
    },
    {
      question: 'Como obtenho o certificado após assistir os vídeos?',
      answer: 'Após completar 100% de um vídeo, você pode gerar seu certificado na seção de Certificação.'
    },
    {
      question: 'Posso acelerar a velocidade dos vídeos?',
      answer: 'Sim! Use os controles do player do YouTube para ajustar a velocidade de reprodução.'
    },
    {
      question: 'Os vídeos têm legendas?',
      answer: 'A maioria dos vídeos possui legendas automáticas do YouTube. Alguns têm legendas personalizadas.'
    }
  ]);

  // Carregar progresso dos vídeos, comentários e posições do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('atendax_video_progress');
    if (savedProgress) {
      setVideoProgress(JSON.parse(savedProgress));
    }

    const savedComments = localStorage.getItem('atendax_video_comments');
    if (savedComments) {
      setVideoComments(JSON.parse(savedComments));
    }

    const savedPositions = localStorage.getItem('atendax_video_positions');
    if (savedPositions) {
      setVideoPositions(JSON.parse(savedPositions));
    }

    const savedEvaluations = localStorage.getItem('atendax_video_evaluations');
    if (savedEvaluations) {
      setVideoEvaluations(JSON.parse(savedEvaluations));
    }
  }, []);

  // Salvar progresso no localStorage
  const updateVideoProgress = (videoId, progress) => {
    const updatedProgress = {
      ...videoProgress,
      [videoId]: progress
    };
    setVideoProgress(updatedProgress);
    localStorage.setItem('atendax_video_progress', JSON.stringify(updatedProgress));
  };

  // Salvar posição do vídeo no localStorage
  const saveVideoPosition = (videoId, time) => {
    const updatedPositions = {
      ...videoPositions,
      [videoId]: time
    };
    setVideoPositions(updatedPositions);
    localStorage.setItem('atendax_video_positions', JSON.stringify(updatedPositions));
  };

  // Recuperar posição salva do vídeo
  const getSavedVideoPosition = (videoId) => {
    return videoPositions[videoId] || 0;
  };

  // Carregar API do YouTube
  useEffect(() => {
    // Carregar a API do YouTube se ainda não estiver carregada
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Função global que será chamada quando a API estiver pronta
      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
  }, []);

  // Criar player do YouTube apenas uma vez quando video é selecionado
  useEffect(() => {
    if (!selectedVideo || !playerReady) return;

    // Limpar player anterior se existir
    if (videoPlayer && videoPlayer.destroy) {
      videoPlayer.destroy();
    }

    // Criar novo player
    const player = new window.YT.Player(`youtube-player-${selectedVideo.id}`, {
      height: '100%',
      width: '100%',
      videoId: selectedVideo.youtubeId,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1
      },
      events: {
        onReady: (event) => {
          setVideoPlayer(event.target);
          // Pegar duração real do vídeo
          const duration = event.target.getDuration();
          setVideoDuration(duration);

          // Restaurar posição salva do vídeo
          const savedPosition = getSavedVideoPosition(selectedVideo.id);
          if (savedPosition > 0) {
            event.target.seekTo(savedPosition, true);
          }
        },
        onStateChange: (event) => {
          // 1 = playing, 2 = paused
          if (event.data === 1) {
            setIsVideoPlaying(true);
          } else {
            setIsVideoPlaying(false);
            // Salvar posição quando pausar
            if (videoPlayer) {
              const currentTime = videoPlayer.getCurrentTime();
              setCurrentVideoTime(currentTime);
              saveVideoPosition(selectedVideo.id, currentTime);
            }
          }
        }
      }
    });

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [selectedVideo, playerReady]);

  // Sistema de progresso separado - só depende do estado de playing
  useEffect(() => {
    if (!selectedVideo) return;

    let progressInterval;
    let totalWatchTime = 0;

    // Recuperar tempo já assistido do localStorage
    const savedWatchTime = localStorage.getItem(`atendax_watch_time_${selectedVideo.id}`);
    if (savedWatchTime) {
      totalWatchTime = parseInt(savedWatchTime);
    }

    // Intervalo para contar progresso e salvar posição quando vídeo está tocando
    progressInterval = setInterval(() => {
      if (isVideoPlaying && videoPlayer) {
        totalWatchTime += 1;

        // Pegar posição atual do vídeo
        const currentTime = videoPlayer.getCurrentTime();
        setCurrentVideoTime(currentTime);

        // Salvar posição a cada 5 segundos para não sobrecarregar o localStorage
        if (totalWatchTime % 5 === 0) {
          saveVideoPosition(selectedVideo.id, currentTime);
        }

        // Salvar tempo assistido
        localStorage.setItem(`atendax_watch_time_${selectedVideo.id}`, totalWatchTime.toString());

        // Calcular progresso baseado na duração real do vídeo
        const progressPercentage = Math.min((totalWatchTime / videoDuration) * 100, 100);

        setVideoProgress(prevProgress => {
          const updatedProgress = {
            ...prevProgress,
            [selectedVideo.id]: progressPercentage
          };
          localStorage.setItem('atendax_video_progress', JSON.stringify(updatedProgress));
          return updatedProgress;
        });

        // Para quando atingir 100% e abre modal de avaliação
        if (progressPercentage >= 100) {
          clearInterval(progressInterval);

          // Verificar se já foi avaliado
          const hasEvaluation = videoEvaluations[selectedVideo.id];
          if (!hasEvaluation) {
            setCurrentEvaluation({
              rating: 0,
              learningComment: '',
              suggestions: '',
              wouldRecommend: null,
              completedAt: new Date().toISOString()
            });
            setShowEvaluationModal(true);
          }
        }
      }
    }, 1000);

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [selectedVideo, isVideoPlaying, videoDuration]);

  // Extrair ID do YouTube da URL
  const extractYoutubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Lidar com mudanças no formulário de novo vídeo
  const handleNewVideoChange = (e) => {
    setNewVideoForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Adicionar novo vídeo
  const handleAddVideo = (e) => {
    e.preventDefault();

    const youtubeId = extractYoutubeId(newVideoForm.youtubeUrl);
    if (!youtubeId) {
      alert('URL do YouTube inválida. Verifique o link e tente novamente.');
      return;
    }

    const newVideo = {
      id: (videos.length + 1).toString(),
      title: newVideoForm.title,
      description: newVideoForm.description,
      youtubeId: youtubeId,
      duration: '00:00', // Em um sistema real, isso seria calculado
      module: newVideoForm.module,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      level: newVideoForm.level,
      instructor: newVideoForm.instructor,
      views: 0,
      rating: 0
    };

    // Em um sistema real, isso seria uma chamada para API
    alert('Vídeo adicionado com sucesso! (Em um sistema real, seria salvo no banco de dados)');

    // Reset form
    setNewVideoForm({
      title: '',
      description: '',
      youtubeUrl: '',
      module: 'cadastro-cliente',
      level: 'Iniciante',
      instructor: ''
    });
    setShowAddVideoModal(false);
  };

  // Adicionar comentário
  const addComment = () => {
    if (!newComment.trim() || !selectedVideo) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: userData?.name || 'Usuário',
      timestamp: new Date().toLocaleString(),
      videoId: selectedVideo.id,
      userId: userData?.id || 'anonymous'
    };

    const updatedComments = {
      ...videoComments,
      [selectedVideo.id]: [...(videoComments[selectedVideo.id] || []), comment]
    };

    setVideoComments(updatedComments);
    localStorage.setItem('atendax_video_comments', JSON.stringify(updatedComments));
    setNewComment('');
  };

  // Excluir comentário
  const deleteComment = (commentId) => {
    if (!selectedVideo) return;

    const updatedComments = {
      ...videoComments,
      [selectedVideo.id]: (videoComments[selectedVideo.id] || []).filter(comment => comment.id !== commentId)
    };

    setVideoComments(updatedComments);
    localStorage.setItem('atendax_video_comments', JSON.stringify(updatedComments));
  };

  // Iniciar edição de comentário
  const startEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.text);
  };

  // Cancelar edição
  const cancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText('');
  };

  // Salvar edição do comentário
  const saveEditComment = () => {
    if (!editCommentText.trim() || !selectedVideo || !editingComment) return;

    const updatedComments = {
      ...videoComments,
      [selectedVideo.id]: (videoComments[selectedVideo.id] || []).map(comment =>
        comment.id === editingComment
          ? { ...comment, text: editCommentText, editedAt: new Date().toLocaleString() }
          : comment
      )
    };

    setVideoComments(updatedComments);
    localStorage.setItem('atendax_video_comments', JSON.stringify(updatedComments));
    setEditingComment(null);
    setEditCommentText('');
  };

  // Verificar se o usuário pode editar/excluir o comentário
  const canEditOrDeleteComment = (comment) => {
    return comment.userId === (userData?.id || 'anonymous');
  };

  // Funções de Avaliação
  const handleEvaluationSubmit = (e) => {
    e.preventDefault();

    if (!currentEvaluation.rating || currentEvaluation.wouldRecommend === null) {
      alert('Por favor, preencha a avaliação e indique se recomendaria o vídeo.');
      return;
    }

    const evaluation = {
      ...currentEvaluation,
      videoId: selectedVideo.id,
      userId: userData?.id || 'anonymous',
      userName: userData?.name || 'Usuário',
      submittedAt: new Date().toISOString()
    };

    const updatedEvaluations = {
      ...videoEvaluations,
      [selectedVideo.id]: evaluation
    };

    setVideoEvaluations(updatedEvaluations);
    localStorage.setItem('atendax_video_evaluations', JSON.stringify(updatedEvaluations));

    setShowEvaluationModal(false);

    // Reset evaluation form
    setCurrentEvaluation({
      rating: 0,
      learningComment: '',
      suggestions: '',
      wouldRecommend: null,
      completedAt: null
    });

    alert('Obrigado pela sua avaliação! Suas opiniões nos ajudam a melhorar nossos treinamentos.');
  };

  const closeEvaluationModal = () => {
    setShowEvaluationModal(false);
    setCurrentEvaluation({
      rating: 0,
      learningComment: '',
      suggestions: '',
      wouldRecommend: null,
      completedAt: null
    });
  };

  const renderStars = (rating, onStarClick = null) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => onStarClick && onStarClick(index + 1)}
        className={`text-2xl transition-colors ${
          index < rating
            ? 'text-yellow-400 hover:text-yellow-500'
            : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
        } ${onStarClick ? 'cursor-pointer' : 'cursor-default'}`}
        disabled={!onStarClick}
      >
        ★
      </button>
    ));
  };

  // Filtrar vídeos
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === 'all' || video.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">

        {/* Theme Settings Button */}
        <button
          onClick={() => setShowThemeSettings(true)}
          className="fixed top-4 right-4 z-40 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="Configurações de Tema"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vídeos de Treinamento</h1>
                <p className="text-gray-600 dark:text-gray-300">Desenvolva suas habilidades com nossos cursos em vídeo</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Dúvidas Frequentes
              </button>
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Vídeo
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
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

              {/* Busca */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar vídeos..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Módulo AtendaX */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Módulo AtendaX</label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos os Módulos</option>
                  <option value="cadastro-cliente">Cadastro de Cliente</option>
                  <option value="vendas">Vendas</option>
                  <option value="comunicacao">Comunicação</option>
                  <option value="gestao-usuarios">Gestão de Usuários</option>
                  <option value="relatorios">Relatórios</option>
                  <option value="configuracoes">Configurações</option>
                </select>
              </div>

              {/* Estatísticas do Usuário */}
              <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Seu Progresso</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Vídeos Assistidos:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{Object.keys(videoProgress).filter(id => videoProgress[id] >= 95).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Total de Vídeos:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{videos.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progresso Geral:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {Math.round((Object.keys(videoProgress).filter(id => videoProgress[id] >= 95).length / videos.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Sidebar */}
            {showFAQ && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Dúvidas Frequentes
                </h3>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Video Player - Modo Foco */}
            {selectedVideo && (
              <div className="space-y-6">
                {/* Player Principal */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4 relative">
                    {/* Player do YouTube com API JavaScript */}
                    <div className="w-full h-96 bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                      <div
                        id={`youtube-player-${selectedVideo.id}`}
                        className="w-full h-full"
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedVideo.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{selectedVideo.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Por {selectedVideo.instructor}</span>
                        <span>•</span>
                        <span>{selectedVideo.duration}</span>
                        <span>•</span>
                        <span>{selectedVideo.views} visualizações</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedVideo(null)}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Voltar aos Vídeos
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(videoProgress[selectedVideo.id] || 0)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Progresso: {Math.round(videoProgress[selectedVideo.id] || 0)}% completo</span>
                    <span>
                      {Math.floor(currentVideoTime / 60)}:
                      {String(Math.floor(currentVideoTime % 60)).padStart(2, '0')} /
                      {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>
                      {isVideoPlaying ? '▶️ Contando progresso - vídeo tocando' : '⏸️ Pausado - progresso parado'}
                    </span>
                    {getSavedVideoPosition(selectedVideo.id) > 0 && (
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        📍 Última posição: {Math.floor(getSavedVideoPosition(selectedVideo.id) / 60)}:
                        {String(Math.floor(getSavedVideoPosition(selectedVideo.id) % 60)).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Seção de Comentários/Dúvidas */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dúvidas e Comentários</h3>
                      <span className="ml-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                        {(videoComments[selectedVideo.id] || []).length} comentários
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors flex items-center text-sm"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Ver Todos
                    </button>
                  </div>

                  {/* Formulário para Novo Comentário */}
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Escreva sua dúvida ou comentário sobre este vídeo..."
                          rows="3"
                          className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Comentando como {userData?.name || 'Usuário'}
                          </span>
                          <button
                            onClick={addComment}
                            disabled={!newComment.trim()}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                          >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Comentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Comentários */}
                  <div className="space-y-4">
                    {(videoComments[selectedVideo.id] || []).length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400">Ainda não há comentários neste vídeo</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Seja o primeiro a comentar!</p>
                      </div>
                    ) : (
                      (videoComments[selectedVideo.id] || []).map((comment) => (
                        <div key={comment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                                  <span className="text-gray-500 dark:text-gray-400 text-sm">{comment.timestamp}</span>
                                  {comment.editedAt && (
                                    <span className="text-gray-400 dark:text-gray-500 text-xs">(editado em {comment.editedAt})</span>
                                  )}
                                </div>
                                {canEditOrDeleteComment(comment) && (
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => startEditComment(comment)}
                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                                      title="Editar comentário"
                                    >
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
                                          deleteComment(comment.id);
                                        }
                                      }}
                                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
                                      title="Excluir comentário"
                                    >
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {editingComment === comment.id ? (
                                <div className="space-y-3">
                                  <textarea
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    rows="3"
                                    placeholder="Edite seu comentário..."
                                  />
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={saveEditComment}
                                      disabled={!editCommentText.trim()}
                                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Salvar
                                    </button>
                                    <button
                                      onClick={cancelEditComment}
                                      className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Videos Grid - Esconder quando um vídeo está selecionado */}
            {!selectedVideo && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">

                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full p-3 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <polygon points="10,8 16,12 10,16 10,8"/>
                        </svg>
                      </button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>

                    {/* Progress Badge */}
                    {videoProgress[video.id] > 0 && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {Math.round(videoProgress[video.id])}%
                      </div>
                    )}

                    {/* Evaluation Badge */}
                    {videoEvaluations[video.id] && (
                      <div className="absolute top-2 left-16 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center">
                        ★ {videoEvaluations[video.id].rating}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{video.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2">{video.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        video.level === 'Iniciante' ? 'bg-green-100 text-green-700' :
                        video.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {video.level}
                      </span>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{video.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">Por {video.instructor}</p>
                  </div>
                </div>
                ))}
              </div>
            )}

            {!selectedVideo && filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">Nenhum vídeo encontrado</p>
              </div>
            )}

            {/* Dashboard Section - Show when no video is selected */}
            {!selectedVideo && (
              <div className="mt-8">
                <MainDashboard />
              </div>
            )}
          </div>
        </div>

        {/* Modal para Adicionar Vídeo */}
        {showAddVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Adicionar Novo Vídeo</h3>
                  <button
                    onClick={() => setShowAddVideoModal(false)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddVideo} className="space-y-4">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Título do Vídeo *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newVideoForm.title}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Ex: Como cadastrar um novo cliente"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrição *
                    </label>
                    <textarea
                      name="description"
                      value={newVideoForm.description}
                      onChange={handleNewVideoChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Descreva o conteúdo do vídeo..."
                    />
                  </div>

                  {/* URL do YouTube */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL do YouTube *
                    </label>
                    <input
                      type="url"
                      name="youtubeUrl"
                      value={newVideoForm.youtubeUrl}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Cole o link completo do vídeo no YouTube
                    </p>
                  </div>

                  {/* Módulo e Nível - Grid 2 colunas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Módulo AtendaX *
                      </label>
                      <select
                        name="module"
                        value={newVideoForm.module}
                        onChange={handleNewVideoChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="cadastro-cliente">Cadastro de Cliente</option>
                        <option value="vendas">Vendas</option>
                        <option value="comunicacao">Comunicação</option>
                        <option value="gestao-usuarios">Gestão de Usuários</option>
                        <option value="relatorios">Relatórios</option>
                        <option value="configuracoes">Configurações</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nível de Dificuldade *
                      </label>
                      <select
                        name="level"
                        value={newVideoForm.level}
                        onChange={handleNewVideoChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                      </select>
                    </div>
                  </div>

                  {/* Instrutor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instrutor *
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={newVideoForm.instructor}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Nome do instrutor"
                    />
                  </div>

                  {/* Botões */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={() => setShowAddVideoModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                    >
                      Adicionar Vídeo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal de Avaliação do Vídeo */}
      {showEvaluationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Parabéns!</h3>
                    <p className="text-gray-600 dark:text-gray-300">Você completou o vídeo "{selectedVideo?.title}"</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleEvaluationSubmit} className="space-y-6">
                {/* Avaliação por Estrelas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Como você avalia este vídeo? *
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(currentEvaluation.rating, (rating) =>
                      setCurrentEvaluation(prev => ({ ...prev, rating }))
                    )}
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                      {currentEvaluation.rating > 0 && (
                        currentEvaluation.rating === 1 ? 'Muito ruim' :
                        currentEvaluation.rating === 2 ? 'Ruim' :
                        currentEvaluation.rating === 3 ? 'Bom' :
                        currentEvaluation.rating === 4 ? 'Muito bom' :
                        'Excelente'
                      )}
                    </span>
                  </div>
                </div>

                {/* Comentário sobre Aprendizado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    O que você aprendeu com este vídeo?
                  </label>
                  <textarea
                    value={currentEvaluation.learningComment}
                    onChange={(e) => setCurrentEvaluation(prev => ({ ...prev, learningComment: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Descreva os principais conhecimentos que você adquiriu..."
                  />
                </div>

                {/* Sugestões de Melhoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sugestões para melhorar este conteúdo
                  </label>
                  <textarea
                    value={currentEvaluation.suggestions}
                    onChange={(e) => setCurrentEvaluation(prev => ({ ...prev, suggestions: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Como podemos melhorar este vídeo? (opcional)"
                  />
                </div>

                {/* Recomendação */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Você recomendaria este vídeo para outros colegas? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value="true"
                        checked={currentEvaluation.wouldRecommend === true}
                        onChange={() => setCurrentEvaluation(prev => ({ ...prev, wouldRecommend: true }))}
                        className="text-green-600 focus:ring-green-500 dark:focus:ring-green-400"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Sim, definitivamente recomendaria</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value="false"
                        checked={currentEvaluation.wouldRecommend === false}
                        onChange={() => setCurrentEvaluation(prev => ({ ...prev, wouldRecommend: false }))}
                        className="text-red-600 focus:ring-red-500 dark:focus:ring-red-400"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Não recomendaria</span>
                    </label>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={closeEvaluationModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Pular Avaliação
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar Avaliação
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Theme Settings Modal */}
      {showThemeSettings && (
        <ThemeSettings
          isOpen={showThemeSettings}
          onClose={() => setShowThemeSettings(false)}
        />
      )}

    </div>
  );
};

export default VideoTraining;