import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const getProfile = () => api.get('/content/profile');
export const getSkills = () => api.get('/content/skills');
export const getExperience = () => api.get('/content/experience');
export const getEducation = () => api.get('/content/education');
export const getCertifications = () => api.get('/content/certifications');
export const getProjects = (params) => api.get('/projects', { params });
export const getProject = (id) => api.get(`/projects/${id}`);
export const submitContact = (data) => api.post('/contact', data);
export const downloadResumeUrl = () =>
  `${API_URL.replace(/\/api$/, '')}/api/resume/download`;

export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

export const admin = {
  projects: {
    list: () => api.get('/projects/admin/all'),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    remove: (id) => api.delete(`/projects/${id}`),
  },
  skills: {
    list: () => api.get('/content/skills/admin'),
    create: (data) => api.post('/content/skills', data),
    update: (id, data) => api.put(`/content/skills/${id}`, data),
    remove: (id) => api.delete(`/content/skills/${id}`),
  },
  experience: {
    list: () => api.get('/content/experience/admin'),
    create: (data) => api.post('/content/experience', data),
    update: (id, data) => api.put(`/content/experience/${id}`, data),
    remove: (id) => api.delete(`/content/experience/${id}`),
  },
  resume: {
    list: () => api.get('/resume/admin'),
    upload: (file) => {
      const form = new FormData();
      form.append('resume', file);
      return api.post('/resume/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  },
  messages: {
    list: () => api.get('/messages'),
    markRead: (id) => api.patch(`/messages/${id}/read`),
  },
  profile: {
    update: (data) => api.put('/content/profile', data),
  },
};
