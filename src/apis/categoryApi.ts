import type {
  BaseResponse,
  CategoryDTO,
  CategorySearchRequest,
  CategoryType,
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
}

export const categoryApi = new CategoryApi();
