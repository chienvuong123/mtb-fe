import { accountManagementApi } from '@apis';
import type {
  AccountManagementSearchRequest,
  AccountManagementSearchResponse,
} from 'src/dtos/account-management';
import type { UserDTO } from 'src/dtos/auth';
import { createBaseQueryHooks } from './baseQueries';

export const ACCOUNT_MANAGEMENT_KEY = 'account-management';

export const {
  useSearchQuery: useAccountManagementSearchQuery,
  useViewQuery: useAccountManagementViewQuery,
  useAddMutation: useAccountManagementAddMutation,
  useEditMutation: useAccountManagementEditMutation,
  useRemoveMutation: useAccountManagementRemoveMutation,
} = createBaseQueryHooks<
  UserDTO,
  AccountManagementSearchRequest,
  AccountManagementSearchResponse
>(ACCOUNT_MANAGEMENT_KEY, accountManagementApi);
