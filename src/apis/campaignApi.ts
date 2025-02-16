import type { CampaignDTO, CampaignSearchRequest } from 'src/dtos/campaign';
import { BaseApi } from './baseApi';

class CampaignApi extends BaseApi<CampaignDTO, CampaignSearchRequest> {
  constructor() {
    super('/campaign/v1.0');
  }
}

export const campaignApi = new CampaignApi();
