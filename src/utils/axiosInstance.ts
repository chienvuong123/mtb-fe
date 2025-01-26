// src/utils/axiosInstance.js
import { BASE_URL } from '@constants/baseUrl';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
