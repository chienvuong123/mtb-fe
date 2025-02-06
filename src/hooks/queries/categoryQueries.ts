import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategoryInsertRequest,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useCategorySearchQuery,
  useViewQuery: useCategoryViewQuery,
  useAddMutation: useCategoryAddMutation,
  useEditMutation: useCategoryEditMutation,
  useRemoveMutation: useCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategoryInsertRequest,
  CategorySearchRequest
>('categories', categoryApi);
