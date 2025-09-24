import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/SimpleAuthContext';
import ThemeSettings from './ThemeSettings';

const Certification = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [completedVideos, setCompletedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  // Carregar vídeos completados do localStorage
  useEffect(() => {
    const savedCompletedVideos = localStorage.getItem('atendax_completed_videos');
    if (savedCompletedVideos) {
      setCompletedVideos(JSON.parse(savedCompletedVideos));
    }
  }, []);

  // Gerar certificado (versão simplificada)
  const generateCertificate = (video) => {
    setLoading(true);

    try {
      // Criar certificado visual simples
      const certificateId = `PRISMX-${video.id}-${Date.now()}`;
      const completedDate = new Date(video.completedAt).toLocaleDateString('pt-BR');

      // Marcar certificado como gerado
      const updatedVideos = completedVideos.map(v =>
        v.id === video.id ? { ...v, certificateGenerated: true, certificateId } : v
      );
      setCompletedVideos(updatedVideos);
      localStorage.setItem('atendax_completed_videos', JSON.stringify(updatedVideos));

      // Abrir página de certificado em nova janela
      const certificateData = {
        userName: userData?.name || 'Nome do Usuário',
        courseName: video.title,
        instructor: video.instructor,
        duration: video.duration,
        module: getModuleName(video.module),
        completedDate: completedDate,
        certificateId: certificateId
      };

      // Criar HTML do certificado
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificado - ${video.title}</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(45deg, #f8fafc, #e2e8f0);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .certificate {
              background: white;
              padding: 60px;
              border-radius: 20px;
              box-shadow: 0 25px 50px rgba(0,0,0,0.15);
              max-width: 800px;
              text-align: center;
              border: 8px solid #3b82f6;
              position: relative;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 15px;
              left: 15px;
              right: 15px;
              bottom: 15px;
              border: 2px solid #fbbf24;
              border-radius: 12px;
            }
            .logo {
              width: 120px;
              height: 120px;
              background: #3b82f6;
              border-radius: 50%;
              margin: 0 auto 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: bold;
            }
            h1 {
              color: #1f2937;
              font-size: 36px;
              margin: 30px 0;
              font-weight: bold;
            }
            .student-name {
              color: #3b82f6;
              font-size: 32px;
              font-weight: bold;
              margin: 30px 0;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 10px;
            }
            .course-name {
              color: #1f2937;
              font-size: 24px;
              font-weight: bold;
              margin: 30px 0;
              font-style: italic;
            }
            .details {
              margin: 40px 0;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              font-size: 16px;
            }
            .detail {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
            }
            .signature {
              margin-top: 50px;
              font-size: 14px;
              color: #6b7280;
            }
            .certificate-id {
              font-size: 12px;
              color: #9ca3af;
              margin-top: 20px;
            }
            @media print {
              body { background: white; padding: 0; }
              .certificate { box-shadow: none; border: 2px solid #3b82f6; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="logo">PRISMX</div>
            <h1>CERTIFICADO DE CONCLUSÃO</h1>
            <p style="font-size: 18px; margin: 20px 0;">Certificamos que</p>
            <div class="student-name">${certificateData.userName}</div>
            <p style="font-size: 18px; margin: 20px 0;">concluiu com êxito o treinamento:</p>
            <div class="course-name">${certificateData.courseName}</div>

            <div class="details">
              <div class="detail">
                <strong>Instrutor:</strong><br>${certificateData.instructor}
              </div>
              <div class="detail">
                <strong>Duração:</strong><br>${certificateData.duration}
              </div>
              <div class="detail">
                <strong>Módulo:</strong><br>${certificateData.module}
              </div>
              <div class="detail">
                <strong>Data de Conclusão:</strong><br>${certificateData.completedDate}
              </div>
            </div>

            <div class="signature">
              Certificado gerado digitalmente pelo Sistema PrismX<br>
              <strong>PrismX - Sistema de Treinamento</strong>
            </div>

            <div class="certificate-id">
              ID do Certificado: ${certificateData.certificateId}
            </div>
          </div>

          <script>
            // Auto print quando abrir
            setTimeout(() => {
              window.print();
            }, 1000);
          </script>
        </body>
        </html>
      `;

      // Abrir em nova janela
      const newWindow = window.open('', '_blank');
      newWindow.document.write(certificateHTML);
      newWindow.document.close();

      alert('🎉 Certificado gerado com sucesso! Uma nova janela foi aberta para impressão.');
    } catch (error) {
      console.error('Erro ao gerar certificado:', error);
      alert('❌ Erro ao gerar certificado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Obter nome do módulo
  const getModuleName = (moduleKey) => {
    const modules = {
      'cadastro-cliente': 'Cadastro de Cliente',
      'vendas': 'Vendas',
      'comunicacao': 'Comunicação',
      'gestao-usuarios': 'Gestão de Usuários',
      'relatorios': 'Relatórios',
      'configuracoes': 'Configurações'
    };
    return modules[moduleKey] || 'Módulo Geral';
  };

  // Obter cor do nível
  const getLevelColor = (level) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Intermediário': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Avançado': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Theme Settings Button */}
      <button
        onClick={() => setShowThemeSettings(true)}
        className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
        title="Configurações de Tema"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificações</h1>
                <p className="text-gray-600 dark:text-gray-300">Seus certificados de conclusão de treinamentos</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/videos')}
                className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Ver Vídeos
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedVideos.length}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Treinamentos Concluídos</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedVideos.filter(v => v.certificateGenerated).length}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Certificados Gerados</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedVideos.filter(v => !v.certificateGenerated).length}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Disponíveis para Resgate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Certificados */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Seus Certificados</h2>

          {completedVideos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 713.138-3.138z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Nenhum treinamento concluído ainda</p>
              <p className="text-gray-400 dark:text-gray-500 mb-4">Complete seus primeiros vídeos para gerar certificados</p>
              <button
                onClick={() => navigate('/videos')}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Assistir Vídeos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {completedVideos.map((video) => (
                <div key={video.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{video.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{video.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(video.level)}`}>
                          {video.level}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div>
                          <span className="font-medium">Instrutor:</span>
                          <p>{video.instructor}</p>
                        </div>
                        <div>
                          <span className="font-medium">Duração:</span>
                          <p>{video.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Módulo:</span>
                          <p>{getModuleName(video.module)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Concluído em:</span>
                          <p>{new Date(video.completedAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col items-center">
                      {video.certificateGenerated ? (
                        <div className="text-center">
                          <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">Certificado Gerado</p>
                          <button
                            onClick={() => generateCertificate(video)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                          >
                            Baixar Novamente
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">Disponível</p>
                          <button
                            onClick={() => generateCertificate(video)}
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors flex items-center"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Gerando...
                              </>
                            ) : (
                              'Gerar Certificado'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

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

export default Certification;