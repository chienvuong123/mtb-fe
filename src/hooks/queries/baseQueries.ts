import type { BaseApi } from '@apis';
import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from '@dtos';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

export const createBaseQueryHooks = <
  // dto type
  T,
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
      staleTime: 0,
      gcTime: 0,
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
      mutationKey: [baseKey],
      mutationFn: (data: Partial<T>) => api.add(data),
      onSuccess: (dataSuccess: BaseResponse<boolean>) => {
        if (dataSuccess.errorCode !== '0') return;
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
      mutationKey: [baseKey],
      mutationFn: (data: Partial<T>) => api.edit(data),
      onSuccess: (dataSuccess: BaseResponse<boolean>) => {
        if (dataSuccess.errorCode !== '0') return;
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
      mutationKey: [baseKey],
      mutationFn: (data: { id: string }) => api.remove(data.id),
      onSuccess: (dataSuccess: BaseResponse<boolean>) => {
        if (dataSuccess.errorCode !== '0') return;
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
