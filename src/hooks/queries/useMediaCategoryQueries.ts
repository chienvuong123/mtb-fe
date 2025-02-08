import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

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
>('media-category', categoryApi);
