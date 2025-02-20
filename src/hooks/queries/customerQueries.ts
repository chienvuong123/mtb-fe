import type { BaseResponse, CustomerDTO, CustomerSearchRequest } from '@dtos';
import { customerApi } from '@apis';
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';
import type { CustomerCollectInfoDTO } from 'src/dtos/customer-collect-info';
import { createBaseQueryHooks } from './baseQueries';

export const CUSTOMER_KEY = 'customer-list';

export type TCustomerImport = {
  file: File;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: GenericAbortSignal;
};

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

export const useCustomerImportMutation = (
  options?: Partial<
    UseMutationOptions<BaseResponse<string>, Error, TCustomerImport>
  >,
) => {
  return useMutation({
    mutationKey: [CUSTOMER_KEY, 'import'],
    mutationFn: ({ file, onUploadProgress, signal }: TCustomerImport) =>
      customerApi.import(file, {
        onUploadProgress,
        signal,
      }),
    ...options,
  });
};

export const useCustomerCheckLoanLimit = () => {
  return useMutation({
    mutationKey: [CUSTOMER_KEY, 'check-loan-limit'],
    mutationFn: (data: CustomerCollectInfoDTO) =>
      customerApi.checkLoanLimit(data),
  });
};
