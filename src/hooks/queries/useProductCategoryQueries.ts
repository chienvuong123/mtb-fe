import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
  CategoryInsertRequest,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useProductCategorySearchQuery,
  useViewQuery: useProductCategoryViewQuery,
  useAddMutation: useProductCategoryAddMutation,
  useEditMutation: useProductCategoryEditMutation,
  useRemoveMutation: useProductCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategoryInsertRequest,
  CategorySearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CategorySearchResponse
>('product-category', categoryApi);

// define other queries
