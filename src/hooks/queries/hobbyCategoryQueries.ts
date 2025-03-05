import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const HOBBY_CATEGORY_KEY = 'hobby-category';

export const {
  useSearchQuery: useHobbyCategorySearchQuery,
  useViewQuery: useHobbyCategoryViewQuery,
  useAddMutation: useHobbyCategoryAddMutation,
  useEditMutation: useHobbyCategoryEditMutation,
  useRemoveMutation: useHobbyCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse
>(HOBBY_CATEGORY_KEY, categoryApi);
