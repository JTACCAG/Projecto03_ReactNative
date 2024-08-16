import axios from 'axios';
import Config from 'react-native-config';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../storageService';
import {authRefreshToken, routesAuth} from './authService';
import {IAuthContext} from '../../nagivation/context/AuthContext';

const apiClient = axios.create({
  baseURL: Config.API_URL, // Cambia esto a tu URL base
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setupAxiosInterceptors = (auth: IAuthContext) => {
  apiClient.interceptors.request.use(
    async config => {
      // Agrega headers o realiza otras configuraciones
      const token = await getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const errorApi = error?.response?.data;
      if (errorApi.statusCode === 401) {
        const refreshToken = await getRefreshToken();
        const url = error.response.config.url;
        if (refreshToken && !routesAuth.refreshToken.endsWith(url)) {
          const response = await authRefreshToken(refreshToken);
          if (response.success) {
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
          } else {
            await auth.logout();
            // removeAccess();
          }
        } else {
          await auth.logout();
          // removeAccess();
        }
      }
      return Promise.reject(error);
    },
  );
};

export {apiClient, setupAxiosInterceptors};
