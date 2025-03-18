import type {
  BaseResponse,
  CategoryDTO,
  CategorySearchRequest,
  CategoryType,
  BaseSearchResponse,
  BaseOptionListDTO,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class CategoryApi extends BaseApi<CategoryDTO, CategorySearchRequest> {
  constructor() {
    super('/category/v1.0');
  }

  async getCategoryOptionsList(
    categoryTypeCode: CategoryType,
    parentId?: string,
  ) {
    return apiRequest<BaseResponse<CategoryDTO[]>>({
      url: `${this.endpoint}/category-by-type`,
      params: { categoryTypeCode, parentId },
      method: 'GET',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async categoryListOptions() {
    return apiRequest<BaseResponse<BaseSearchResponse<BaseOptionListDTO>>>({
      url: '/category-campaign/v1.0/list',
      method: 'GET',
      params: { page: { pageSize: 200 } }, // TODO: will be fixed in milestone 2
    });
  }
}

export const categoryApi = new CategoryApi();
