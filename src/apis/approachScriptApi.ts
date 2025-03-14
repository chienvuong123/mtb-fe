import type {
  ApproachResultCreateRequest,
  ApproachScriptDTO,
  ApproachScriptSearchRequest,
  BaseOptionListDTO,
  BaseResponse,
  BaseSearchResponse,
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

  async approachScriptOptions(categoryId: string) {
    return apiRequest<BaseResponse<BaseSearchResponse<BaseOptionListDTO>>>({
      url: `${this.endpoint}/list`,
      method: 'GET',
      params: { page: { pageSize: 200 }, categoryId }, // TODO: will be fixed in milestone 2
    });
  }
}

export const approachScriptApi = new ApproachScriptApi();
