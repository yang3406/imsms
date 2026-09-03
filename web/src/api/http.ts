import axios from 'axios';
import { ElMessage } from 'element-plus';

export const http = axios.create({ baseURL: '/api', timeout: 10000 });
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('meeting-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
http.interceptors.response.use((response) => response, (error) => {
  const message = error.response?.data?.message ?? '网络请求失败，请稍后重试';
  if (error.response?.status === 401 && location.pathname !== '/login') {
    localStorage.removeItem('meeting-token');
    localStorage.removeItem('meeting-user');
    location.href = '/login';
  }
  ElMessage.error(message);
  return Promise.reject(error);
});
