import type {
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest,
  BaseResponse,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class SalesOpportunities extends BaseApi<
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest
> {
  constructor() {
    super('/sales-opportunity/v1.0');
  }

  forwardBookingInfor(id: string) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/info-approach`,
      method: 'POST',
      data: { id },
    });
  }
}

export const salesOpportunitiesApi = new SalesOpportunities();
