import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shortflix-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHomeData = () => api.get('/home');
export const getCategories = () => api.get('/categories');
export const getSeries = (params) => api.get('/series', { params });
export const getSeriesById = (id) => api.get(`/series/${id}`);
export const getEpisodesBySeriesId = (id) => api.get(`/series/${id}/episodes`);
export const getEpisodeById = (id) => api.get(`/episodes/${id}`);

export default api;
