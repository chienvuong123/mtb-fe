import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const createCategoryQueryHooks = (categoryKey: string) => {
  return createBaseQueryHooks<
    CategoryDTO,
    CategorySearchRequest,
    CategoryDTO,
    CategorySearchResponse
  >(categoryKey, categoryApi);
};
