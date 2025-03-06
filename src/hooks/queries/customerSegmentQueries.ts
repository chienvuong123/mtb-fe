import { categoryApi } from '@apis';
import type {
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const CUSTOMER_SEGMENT_CATEGORY_KEY = 'customer-segment-category';

export const {
  useSearchQuery: useCustomerSegmentCategorySearchQuery,
  useViewQuery: useCustomerSegmentCategoryViewQuery,
  useAddMutation: useCustomerSegmentCategoryAddMutation,
  useEditMutation: useCustomerSegmentCategoryEditMutation,
  useRemoveMutation: useCustomerSegmentCategoryRemoveMutation,
} = createBaseQueryHooks<
  CategoryDTO,
  CategorySearchRequest,
  CategorySearchResponse
>(CUSTOMER_SEGMENT_CATEGORY_KEY, categoryApi);
