import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from '@dtos';
import type { BaseApi } from '@apis';

export const createBaseQueryHooks = <
  // dto type
  T,
  // mutate insert type
  // search params type
  SearchParams extends BaseSearchParams,
  // view response after transform type
  ViewResponse = T,
  // search response after transform type
  SearchResponse extends BaseResponse<BaseSearchResponse<T>> = BaseResponse<
    BaseSearchResponse<T>
  >,
>(
  baseKey: string,
  api: BaseApi<T, SearchParams>,
) => {
  const queryKeys = {
    all: baseKey,
    list: [baseKey, 'list'] as const,
    search: (params: SearchParams) => [baseKey, 'list', params] as const,
    detail: (id: string) => [baseKey, 'detail', id] as const,
  };

  const useSearchQuery = (
    params: SearchParams,
    options: Partial<
      UseQueryOptions<
        BaseResponse<BaseSearchResponse<T>>,
        Error,
        SearchResponse
      >
    > = {},
  ) => {
    return useQuery({
      queryKey: queryKeys.search(params),
      queryFn: () => api.search(params),
      ...options,
    });
  };

  const useViewQuery = (
    params: { id: string },
    options: Partial<
      UseQueryOptions<BaseResponse<T>, Error, ViewResponse>
    > = {},
  ) => {
    return useQuery({
      queryKey: queryKeys.detail(params.id),
      queryFn: () => api.view(params.id),
      enabled: !!params.id,
      ...options,
    });
  };

  const useAddMutation = (
    options?: Partial<
      UseMutationOptions<BaseResponse<boolean>, Error, Partial<T>>
    >,
    onInvalidate?: (dataSuccess?: BaseResponse<boolean>) => void,
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: Partial<T>) => api.add(data),
      onSuccess: (dataSuccess: BaseResponse<boolean>) => {
        onInvalidate?.(dataSuccess);
        queryClient.invalidateQueries({
          queryKey: queryKeys.list,
        });
      },
      ...options,
    });
  };

  const useEditMutation = (
    options?: Partial<
      UseMutationOptions<BaseResponse<boolean>, Error, Partial<T>>
    >,
    onInvalidate?: (dataSuccess?: BaseResponse<boolean>) => void,
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: Partial<T>) => api.edit(data),
      onSuccess: (dataSuccess: BaseResponse<boolean>) => {
        onInvalidate?.(dataSuccess);
        queryClient.invalidateQueries({
          queryKey: queryKeys.list,
        });
      },
      ...options,
    });
  };

  const useRemoveMutation = (
    options?: Partial<
      UseMutationOptions<BaseResponse<boolean>, Error, { id: string }>
    >,
    onInvalidate?: () => void,
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: { id: string }) => api.remove(data.id),
      onSuccess: () => {
        onInvalidate?.();
        queryClient.invalidateQueries({
          queryKey: queryKeys.list,
        });
      },
      ...options,
    });
  };

  return {
    useSearchQuery,
    useViewQuery,
    useAddMutation,
    useEditMutation,
    useRemoveMutation,
  };
};
