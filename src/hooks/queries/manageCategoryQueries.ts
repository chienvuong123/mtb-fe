import { manageCategoryApi } from '@apis';
import type {
  ManageCategorySearchRequest,
  ManageCategorySearchResponse,
  ManagerCategoryDTO,
} from 'src/dtos/manage-category';
import type { BaseResponse, BaseSearchResponse, TId } from '@dtos';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type {
  CategoryScriptDTO,
  CategoryScriptRequest,
  TCategoryDetailDTO,
} from 'src/dtos/manage-category-detail';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useManageCategorySearchQuery,
  useViewQuery: useManageCategoryViewQuery,
  useAddMutation: useManageCategoryAddMutation,
  useEditMutation: useManageCategoryEditMutation,
  useRemoveMutation: useManagerCategoryRemoveMutation,
} = createBaseQueryHooks<
  ManagerCategoryDTO,
  ManageCategorySearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  ManageCategorySearchResponse
>('campaign', manageCategoryApi);

// define other queries
export const useCategoryScriptQuery = (
  data: CategoryScriptRequest,
  options?: UseQueryOptions<
    BaseResponse<BaseSearchResponse<CategoryScriptDTO>>,
    Error
  >,
) => {
  return useQuery({
    queryKey: ['campaign-script', data],
    queryFn: () => manageCategoryApi.manageCategoryScript(data),
    ...options,
  });
};

export const useCategoryDetailViewQuery = (
  data: TId,
  options?: Partial<UseQueryOptions<BaseResponse<TCategoryDetailDTO>, Error>>,
) => {
  return useQuery({
    queryFn: () => manageCategoryApi.manageCategoryDetail(data),
    queryKey: ['campaign-detail', data],
    ...options,
  });
};
