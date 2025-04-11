import { accountManagementApi } from '@apis';
import type {
  AccountManagementSearchRequest,
  AccountManagementSearchResponse,
  UserDTO,
} from '@dtos';
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
