import type { BaseResponse, UserDTO, UserRequest } from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class UserApi extends BaseApi<UserDTO, UserRequest> {
  constructor() {
    super('/user/v1.0');
  }

  async getUserInfo() {
    return apiRequest<BaseResponse<UserDTO>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
    });
  }

  async sendOtpUpdateEmail(data: UserDTO) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/send-otp-update-email`,
      method: 'POST',
      data,
    });
  }

  async verifyOtpUpdateEmail(otp: string) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/verify-otp-update-email`,
      method: 'POST',
      data: { otp },
    });
  }
}

export const userApi = new UserApi();
