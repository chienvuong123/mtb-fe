import type {
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
  BaseViewParams,
} from '@dtos';
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

  async view(params: BaseViewParams) {
    return apiRequest<BaseResponse<T>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params,
    });
  }

  async add(data: { reqNo?: string } & Partial<T>) {
    return apiRequest<BaseResponse<T>>({
      url: `${this.endpoint}/add`,
      method: 'POST',
      data,
    });
  }

  async edit(data: { reqNo?: string } & Partial<T>) {
    return apiRequest<BaseResponse<T>>({
      url: `${this.endpoint}/edit`,
      method: 'POST',
      data,
    });
  }

  async remove(data: { reqNo: string; id: number }) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/remove`,
      method: 'POST',
      data,
    });
  }
}
