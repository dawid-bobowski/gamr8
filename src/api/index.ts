import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || '127.0.0.1';
const PORT = import.meta.env.REACT_APP_PORT || '5000';

const instance = axios.create({
  baseURL: `http://${BASE_URL}:${PORT}`,
});

// Set up a request interceptor to add the token to request headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
