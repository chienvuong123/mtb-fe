import type { UserDTO, UserRequest } from '@dtos';
import { BaseApi } from './baseApi';

class UserApi extends BaseApi<UserDTO, UserRequest> {
  constructor() {
    super('/user/v1.0');
  }
}

export const userApi = new UserApi();
