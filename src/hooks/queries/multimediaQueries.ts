import type {
  BaseResponse,
  MultimediaDTO,
  MultimediaSearchRequest,
} from '@dtos';
import { multimediaApi } from '@apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const MULTIMEDIA_CATEGORY_KEY = 'multimedia';

export const {
  useSearchQuery: useMultimediaSearchQuery,
  useViewQuery: useMultimediaViewQuery,
  // useAddMutation: useMultimediaAddMutation,
  // useEditMutation: useMultimediaEditMutation,
  useRemoveMutation: useMultimediaRemoveMutation,
} = createBaseQueryHooks<
  MultimediaDTO,
  MultimediaSearchRequest,
  BaseResponse<MultimediaDTO>
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
>(MULTIMEDIA_CATEGORY_KEY, multimediaApi);

export const useMultimediaAddMutation = () => {
  return useMutation({
    mutationKey: [MULTIMEDIA_CATEGORY_KEY, 'add'],
    mutationFn: (data: MultimediaDTO) => multimediaApi.add(data),
  });
};

export const useMultimediaEditMutation = () => {
  return useMutation({
    mutationKey: [MULTIMEDIA_CATEGORY_KEY, 'edit'],
    mutationFn: (data: MultimediaDTO) => multimediaApi.edit(data),
  });
};

export const useMultimediaResourceQuery = (src: string) => {
  return useQuery({
    queryKey: [MULTIMEDIA_CATEGORY_KEY, 'resource', src],
    queryFn: () => multimediaApi.getResource(src),
    enabled: !!src,
    select: ({ data, filename }) => ({
      url: data ? URL.createObjectURL(data as unknown as Blob) : undefined,
      filename,
    }),
  });
};
