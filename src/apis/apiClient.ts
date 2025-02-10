/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import qs from 'qs';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import {
  BASE_URL,
  BASE_URL_AUTH,
  CLIENT_ID,
  CLIENT_SECRET,
} from '@constants/baseUrl';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Thêm _retry vào cấu hình
}

const generateReqNo = () => {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${random}`;
};

const onRefreshToken = (token: string) => {
  return axios.post(
    `${BASE_URL_AUTH}/token`,
    qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: token,
      grant_type: 'refresh_token',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors setup
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.reqNo = generateReqNo();
    if (config?.params?.noReqNo) {
      delete config.headers.reqNo;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) throw new Error('Token are undefined');
      try {
        if (originalRequest.headers) {
          const response = await onRefreshToken(refreshToken);
          if (response) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
          }

          return apiClient(originalRequest);
        }
        throw new Error('Headers are undefined');
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient(config);
  return response.data;
}
