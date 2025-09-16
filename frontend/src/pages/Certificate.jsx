import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Award,
  Download,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  RefreshCw
} from '../components/Icons';

const Certificate = () => {
  const { userData, getCurrentUserToken } = useAuth();
  const certificateRef = useRef(null);
  const [eligibility, setEligibility] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCertificateData = async () => {
      try {
        setLoading(true);
        const token = await getCurrentUserToken();

        const eligibilityData = await apiService.checkCertificateEligibility(token);
        setEligibility(eligibilityData);

        if (eligibilityData.eligible) {
          try {
            const certificateData = await apiService.generateCertificate(token);
            setCertificate(certificateData);
          } catch (certError) {
            console.error('Erro ao buscar certificado:', certError);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do certificado:', error);
        setError('Erro ao carregar dados do certificado');
      } finally {
        setLoading(false);
      }
    };

    loadCertificateData();
  }, [getCurrentUserToken]);

  const generatePDF = async () => {
    if (!certificateRef.current) return;

    try {
      setGenerating(true);

      // Configurações para melhor qualidade
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: 600
      });

      const imgData = canvas.toDataURL('image/png');

      // Criar PDF no formato paisagem (A4)
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297; // A4 landscape width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Nome do arquivo com data
      const fileName = `certificado-atendax-${userData?.name?.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF do certificado');
    } finally {
      setGenerating(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return new Date().toLocaleDateString('pt-BR');

    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando elegibilidade...</p>
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
        </div>
      </div>
    );
  }

  // Se não for elegível para certificado
  if (!eligibility?.eligible) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificado de Conclusão</h1>
          <p className="text-gray-600">Complete todos os vídeos para desbloquear seu certificado</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Certificado não disponível ainda
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {eligibility?.completedVideos || 0}
                  </div>
                  <div className="text-gray-600">Vídeos Concluídos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {eligibility?.totalVideos || 0}
                  </div>
                  <div className="text-gray-600">Total de Vídeos</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progresso</span>
                  <span className="text-sm text-gray-600">
                    {eligibility?.totalVideos > 0
                      ? Math.round((eligibility.completedVideos / eligibility.totalVideos) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${eligibility?.totalVideos > 0
                        ? (eligibility.completedVideos / eligibility.totalVideos) * 100
                        : 0}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Você precisa concluir <strong>{eligibility?.remainingVideos || 0}</strong> vídeo(s)
              para desbloquear seu certificado de conclusão.
            </p>

            <a
              href="/videos"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Continuar Treinamento</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Parabéns!</h1>
        <p className="text-gray-600">Você concluiu o treinamento e pode baixar seu certificado</p>
      </div>

      {/* Actions */}
      <div className="flex justify-center mb-8">
        <button
          onClick={generatePDF}
          disabled={generating}
          className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Gerando PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Baixar Certificado (PDF)</span>
            </>
          )}
        </button>
      </div>

      {/* Certificate Preview */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          ref={certificateRef}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 text-center"
          style={{ aspectRatio: '4/3', minHeight: '600px' }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-primary-800 mb-2">
              CERTIFICADO DE CONCLUSÃO
            </h1>
            <div className="w-32 h-1 bg-primary-600 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              Certificamos que
            </p>

            <h2 className="text-5xl font-bold text-primary-800 mb-6 tracking-wide">
              {userData?.name?.toUpperCase() || 'NOME DO USUÁRIO'}
            </h2>

            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              concluiu com êxito o <strong>Sistema de Treinamento AtendaX</strong>,
              demonstrando dedicação e comprometimento no desenvolvimento de suas competências profissionais.
            </p>
          </div>

          {/* Details */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">VÍDEOS CONCLUÍDOS</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {eligibility?.completedVideos || 0}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">DATA DE CONCLUSÃO</span>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {formatDate(certificate?.completedAt)}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <User className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">CERTIFICADO Nº</span>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {certificate?.id?.substring(0, 8).toUpperCase() || 'XXXXXXXX'}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-8">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-primary-800 mb-2">AtendaX</div>
              <p className="text-sm text-gray-600">Sistema de Treinamento Profissional</p>
            </div>

            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                <p className="text-xs text-gray-500">Certificado Digital</p>
              </div>

              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>

              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                <p className="text-xs text-gray-500">
                  {new Date().getFullYear()} - Todos os direitos reservados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
          <div className="text-sm text-blue-800">
            <strong>Certificado válido:</strong> Este certificado comprova a conclusão do treinamento
            AtendaX em {formatDate(certificate?.completedAt)}.
            O documento é gerado automaticamente pelo sistema e possui validade integral.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;