import type {
  BaseResponse,
  CustomerDTO,
  CustomerSearchRequest,
  CustomerCollectInfoDTO,
} from '@dtos';
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
      timeout: Infinity,
    });
  }

  async export(params: CustomerSearchRequest) {
    return apiRequest({
      url: `${this.endpoint}/export`,
      method: 'GET',
      params,
      responseType: 'blob',
      timeout: Infinity,
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

  async checkLoanLimit(data: CustomerCollectInfoDTO) {
    return apiRequest<BaseResponse<{ customerLimit: string }>>({
      url: `${this.endpoint}/customer-limit`,
      method: 'POST',
      data,
    });
  }

  async getDraftLoanLimit(customerId?: string) {
    return apiRequest<BaseResponse<CustomerCollectInfoDTO>>({
      url: `${this.endpoint}/detail-sales-opportunity-his`,
      method: 'GET',
      params: { customerId },
    });
  }
}

export const customerApi = new CustomerApi();
