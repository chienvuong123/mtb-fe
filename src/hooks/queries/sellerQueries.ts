import { sellerApi } from '@apis';
import type {
  AssignmentSellerRequestDTO,
  BaseResponse,
  CategorySearchRequest,
  SellerDTO,
} from '@dtos';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const SELLER_KEY = 'seller';

export const {
  useSearchQuery: useSellerSearchQuery,
  useViewQuery: useSellerViewQuery,
} = createBaseQueryHooks<
  SellerDTO,
  CategorySearchRequest,
  BaseResponse<SellerDTO>
>(SELLER_KEY, sellerApi);

export const useSellerAssignCustomerMutation = () => {
  return useMutation({
    mutationKey: [SELLER_KEY, 'assign-customer'],
    mutationFn: (data: AssignmentSellerRequestDTO) =>
      sellerApi.assignCustomer(data),
  });
};

export const useSellerAddToCampaignMutation = () => {
  return useMutation({
    mutationKey: [SELLER_KEY, 'add-to-campaign'],
    mutationFn: ({
      campaignId,
      data,
    }: {
      campaignId: string;
      data: string[];
    }) => sellerApi.addToCampaign(campaignId, data),
  });
};

export const useSellerBlankQuery = (keyword: string, enabled: boolean) => {
  return useQuery({
    queryKey: [SELLER_KEY, 'blank', keyword, enabled],
    queryFn: () => sellerApi.getBlankSeller(keyword),
    enabled,
  });
};

export const useSellerBeforeAssignQuery = (
  campaignId?: string,
  customerGroupId?: string,
) => {
  return useQuery({
    queryKey: [SELLER_KEY, 'before-assign', campaignId, customerGroupId],
    queryFn: () =>
      sellerApi.getSellerBeforeAssign(
        campaignId as string,
        customerGroupId as string,
      ),
    enabled: !!campaignId,
  });
};
