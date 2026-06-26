import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shortflix-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getHomeData = () => api.get('/home');
export const getCategories = () => api.get('/categories');
export const getSeries = (params) => api.get('/series', { params });
export const getSeriesById = (id) => api.get(`/series/${id}`);
export const getEpisodesBySeriesId = (id) => api.get(`/series/${id}/episodes`);
export const getEpisodeById = (id) => api.get(`/episodes/${id}`);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export default api;
