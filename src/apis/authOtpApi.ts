import type {
  AuthOtpDTO,
  AuthOtpRequest,
  BaseResponse,
  ChangePasswordRequest,
  UserInfoOtpRequest,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

export class AuthOTPApi extends BaseApi<AuthOtpDTO, AuthOtpRequest> {
  constructor() {
    super('/auth/v1.0');
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

export const authOtpApi = new AuthOTPApi();
