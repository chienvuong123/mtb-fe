import type { CategoryDTO, CategorySearchRequest } from '@dtos';
import { BaseApi } from './baseApi';

class CategoryApi extends BaseApi<CategoryDTO, CategorySearchRequest> {
  constructor() {
    super('/category/v1.0');
  }
}

export const categoryApi = new CategoryApi();
