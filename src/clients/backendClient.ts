import axios from 'axios';

export const backendClient = axios.create({
  // baseURL: 'http://localhost:3002/api'
  // baseURL: 'https://ps-mod16-back-end.onrender.com/api'
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});
