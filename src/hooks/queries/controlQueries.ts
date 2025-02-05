import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { controlApi } from '@apis';
import type {
  ControlSearchRequest,
  BaseResponse,
  ControlSearchResponse,
  ControlViewResponse,
  ControlAddRequest,
  ControlEditRequest,
} from '@dtos';

const rootKeys = {
  all: 'controls',
  list: 'list',
  detail: 'detail',
} as const;

const queryKeys = {
  list: [rootKeys.all, rootKeys.list],
  search: (params: ControlSearchRequest) =>
    [rootKeys.all, rootKeys.list, params] as const,
  detail: (id: number) => [rootKeys.all, rootKeys.detail, id] as const,
};

export const controlQueryKeys = queryKeys;

export function useControlsSearchQuery(
  params: ControlSearchRequest,
  options: Partial<
    UseQueryOptions<ControlSearchResponse, Error, ControlSearchResponse>
  > = {},
) {
  return useQuery({
    queryKey: queryKeys.search(params),
    queryFn: () => controlApi.search(params),
    ...options,
  });
}

export function useControlViewQuery(
  params: { id: number },
  options: Partial<
    UseQueryOptions<ControlViewResponse, Error, ControlViewResponse>
  > = {},
) {
  return useQuery({
    queryKey: queryKeys.detail(params.id),
    queryFn: () => controlApi.view(params.id),
    enabled: !!params.id,
    ...options,
  });
}

export function useAddControlMutation(
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, ControlAddRequest>
  >,
  onInvalidate?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ControlAddRequest) => controlApi.add(data),
    onSuccess: () => {
      onInvalidate?.();
      queryClient.invalidateQueries({
        queryKey: queryKeys.list,
      });
    },
    ...options,
  });
}

export function useEditControlMutation(
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, ControlEditRequest>
  >,
  onInvalidate?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ControlEditRequest) => controlApi.edit(data),
    onSuccess: () => {
      onInvalidate?.();
      queryClient.invalidateQueries({
        queryKey: queryKeys.list,
      });
    },
    ...options,
  });
}

export function useRemoveControlMutation(
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, { id: number }>
  >,
  onInvalidate?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number }) => controlApi.remove(data.id),
    onSuccess: () => {
      onInvalidate?.();
      queryClient.invalidateQueries({
        queryKey: queryKeys.list,
      });
    },
    ...options,
  });
}
