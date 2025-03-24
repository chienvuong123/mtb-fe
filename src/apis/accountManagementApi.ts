import type { AccountManagementSearchRequest } from 'src/dtos/account-management';
import type { UserDTO } from 'src/dtos/auth';
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
