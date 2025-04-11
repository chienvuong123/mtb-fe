import { groupCustomerApi } from '@apis';
import type {
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
  GroupCustomerSearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const GROUP_CUSTOMER_KEY = 'group-customer';

export const {
  useSearchQuery: useGroupCustomerSearchQuery,
  useAddMutation: useGroupCustomerAddMutation,
} = createBaseQueryHooks<
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
  GroupCustomerSearchResponse
>(GROUP_CUSTOMER_KEY, groupCustomerApi);
