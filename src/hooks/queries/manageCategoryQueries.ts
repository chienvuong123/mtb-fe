import { manageCategoryApi } from '@apis';
import type {
  ManageCategorySearchRequest,
  ManageCategorySearchResponse,
  ManagerCategoryDTO,
} from 'src/dtos/manage-category';
import type { BaseResponse, TId } from '@dtos';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { TCategoryDetailDTO } from 'src/dtos/manage-category-detail';
import { createBaseQueryHooks } from './baseQueries';

export const MANAGE_CATEGORY = 'manager-category';

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
>(MANAGE_CATEGORY, manageCategoryApi);

// define other queries

export const useCategoryDetailViewQuery = (
  data: TId,
  options?: Partial<UseQueryOptions<BaseResponse<TCategoryDetailDTO>, Error>>,
) => {
  return useQuery({
    queryFn: () => manageCategoryApi.manageCategoryDetail(data),
    queryKey: [MANAGE_CATEGORY, 'detail', data],
    ...options,
  });
};

export const useCategoryExport = (params: ManageCategorySearchRequest) => {
  return useQuery({
    queryKey: [MANAGE_CATEGORY, 'export'],
    queryFn: () => manageCategoryApi.export(params),
    enabled: false,
  });
};
