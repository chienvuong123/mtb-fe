import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from '@dtos';
import { flattenObject } from '@utils/objectHelper';
import { apiRequest } from './apiClient';

export class BaseApi<
  T,
  Payload extends object,
  SearchParams extends BaseSearchParams,
> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async search(params: SearchParams) {
    return apiRequest<BaseResponse<BaseSearchResponse<T>>>({
      url: `${this.endpoint}/search`,
      method: 'GET',
      params: {
        ...flattenObject(params),
        page: undefined,
        order: undefined,
      } as SearchParams,
    });
  }

  async view(id: string) {
    return apiRequest<BaseResponse<T>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params: { id },
    });
  }

  async add(data: Partial<Payload>) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/add`,
      method: 'POST',
      data,
    });
  }

  async edit(data: Partial<Payload>) {
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
