// Serviços de API para comunicação com o backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método auxiliar para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Método para adicionar token de autenticação
  async authenticatedRequest(endpoint, options = {}, token) {
    return this.request(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    });
  }

  // === USUÁRIOS ===

  async getUsers(token) {
    return this.authenticatedRequest('/users', { method: 'GET' }, token);
  }

  async createUser(userData, token) {
    return this.authenticatedRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    }, token);
  }

  async updateUser(userId, userData, token) {
    return this.authenticatedRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    }, token);
  }

  async deleteUser(userId, token) {
    return this.authenticatedRequest(`/users/${userId}`, {
      method: 'DELETE'
    }, token);
  }

  // === VÍDEOS ===

  async getVideos(token) {
    return this.authenticatedRequest('/videos', { method: 'GET' }, token);
  }

  async createVideo(videoData, token) {
    return this.authenticatedRequest('/videos', {
      method: 'POST',
      body: JSON.stringify(videoData)
    }, token);
  }

  async updateVideo(videoId, videoData, token) {
    return this.authenticatedRequest(`/videos/${videoId}`, {
      method: 'PUT',
      body: JSON.stringify(videoData)
    }, token);
  }

  async deleteVideo(videoId, token) {
    return this.authenticatedRequest(`/videos/${videoId}`, {
      method: 'DELETE'
    }, token);
  }

  // === PROGRESSO ===

  async getUserProgress(token) {
    return this.authenticatedRequest('/progress', { method: 'GET' }, token);
  }

  async updateProgress(progressData, token) {
    return this.authenticatedRequest('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData)
    }, token);
  }

  // === CERTIFICADOS ===

  async checkCertificateEligibility(token) {
    return this.authenticatedRequest('/certificate/eligibility', { method: 'GET' }, token);
  }

  async generateCertificate(token) {
    return this.authenticatedRequest('/certificate', {
      method: 'POST'
    }, token);
  }

  // === DASHBOARD ADMIN ===

  async getAdminDashboard(token) {
    return this.authenticatedRequest('/admin/dashboard', { method: 'GET' }, token);
  }

  // === HEALTH CHECK ===

  async healthCheck() {
    return this.request('/health', { method: 'GET' });
  }
}

export const apiService = new ApiService();