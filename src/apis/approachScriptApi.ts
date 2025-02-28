import type {
  ApproachResultCreateRequest,
  ApproachScriptDTO,
  ApproachScriptSearchRequest,
  BaseResponse,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class ApproachScriptApi extends BaseApi<
  ApproachScriptDTO,
  ApproachScriptSearchRequest
> {
  constructor() {
    super('/approach-script/v1.0');
  }

  async viewByCustomer(customerId?: string) {
    return apiRequest<BaseResponse<ApproachScriptDTO[]>>({
      url: `${this.endpoint}/view-by-customer`,
      method: 'GET',
      params: { customerId },
    });
  }

  async createApproachResult(params: ApproachResultCreateRequest[]) {
    return apiRequest<BaseResponse<boolean>>({
      url: `${this.endpoint}/save-resul-by-customer`,
      method: 'POST',
      data: params,
    });
  }
}

export const approachScriptApi = new ApproachScriptApi();
