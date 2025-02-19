import type {
  BaseResponse,
  CategoryDTO,
  CategorySearchRequest,
  CategoryType,
  BaseSearchResponse,
  ListOptionDTO,
} from '@dtos';
import { BaseApi } from './baseApi';
import { apiRequest } from './apiClient';

class CategoryApi extends BaseApi<CategoryDTO, CategorySearchRequest> {
  constructor() {
    super('/category/v1.0');
  }

  async getCategoryOptionsList(categoryTypeCode: CategoryType) {
    return apiRequest<BaseResponse<CategoryDTO[]>>({
      url: `${this.endpoint}/category-by-type?categoryTypeCode=${categoryTypeCode}`,
      method: 'GET',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async categoryListOptions() {
    return apiRequest<BaseResponse<BaseSearchResponse<ListOptionDTO>>>({
      url: '/category-campaign/v1.0/list',
      method: 'GET',
    });
  }
}

export const categoryApi = new CategoryApi();
