import { campaignApi } from '@apis';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  CampaignSearchResponse,
} from 'src/dtos/campaign';
import { createBaseQueryHooks } from './baseQueries';

export const CAMPAIGN_KEY = 'campaign';

export const {
  useSearchQuery: useCampaignSearchQuery,
  useViewQuery: useCampaignViewQuery,
  useAddMutation: useCampaignAddMutation,
  useInfiniteSearchQuery: useCampaignSearchMasterDataQuery,
} = createBaseQueryHooks<
  CampaignDTO,
  CampaignSearchRequest,
  CampaignSearchResponse
>(CAMPAIGN_KEY, campaignApi);
