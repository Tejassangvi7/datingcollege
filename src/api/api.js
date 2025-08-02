import axios from 'axios';

const api = axios.create({
  baseURL:  'https://datingwebsite-backend-tv10.onrender.com',
  timeout: 10_000,    // 10 seconds
});

// Request interceptor adds token
api.interceptors.request.use(async(config) => {
  const token =  localStorage.getItem('token');
  const UserID =  localStorage.getItem('UserID');
  if (token &&UserID ) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.UserID = UserID;
  }
  return config;
});

// Response interceptor handles auth failures globally
api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = 'http://localhost:5173/login';
    }
    return Promise.reject(err);
  }
);

export default api;
