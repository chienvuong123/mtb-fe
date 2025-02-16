import type { CustomerDTO, CustomerSearchRequest } from '@dtos';
import { customerApi } from '@apis';
import { useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const CUSTOMER_KEY = 'customer-list';

export const {
  useSearchQuery: useCustomerSearchQuery,
  useViewQuery: useCustomerViewQuery,
  useAddMutation: useCustomerAddMutation,
  useEditMutation: useCustomerEditMutation,
  useRemoveMutation: useCustomerRemoveMutation,
} = createBaseQueryHooks<CustomerDTO, CustomerSearchRequest>(
  CUSTOMER_KEY,
  customerApi,
);

export const useCustomerDownloadTemplete = () => {
  return useQuery({
    queryKey: [CUSTOMER_KEY, 'template'],
    queryFn: () => customerApi.downloadTemplate(),
    enabled: false,
  });
};

export const useCustomerExport = (params: CustomerSearchRequest) => {
  return useQuery({
    queryKey: [CUSTOMER_KEY, 'export'],
    queryFn: () => customerApi.export(params),
    enabled: false,
  });
};
