import type { BaseResponse } from '@dtos';
import type { CampaignDTO, CampaignSearchRequest } from 'src/dtos/campaign';
import type {
  CampaignDetailRequest,
  CampaignDetailResponse,
  CampaignScriptRequest,
  CampaignScriptResponse,
} from 'src/dtos/campaign-detail';
import { apiRequest } from './apiClient';
import { BaseApi } from './baseApi';

class CampaignApi extends BaseApi<CampaignDTO, CampaignSearchRequest> {
  constructor() {
    super('/campaign/v1.0');
  }

  async campaignScript(data: CampaignScriptRequest) {
    const response = await apiRequest<BaseResponse<CampaignScriptResponse>>({
      url: `${this.endpoint}/campaign-script`,
      method: 'GET',
      params: data,
    });

    return response.data;
  }

  async campaignDetail(data: CampaignDetailRequest) {
    return apiRequest<BaseResponse<CampaignDetailResponse>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params: data,
    });
  }
}

export const campaignApi = new CampaignApi();
