import type { BaseResponse, CustomerDTO, CustomerSearchRequest } from '@dtos';
import type { AxiosRequestConfig } from 'axios';
import { BaseApi } from './baseApi';
import { apiRequest, apiRequestFile } from './apiClient';

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

export const customerApi = new CustomerApi();
