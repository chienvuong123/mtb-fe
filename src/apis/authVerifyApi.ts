import type { AuthRequest, AuthResponse } from '@dtos';
import qs from 'qs';
import { BASE_URL_AUTH, CLIENT_ID, CLIENT_SECRET } from '@constants/baseUrl';
import { apiRequest } from './apiClient';

export class AuthVerifyApi {
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(url: string, data: AuthRequest) {
    const payload = { ...data };

    if (!payload.client_id || !payload.client_secret) {
      payload.client_id = CLIENT_ID;
      payload.client_secret = CLIENT_SECRET;
    }

    return apiRequest<AuthResponse>({
      url: `${url}`,
      method: 'POST',
      data: qs.stringify(payload),
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        noReqNo: true,
      },
    });
  }

  login(data: AuthRequest) {
    return this.request('/token', data);
  }

  logout(data: AuthRequest) {
    return this.request('/logout', data);
  }
}

export const authApi = new AuthVerifyApi(BASE_URL_AUTH);
