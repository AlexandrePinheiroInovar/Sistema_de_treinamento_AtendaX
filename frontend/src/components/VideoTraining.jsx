import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SimpleAuthContext';

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

  // Carregar progresso dos vídeos do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('atendax_video_progress');
    if (savedProgress) {
      setVideoProgress(JSON.parse(savedProgress));
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

  // Filtrar vídeos
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === 'all' || video.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vídeos de Treinamento</h1>
                <p className="text-gray-600">Desenvolva suas habilidades com nossos cursos em vídeo</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Dúvidas Frequentes
              </button>
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Vídeo
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
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>

              {/* Busca */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar vídeos..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Módulo AtendaX */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Módulo AtendaX</label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Seu Progresso</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vídeos Assistidos:</span>
                    <span className="font-semibold">{Object.keys(videoProgress).filter(id => videoProgress[id] >= 95).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total de Vídeos:</span>
                    <span className="font-semibold">{videos.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Progresso Geral:</span>
                    <span className="font-semibold">
                      {Math.round((Object.keys(videoProgress).filter(id => videoProgress[id] >= 95).length / videos.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Sidebar */}
            {showFAQ && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Dúvidas Frequentes
                </h3>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Video Player */}
            {selectedVideo && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                    title={selectedVideo.title}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-96 rounded-lg"
                  ></iframe>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
                    <p className="text-gray-600 mb-3">{selectedVideo.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Por {selectedVideo.instructor}</span>
                      <span>•</span>
                      <span>{selectedVideo.duration}</span>
                      <span>•</span>
                      <span>{selectedVideo.views} visualizações</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${videoProgress[selectedVideo.id] || 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Progresso: {videoProgress[selectedVideo.id] || 0}% completo
                </p>
              </div>
            )}

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">

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
                        className="bg-white text-blue-600 rounded-full p-3 hover:bg-blue-50 transition-colors"
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
                        {videoProgress[video.id]}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{video.title}</h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{video.description}</p>

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
                        <span className="text-xs text-gray-600">{video.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">Por {video.instructor}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">Nenhum vídeo encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal para Adicionar Vídeo */}
        {showAddVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Adicionar Novo Vídeo</h3>
                  <button
                    onClick={() => setShowAddVideoModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddVideo} className="space-y-4">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título do Vídeo *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newVideoForm.title}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Como cadastrar um novo cliente"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição *
                    </label>
                    <textarea
                      name="description"
                      value={newVideoForm.description}
                      onChange={handleNewVideoChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descreva o conteúdo do vídeo..."
                    />
                  </div>

                  {/* URL do YouTube */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL do YouTube *
                    </label>
                    <input
                      type="url"
                      name="youtubeUrl"
                      value={newVideoForm.youtubeUrl}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Cole o link completo do vídeo no YouTube
                    </p>
                  </div>

                  {/* Módulo e Nível - Grid 2 colunas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Módulo AtendaX *
                      </label>
                      <select
                        name="module"
                        value={newVideoForm.module}
                        onChange={handleNewVideoChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nível de Dificuldade *
                      </label>
                      <select
                        name="level"
                        value={newVideoForm.level}
                        onChange={handleNewVideoChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                      </select>
                    </div>
                  </div>

                  {/* Instrutor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instrutor *
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={newVideoForm.instructor}
                      onChange={handleNewVideoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome do instrutor"
                    />
                  </div>

                  {/* Botões */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddVideoModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
    </div>
  );
};

export default VideoTraining;