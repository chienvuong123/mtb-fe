import type { BaseResponse, BaseSearchResponse, TId } from '@dtos';
import type {
  ManageCategorySearchRequest,
  ManagerCategoryDTO,
} from 'src/dtos/manage-category';
import type {
  CategoryScriptDTO,
  CategoryScriptRequest,
  TCategoryDetailDTO,
} from 'src/dtos/manage-category-detail';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class ManageCategory extends BaseApi<
  ManagerCategoryDTO,
  ManageCategorySearchRequest
> {
  constructor() {
    super('/manage-category/v1.0');
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
}

export const manageCategoryApi = new ManageCategory();
