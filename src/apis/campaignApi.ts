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
import type { AxiosRequestConfig } from 'axios';
import { apiRequest, apiRequestFile } from './apiClient';
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

  async downloadTemplate() {
    return apiRequest({
      url: `${this.endpoint}/download-template`,
      method: 'GET',
      responseType: 'blob',
    });
  }

  async export(params: CampaignSearchRequest) {
    return apiRequest({
      url: `${this.endpoint}/export`,
      method: 'GET',
      params,
      responseType: 'blob',
    });
  }

  async import(file: File, config?: AxiosRequestConfig) {
    const formData = new FormData();
    formData.append('file', file);
    return apiRequestFile<BaseResponse<string>>({
      url: `${this.endpoint}/import`,
      method: 'POST',
      data: formData,
      ...config,
    });
  }
}

export const campaignApi = new CampaignApi();
