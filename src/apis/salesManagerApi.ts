import type {
  BaseOptionListDTO,
  BaseResponse,
  BaseSearchResponse,
} from '@dtos';
import type { AnyObject } from 'antd/es/_util/type';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class SalesManagerApi extends BaseApi<AnyObject, AnyObject> {
  constructor() {
    super('/sales-manager/v1.0');
  }

  list() {
    return apiRequest<BaseResponse<BaseSearchResponse<BaseOptionListDTO>>>({
      url: `${this.endpoint}/list`,
      method: 'GET',
    });
  }
}

export const salesManagerApi = new SalesManagerApi();
