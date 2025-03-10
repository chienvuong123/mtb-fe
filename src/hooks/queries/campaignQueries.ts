import { campaignApi } from '@apis';
import type {
  CampaignDTO,
  CampaignScriptDTO,
  CampaignScriptRequest,
  CampaignSearchRequest,
  CampaignSearchResponse,
  TCampaignDetailDTO,
} from 'src/dtos/campaign';
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { BaseResponse, BaseSearchResponse, TId } from '@dtos';
import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';
import { createBaseQueryHooks } from './baseQueries';

export const CAMPAIGN_KEY = 'campaign-list';

export const {
  useSearchQuery: useCampaignSearchQuery,
  useViewQuery: useCampaignViewQuery,
  useAddMutation: useCampaignAddMutation,
  useEditMutation: useCampaignEditMutation,
  useRemoveMutation: useCampaignRemoveMutation,
} = createBaseQueryHooks<
  CampaignDTO,
  CampaignSearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  CampaignSearchResponse
>(CAMPAIGN_KEY, campaignApi);

// define other queries
export type TCampaignImport = {
  file: File;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: GenericAbortSignal;
};

export const useCampaignDownloadTemplete = () => {
  return useQuery({
    queryKey: [CAMPAIGN_KEY, 'template'],
    queryFn: () => campaignApi.downloadTemplate(),
    enabled: false,
  });
};

export const useCampaignImportMutation = (
  options?: Partial<
    UseMutationOptions<BaseResponse<string>, Error, TCampaignImport>
  >,
) => {
  return useMutation({
    mutationKey: [CAMPAIGN_KEY, 'import'],
    mutationFn: ({ file, onUploadProgress, signal }: TCampaignImport) =>
      campaignApi.import(file, {
        onUploadProgress,
        signal,
      }),
    ...options,
  });
};

export const useCampaignExport = (params: CampaignSearchRequest) => {
  return useQuery({
    queryKey: [CAMPAIGN_KEY, 'export'],
    queryFn: () => campaignApi.export(params),
    enabled: false,
  });
};

export const useCampaignScriptQuery = (
  data: CampaignScriptRequest,
  options?: UseQueryOptions<
    BaseResponse<BaseSearchResponse<CampaignScriptDTO>>,
    Error
  >,
) => {
  return useQuery({
    queryKey: ['campaign-script', data],
    queryFn: () => campaignApi.campaignScript(data),
    ...options,
    enabled: !!data.id,
  });
};

export const useCampaignDetailViewQuery = (
  data: TId,
  options?: Partial<UseQueryOptions<BaseResponse<TCampaignDetailDTO>, Error>>,
) => {
  return useQuery({
    queryFn: () => campaignApi.campaignDetail(data),
    queryKey: ['campaign-detail', data],
    ...options,
  });
};
