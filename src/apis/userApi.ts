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
}

export const userApi = new UserApi();
