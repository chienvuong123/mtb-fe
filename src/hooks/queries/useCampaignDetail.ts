import { campaignApi } from '@apis';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  CampaignSearchResponse,
} from 'src/dtos/campaign';
import { useQuery, type UseMutationOptions } from '@tanstack/react-query';
import type {
  CampaignDetailRequest,
  CampaignDetailResponse,
  CampaignScriptRequest,
  CampaignScriptResponse,
} from 'src/dtos/campaign-detail';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCampaignDetailSearchQuery,
  useRemoveMutation: useCampaignDetailRemoveMutation,
  useEditMutation: useCampaignDetailEditMutation,
} = createBaseQueryHooks<
  CampaignDTO,
  CampaignSearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CampaignSearchResponse
>('campaign-detail', campaignApi);

// define other queries
export const useCampaignScriptMutation = (
  data: CampaignScriptRequest,
  options?: Partial<
    UseMutationOptions<CampaignScriptResponse, Error, CampaignScriptRequest>
  >,
) => {
  return useQuery({
    queryFn: () => campaignApi.campaignScript(data),
    queryKey: ['campaign-script'],
    ...options,
  });
};

export const useCampaignDetailViewQuery = (
  data: CampaignDetailRequest,
  options?: Partial<
    UseMutationOptions<CampaignDetailResponse, Error, CampaignDetailRequest>
  >,
) => {
  return useQuery({
    queryFn: () => campaignApi.campaignDetail(data),
    queryKey: ['campaign-detail'],
    ...options,
  });
};
