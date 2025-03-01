import { campaignApi } from '@apis';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  CampaignSearchResponse,
} from 'src/dtos/campaign';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type {
  CampaignScriptDTO,
  CampaignScriptRequest,
  TCampaignDetailDTO,
} from 'src/dtos/campaign-detail';
import type { BaseResponse, BaseSearchResponse, TId } from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCampaignDetailSearchQuery,
  useRemoveMutation: useCampaignDetailRemoveMutation,
  useEditMutation: useCampaignDetailEditMutation,
  useAddMutation: useCampaignDetailAddMutation,
} = createBaseQueryHooks<
  CampaignDTO,
  CampaignSearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CampaignSearchResponse
>('campaign-detail', campaignApi);

// define other queries
export const useCampaignScriptQuery = (
  data: CampaignScriptRequest,
  options?: UseQueryOptions<
    BaseResponse<BaseSearchResponse<CampaignScriptDTO>>,
    Error
  >,
) => {
  return useQuery({
    queryKey: ['campaign-script', data],
    queryFn: () => campaignApi.campaignScript(data),
    ...options,
    enabled: !!data.id,
  });
};

export const useCampaignDetailViewQuery = (
  data: TId,
  options?: Partial<UseQueryOptions<BaseResponse<TCampaignDetailDTO>, Error>>,
) => {
  return useQuery({
    queryFn: () => campaignApi.campaignDetail(data),
    queryKey: ['campaign-detail', data],
    ...options,
  });
};
