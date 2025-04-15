/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import qs from 'qs';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '@constants/env';
import type { BaseResponse } from '@dtos';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const generateReqNo = () => {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${random}`;
};

const paramsSerializer = (params: Record<string, unknown>) => {
  return qs.stringify(params, {
    arrayFormat: 'comma',
    encode: false, // Do not encode parameters (keep dots as they are)
    allowDots: true, // Allow dot notation for nested objects
  });
};

const redirectToLogin = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshTokenPromise: Promise<any> | null = null;

const onRefreshToken = (token: string) => {
  return axios.post(`${BASE_URL}auth/v1.0/refresh-token`, {
    refreshToken: token,
  });
};

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

    if (error.response?.status && error.response.status >= 500) {
      window.location.href = '/500';
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      (error.response.data as BaseResponse<boolean>)?.errorCode === '0006'
    ) {
      redirectToLogin();
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        redirectToLogin();
        throw error;
      }

      try {
        if (originalRequest.headers) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = onRefreshToken(refreshToken).finally(() => {
              refreshTokenPromise = null;
            });
          }

          const response = await refreshTokenPromise;
          if (response.data.errorCode === '0') {
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem(
              'refresh_token',
              response.data.data.refreshToken,
            );
            originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          } else {
            redirectToLogin();
          }

          return apiClient(originalRequest);
        }
        throw new Error('Headers are undefined');
      } catch (refreshError) {
        redirectToLogin();
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

export async function apiRequestAll<T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  const response = await apiClient(config);
  return response;
}

export async function apiRequestFile<T>({
  headers,
  signal,
  ...config
}: AxiosRequestConfig): Promise<T> {
  const controller = new AbortController();
  const abortSignal = signal || controller.signal;

  const response = await apiClient({
    ...config,
    signal: abortSignal,
    timeout: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...headers,
    },
  });

  return response.data;
}
