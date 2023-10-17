import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

// Set up a request interceptor to add the token to request headers
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;