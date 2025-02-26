import type {
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
} from 'src/dtos/group-customer';
import type { BaseOptionListDTO, BaseResponse } from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

export const GROUP_CUSTOMER_KEY = '/customer-group/v1.0';
class GroupCustomerApi extends BaseApi<
  GroupCustomerDTO,
  GroupCustomerSearchRequest
> {
  constructor() {
    super(GROUP_CUSTOMER_KEY);
  }

  async list(campaignId: string) {
    return apiRequest<BaseResponse<BaseOptionListDTO[]>>({
      url: `${this.endpoint}/list`,
      method: 'GET',
      params: { campaignId },
    });
  }
}

export const groupCustomerApi = new GroupCustomerApi();
