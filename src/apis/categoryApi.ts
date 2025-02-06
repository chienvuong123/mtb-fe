import type {
  CategoryDTO,
  CategorySearchRequest,
  CategoryInsertRequest,
} from '@dtos';
import { BaseApi } from './baseApi';

class CategoryApi extends BaseApi<
  CategoryDTO,
  CategoryInsertRequest,
  CategorySearchRequest
> {
  constructor() {
    super('/category/v1.0');
  }
}

export const categoryApi = new CategoryApi();
