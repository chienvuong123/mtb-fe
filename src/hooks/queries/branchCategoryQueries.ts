import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const BRANCH_CATEGORY_KEY = 'branch-category';

export const {
  useSearchQuery: useBranchCategorySearchQuery,
  useViewQuery: useBranchCategoryViewQuery,
  useAddMutation: useBranchCategoryAddMutation,
  useEditMutation: useBranchCategoryEditMutation,
  useRemoveMutation: useBranchCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse
>(BRANCH_CATEGORY_KEY, categoryApi);
