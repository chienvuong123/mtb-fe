import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const POSITION_CATEGORY_KEY = 'media-category';

export const {
  useSearchQuery: usePositionCategorySearchQuery,
  useViewQuery: usePositionCategoryViewQuery,
  useAddMutation: usePositionCategoryAddMutation,
  useEditMutation: usePositionCategoryEditMutation,
  useRemoveMutation: usePositionCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse
>(POSITION_CATEGORY_KEY, categoryApi);
