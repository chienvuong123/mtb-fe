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
    } else {
      config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZT1VIU0xUblZsc0tKT3BDVHk1b2J4ZGRycUdiZ1EtOVNMd2RfVE85M0JzIn0.eyJleHAiOjE3Mzg3NTQwMzEsImlhdCI6MTczODc1MzczMSwianRpIjoiNDhhZjdiY2UtMDAzZC00Njc3LTgwNGUtMzNiM2MzMGQ2YWYyIiwiaXNzIjoiaHR0cDovL2Ntc3NvLmFwc3Byby5zaXRlL3JlYWxtcy9tYi1jbSIsInN1YiI6IjQwOWVhZjcwLTkyMmYtNGRkZS04YWE4LWVkOGY5NGI5ZmUyYyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1iLWNtLXNlcnZpY2UiLCJzaWQiOiJiZjE1YTlkMi0xNDU0LTRkMjktOTNhZi04NzFlYmUyYTM3N2MiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJBRE1JTiJdfSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiYWRtaW4gaGloaSIsInByZWZlcnJlZF91c2VybmFtZSI6Im1iY20iLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJmYW1pbHlfbmFtZSI6ImhpaGkiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.tz0gQCTR2FxW1NEpvXoW_rIpIl_i1tSj0-QBYobU5Z7iSbig-D_9xNwQLUVwo114cQfZtXcMs0ATJCS-3oP_tcwo9WeIY8nj1B43ff1XbmtDC3izriBg88LOFYeuCRBcqFn8KYKAufRJXCAe3_kUnK9qFL3XqH_s3MTmyI71DnF1uJ0IEFfOhsjvmRjG2bbxOosvLfccFWpzu-FyMNc7zhmMGGngvEIcaRPRZYhRVPNAHXQoFShv_8_Hw53TQlfmdNiz1d-qKsdvPBo8eRAfGV0Mw_AkOmf4l-eUc_bIyq4vGBPnnggTA6cu9SAO9F-_w5G_U0DttHEfqg-TbkugEA`;
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
        console.error('Failed to refresh token:', refreshError);
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
