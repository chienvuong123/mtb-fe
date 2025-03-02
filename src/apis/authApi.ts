import type {
  AuthOtpDTO,
  AuthOtpRequest,
  AuthRequest,
  AuthResponse,
  BaseResponse,
  ChangePasswordRequest,
  UserInfoOtpRequest,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

export class AuthApi extends BaseApi<AuthOtpDTO, AuthOtpRequest> {
  constructor() {
    super('/auth/v1.0');
  }

  login(data: AuthRequest) {
    return apiRequest<BaseResponse<AuthResponse>>({
      url: `${this.endpoint}/login`,
      method: 'POST',
      data,
    });
  }

  logout(data: AuthRequest) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/logout`,
      method: 'POST',
      data,
    });
  }

  async verifyOtpForgotPassword(data: Partial<UserInfoOtpRequest>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/verify-otp-forgot-password`,
      method: 'POST',
      data,
    });
  }

  async verifyInfoUserForgotPassword(data: Partial<UserInfoOtpRequest>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/verify-info-user-forgot-password`,
      method: 'POST',
      data,
    });
  }

  async verifyInfoTokenChangePassword(data: ChangePasswordRequest) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/verify-token-change-password`,
      method: 'POST',
      params: data,
    });
  }

  async resetForgotPassword(data: Partial<UserInfoOtpRequest>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/reset-forgot-password`,
      method: 'POST',
      data,
    });
  }

  async requestChangePassword() {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/request-change-password`,
      method: 'POST',
    });
  }

  async changePassword(data: Partial<ChangePasswordRequest>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/change-password`,
      method: 'POST',
      data,
    });
  }
}

export const authApi = new AuthApi();
