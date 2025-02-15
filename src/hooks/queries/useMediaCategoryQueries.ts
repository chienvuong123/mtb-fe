import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const MEDIA_CATEGORY_KEY = 'media-category';

export const {
  useSearchQuery: useMediaCategorySearchQuery,
  useViewQuery: useMediaCategoryViewQuery,
  useAddMutation: useMediaCategoryAddMutation,
  useEditMutation: useMediaCategoryEditMutation,
  useRemoveMutation: useMediaCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse
>(MEDIA_CATEGORY_KEY, categoryApi);
