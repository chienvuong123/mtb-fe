import type { AccountManagementSearchRequest } from 'src/dtos/account-management';
import type { UserDTO } from 'src/dtos/auth';
import { BaseApi } from './baseApi';

export const ACCOUNT_MANAGEMENT_KEY = '/user/v1.0';
class AccountManagementApi extends BaseApi<
  UserDTO,
  AccountManagementSearchRequest
> {
  constructor() {
    super(ACCOUNT_MANAGEMENT_KEY);
  }
}

export const accountManagementApi = new AccountManagementApi();
