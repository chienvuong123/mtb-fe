import {
  assetApi,
  campaignApi,
  categoryApi,
  groupCustomerApi,
  locationApi,
  sellerApi,
} from '@apis';
import { CategoryType } from '@dtos';
import { useQuery } from '@tanstack/react-query';
import { transformToF88Options, transformToOptions } from '@utils/objectHelper';
import type { CampaignListRequest } from 'src/dtos/campaign-detail';

export const useCategoryOptionsListQuery = (
  categoryTypeCode: CategoryType,
  combine?: boolean,
) => {
  return useQuery({
    queryKey: ['categoryList', categoryTypeCode],
    queryFn: () => categoryApi.getCategoryOptionsList(categoryTypeCode),
    select: ({ data }) => transformToOptions(data, combine),
    enabled: !!categoryTypeCode,
  });
};

export const useF88OptionsListQuery = (categoryTypeCode: CategoryType) => {
  return useQuery({
    queryKey: ['categoryList', categoryTypeCode],
    queryFn: () => categoryApi.getCategoryOptionsList(categoryTypeCode),
    select: ({ data }) => transformToF88Options(data),
    enabled: !!categoryTypeCode,
  });
};

export const useAssetCategoryOptionsListQuery = () => {
  return useQuery({
    queryKey: ['assetCategoryList'],
    queryFn: () => assetApi.getCategoryOptionsList(),
    select: (data) => transformToF88Options(data.data),
  });
};

export const useAssetCompanyOptionsListQuery = ({
  assetCategoryCode,
}: {
  assetCategoryCode: string;
}) => {
  return useQuery({
    queryKey: ['assetCompanyList', assetCategoryCode],
    queryFn: () =>
      assetApi.getCompanyOptionsList({ categoryCode: assetCategoryCode }),
    select: (data) => transformToF88Options(data.data),
    enabled: !!assetCategoryCode,
  });
};

export const useAssetModelOptionsListQuery = ({
  assetCompanyCode,
  assetCategoryCode,
}: {
  assetCompanyCode: string;
  assetCategoryCode: string;
}) => {
  return useQuery({
    queryKey: ['assetModelList', assetCompanyCode, assetCategoryCode],
    queryFn: () =>
      assetApi.getModelOptionsList({
        companyAssetCode: assetCompanyCode,
        categoryAssetCode: assetCategoryCode,
      }),
    select: (data) => transformToF88Options(data.data),
    enabled: !!assetCompanyCode && !!assetCategoryCode,
  });
};

export const useAssetYearOptionsListQuery = ({
  assetCompanyCode,
  assetCategoryCode,
  assetModelCode,
}: {
  assetCompanyCode: string;
  assetCategoryCode: string;
  assetModelCode: string;
}) => {
  return useQuery({
    queryKey: [
      'assetYearList',
      assetCompanyCode,
      assetCategoryCode,
      assetModelCode,
    ],
    queryFn: () =>
      assetApi.getYearOptionsList({
        companyAssetCode: assetCompanyCode,
        categoryAssetCode: assetCategoryCode,
        modelAssetCode: assetModelCode,
      }),
    select: (data) => transformToF88Options(data.data),
    enabled: !!assetCompanyCode && !!assetCategoryCode && !!assetModelCode,
  });
};

export const useAssetNameOptionsListQuery = ({
  assetCompanyCode,
  assetCategoryCode,
  assetModelCode,
  assetYear,
}: {
  assetCompanyCode: string;
  assetCategoryCode: string;
  assetModelCode: string;
  assetYear: string;
}) => {
  return useQuery({
    queryKey: [
      'assetNameList',
      assetCompanyCode,
      assetCategoryCode,
      assetModelCode,
      assetYear,
    ],
    queryFn: () =>
      assetApi.getNameOptionsList({
        companyAssetCode: assetCompanyCode,
        categoryAssetCode: assetCategoryCode,
        modelAssetCode: assetModelCode,
        yearCode: assetYear,
      }),
    select: (data) => transformToF88Options(data.data),
    enabled:
      !!assetCompanyCode &&
      !!assetCategoryCode &&
      !!assetModelCode &&
      !!assetYear,
  });
};

export const useQueryCategoryList = (combine?: boolean) => {
  return useQuery({
    queryKey: ['category', 'list'],
    queryFn: () => categoryApi.categoryListOptions(),
    select: ({ data }) => transformToOptions(data.content, combine),
  });
};

export const useQueryCampaignList = (
  params?: CampaignListRequest,
  combine?: boolean,
) => {
  return useQuery({
    queryKey: ['campaign', 'list', params],
    queryFn: () => campaignApi.campaignListOptions(params),
    select: ({ data }) => transformToOptions(data.content, combine),
    enabled: !!params?.categoryCode || !!params?.categoryId,
  });
};

export const useLocationOptionsListQuery = (parentCode = '0') => {
  return useQuery({
    queryKey: ['locationList', parentCode],
    queryFn: () => locationApi.getLocationOptionsList({ parentCode }),
    select: (data) => transformToF88Options(data.data),
    enabled: !!parentCode,
  });
};

export const useSellerOptionsListQuery = (combine?: boolean) => {
  return useQuery({
    queryKey: ['sellerList'],
    queryFn: () => sellerApi.list(),
    select: (data) => transformToOptions(data.data ?? [], combine),
  });
};

export const useGroupCustomerOptionsListQuery = (
  campaignId: string,
  combine?: boolean,
) => {
  return useQuery({
    queryKey: ['customerGroupList', campaignId],
    queryFn: () => groupCustomerApi.list(campaignId),
    select: ({ data }) => transformToOptions(data, combine),
    enabled: !!campaignId,
  });
};
