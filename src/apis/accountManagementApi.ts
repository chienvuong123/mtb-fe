import type { AccountManagementSearchRequest, UserDTO } from '@dtos';
import { BaseApi } from './baseApi';

class AccountManagementApi extends BaseApi<
  UserDTO,
  AccountManagementSearchRequest
> {
  constructor() {
    super('/user/v1.0');
  }
}

export const accountManagementApi = new AccountManagementApi();
