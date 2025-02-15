import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const PRODUCT_CATEGORY_KEY = 'product-category';

export const {
  useSearchQuery: useProductCategorySearchQuery,
  useViewQuery: useProductCategoryViewQuery,
  useAddMutation: useProductCategoryAddMutation,
  useEditMutation: useProductCategoryEditMutation,
  useRemoveMutation: useProductCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CategorySearchResponse
>(PRODUCT_CATEGORY_KEY, categoryApi);

// define other queries
