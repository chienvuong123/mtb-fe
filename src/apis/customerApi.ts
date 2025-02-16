import type { CustomerDTO, CustomerSearchRequest } from '@dtos';
import { paramsSerializer } from '@utils/paramsHelper';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class CustomerApi extends BaseApi<CustomerDTO, CustomerSearchRequest> {
  constructor() {
    super('/customer/v1.0');
  }

  async downloadTemplate() {
    return apiRequest({
      url: `${this.endpoint}/download-template`,
      method: 'GET',
      responseType: 'blob',
    });
  }

  async export(params: CustomerSearchRequest) {
    return apiRequest({
      url: `${this.endpoint}/export`,
      method: 'GET',
      params,
      paramsSerializer,
      responseType: 'blob',
    });
  }
}

export const customerApi = new CustomerApi();
