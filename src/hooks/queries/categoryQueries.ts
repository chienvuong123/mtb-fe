import { categoryApi } from '@apis';
import type { CategoryDTO, CategorySearchRequest } from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCategorySearchQuery,
  useViewQuery: useCategoryViewQuery,
  useAddMutation: useCategoryAddMutation,
  useEditMutation: useCategoryEditMutation,
  useRemoveMutation: useCategoryRemoveMutation,
} = createBaseQueryHooks<CategoryDTO, CategorySearchRequest>(
  'categories',
  categoryApi,
);
