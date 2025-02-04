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
  BaseViewParams,
} from '@dtos';

const rootKeys = {
  all: 'controls',
  list: 'list',
  detail: 'detail',
} as const;

const queryKeys = {
  list: [rootKeys.all, rootKeys.list],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: ({ reqNo, ...params }: ControlSearchRequest) =>
    [rootKeys.all, rootKeys.list, params] as const,
  detail: ({ id }: BaseViewParams) =>
    [rootKeys.all, rootKeys.detail, id] as const,
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
  params: BaseViewParams,
  options: Partial<
    UseQueryOptions<ControlViewResponse, Error, ControlViewResponse>
  > = {},
) {
  return useQuery({
    queryKey: queryKeys.detail(params),
    queryFn: () => controlApi.view(params),
    enabled: !!params.id,
    ...options,
  });
}

export function useAddControlMutation(
  options?: Partial<
    UseMutationOptions<ControlViewResponse, Error, ControlAddRequest>
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
    UseMutationOptions<ControlViewResponse, Error, ControlEditRequest>
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
    UseMutationOptions<
      BaseResponse<boolean>,
      Error,
      { reqNo: string; id: number }
    >
  >,
  onInvalidate?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { reqNo: string; id: number }) =>
      controlApi.remove(data),
    onSuccess: () => {
      onInvalidate?.();
      queryClient.invalidateQueries({
        queryKey: queryKeys.list,
      });
    },
    ...options,
  });
}
