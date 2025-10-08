import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';

export const backendClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export function setupCatch401(navigate: NavigateFunction, token: string) {
  // ensure that auth token is sent on first requests
  backendClient.defaults.headers.common['Authorization'] = token;
  backendClient.defaults.headers.common['Authorization'] = token;

  // check all API calls for 401 errors (bad/expired token)
  // and send them to the login page
  backendClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        navigate(
          import.meta.env.PROD
            ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
            : `../signin`
        );
      }
      return error;
    }
  );
}
