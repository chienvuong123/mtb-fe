import type {
  AuthOtpDTO,
  AuthOtpRequest,
  BaseResponse,
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

  async resetForgotPassword(data: Partial<UserInfoOtpRequest>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/reset-forgot-password`,
      method: 'POST',
      data,
    });
  }
}

export const authOtpApi = new AuthOTPApi();
