import type { CustomerDTO, CustomerSearchRequest } from '@dtos';
import { customerApi } from '@apis';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCustomerSearchQuery,
  useViewQuery: useCustomerViewQuery,
  useAddMutation: useCustomerAddMutation,
  useEditMutation: useCustomerEditMutation,
  useRemoveMutation: useCustomerRemoveMutation,
} = createBaseQueryHooks<CustomerDTO, CustomerSearchRequest>(
  'customer-list',
  customerApi,
);

// define other queries
