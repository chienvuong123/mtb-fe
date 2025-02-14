import type { CustomerDTO, CustomerSearchRequest } from '@dtos';
import { BaseApi } from './baseApi';

class CustomerApi extends BaseApi<CustomerDTO, CustomerSearchRequest> {
  constructor() {
    super('/customer/v1.0');
  }
}

export const customerApi = new CustomerApi();
