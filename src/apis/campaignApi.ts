import type {
  BaseResponse,
  BaseSearchResponse,
  BaseOptionListDTO,
  TId,
} from '@dtos';
import type { CampaignDTO, CampaignSearchRequest } from 'src/dtos/campaign';
import type {
  CampaignScriptDTO,
  CampaignScriptRequest,
  TCampaignDetailDTO,
} from 'src/dtos/campaign-detail';
import { apiRequest } from './apiClient';
import { BaseApi } from './baseApi';

class CampaignApi extends BaseApi<CampaignDTO, CampaignSearchRequest> {
  constructor() {
    super('/campaign/v1.0');
  }

  async campaignScript(data: CampaignScriptRequest) {
    return apiRequest<BaseResponse<BaseSearchResponse<CampaignScriptDTO>>>({
      url: `${this.endpoint}/campaign-script`,
      method: 'GET',
      params: data,
    });
  }

  async campaignDetail(data: TId) {
    return apiRequest<BaseResponse<TCampaignDetailDTO>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params: data,
    });
  }

  async campaignListOptions() {
    return apiRequest<BaseResponse<BaseSearchResponse<BaseOptionListDTO>>>({
      url: `${this.endpoint}/list`,
      method: 'GET',
    });
  }
}

export const campaignApi = new CampaignApi();
