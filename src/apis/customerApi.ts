import type { CustomerDTO, CustomerSearchRequest } from '@dtos';
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
    });
  }
}

export const customerApi = new CustomerApi();
