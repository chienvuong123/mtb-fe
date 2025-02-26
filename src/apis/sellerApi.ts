import type {
  BaseResponse,
  AssignmentSellerItemDTO,
  AssignmentSellerRequestDTO,
  SellerDTO,
  SellerSearchRequest,
  AssignmentSellerAssignItemDTO,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SellerApi
  extends Pick<BaseApi<SellerDTO, SellerSearchRequest>, 'search' | 'view'> {}

class SellerApiImpl
  extends BaseApi<SellerDTO, SellerSearchRequest>
  implements SellerApi
{
  constructor() {
    super('/seller/v1.0');
  }

  async assignCustomer(data: AssignmentSellerRequestDTO) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/assign-customer-to-seller`,
      method: 'POST',
      data,
    });
  }

  async addToCampaign(campaignId: string, data: string[]) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/add-seller-to-campaign`,
      method: 'POST',
      data,
      params: { campaignId },
    });
  }

  async getSellerBeforeAssign(campaignId: string, customerGroupId: string) {
    return apiRequest<BaseResponse<AssignmentSellerAssignItemDTO>>({
      url: `${this.endpoint}/get-seller-information-before-assign`,
      method: 'GET',
      params: { campaignId, customerGroupId },
    });
  }

  async getBlankSeller(keyword: string) {
    return apiRequest<BaseResponse<AssignmentSellerItemDTO[]>>({
      url: `${this.endpoint}/get-list-seller-not-be-assign-to-campaign`,
      method: 'GET',
      params: { keyword },
    });
  }
}

export const sellerApi = new SellerApiImpl();
