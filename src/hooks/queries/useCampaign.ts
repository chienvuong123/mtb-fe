import { campaignApi } from '@apis';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  CampaignSearchResponse,
} from 'src/dtos/campaign';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCampaignSearchQuery,
  useViewQuery: useCampaignViewQuery,
  useAddMutation: useCampaignAddMutation,
  useEditMutation: useCampaignEditMutation,
  useRemoveMutation: useCampaignRemoveMutation,
} = createBaseQueryHooks<
  CampaignDTO,
  CampaignSearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CampaignSearchResponse
>('campaign', campaignApi);

// define other queries
