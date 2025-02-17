import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from '@dtos';
import { apiRequest } from './apiClient';

export class BaseApi<T, SearchParams extends BaseSearchParams> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async search(params: SearchParams) {
    return apiRequest<BaseResponse<BaseSearchResponse<T>>>({
      url: `${this.endpoint}/search`,
      method: 'GET',
      params,
    });
  }

  async searchMasterData(params: SearchParams) {
    return apiRequest<BaseResponse<BaseSearchResponse<T>>>({
      url: `${this.endpoint}/list`,
      method: 'GET',
      params,
    });
  }

  async view(id: string) {
    return apiRequest<BaseResponse<T>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params: { id },
    });
  }

  async add(data: Partial<T>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/add`,
      method: 'POST',
      data,
    });
  }

  async edit(data: Partial<T>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/edit`,
      method: 'POST',
      data,
    });
  }

  async remove(id: string) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/remove`,
      method: 'POST',
      data: { id },
    });
  }
}
