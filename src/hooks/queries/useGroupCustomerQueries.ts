import { groupCustomerApi } from '@apis';
import type {
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
  GroupCustomerSearchResponse,
} from 'src/dtos/group-customer';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useGroupCustomerSearchQuery,
  useViewQuery: useGroupCustomerViewQuery,
  useAddMutation: useGroupCustomerAddMutation,
} = createBaseQueryHooks<
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
  GroupCustomerSearchResponse
>('media-category', groupCustomerApi);
