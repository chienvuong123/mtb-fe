import type {
  BaseResponse,
  BaseSearchResponse,
  TId,
  CategoryScriptDTO,
  CategoryScriptRequest,
  TCategoryDetailDTO,
  ManageCategorySearchRequest,
  ManagerCategoryDTO,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class ManageCategory extends BaseApi<
  ManagerCategoryDTO,
  ManageCategorySearchRequest
> {
  constructor() {
    super('/category-campaign/v1.0');
  }

  async manageCategoryScript(data: CategoryScriptRequest) {
    return apiRequest<BaseResponse<BaseSearchResponse<CategoryScriptDTO>>>({
      url: `${this.endpoint}/campaign-script`,
      method: 'GET',
      params: data,
    });
  }

  async manageCategoryDetail(data: TId) {
    return apiRequest<BaseResponse<TCategoryDetailDTO>>({
      url: `${this.endpoint}/view`,
      method: 'GET',
      params: data,
    });
  }

  async export(params: ManageCategorySearchRequest) {
    return apiRequest({
      url: `${this.endpoint}/export`,
      method: 'GET',
      params,
      responseType: 'blob',
    });
  }
}

export const manageCategoryApi = new ManageCategory();
