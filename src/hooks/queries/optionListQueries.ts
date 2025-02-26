import {
  assetApi,
  campaignApi,
  categoryApi,
  groupCustomerApi,
  locationApi,
} from '@apis';
import { CategoryType } from '@dtos';
import { useQuery } from '@tanstack/react-query';
import {
  transformToCodeNameOptions,
  transformToOptions,
  type TConvertFieldObj,
} from '@utils/objectHelper';
import type { CampaignListRequest } from 'src/dtos/campaign-detail';

export const useCategoryOptionsListQuery = (categoryTypeCode: CategoryType) => {
  return useQuery({
    queryKey: ['categoryList', categoryTypeCode],
    queryFn: () => categoryApi.getCategoryOptionsList(categoryTypeCode),
    select: (data) => transformToOptions(data.data),
    enabled: !!categoryTypeCode,
  });
};

export const useAssetCategoryOptionsListQuery = () => {
  return useQuery({
    queryKey: ['assetCategoryList'],
    queryFn: () => assetApi.getCategoryOptionsList(),
    select: (data) => transformToOptions(data.data),
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
    select: (data) => transformToOptions(data.data),
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
    select: (data) => transformToOptions(data.data),
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
    select: (data) => transformToOptions(data.data),
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
    select: (data) => transformToOptions(data.data),
    enabled:
      !!assetCompanyCode &&
      !!assetCategoryCode &&
      !!assetModelCode &&
      !!assetYear,
  });
};

export const useQueryCategoryList = (
  getByCode?: boolean,
  customFields?: TConvertFieldObj,
) => {
  return useQuery({
    queryKey: ['category', 'list'],
    queryFn: () => categoryApi.categoryListOptions(),
    select: ({ data }) => {
      if (customFields) {
        const { customOptions } = transformToCodeNameOptions(
          data?.content ?? [],
          customFields,
        );
        return customOptions;
      }

      const { byCode: categoryListByCode, byName: categoryListByName } =
        transformToCodeNameOptions(data?.content ?? []);
      return getByCode ? categoryListByCode : categoryListByName;
    },
  });
};

export const useQueryCampaignList = (
  params?: CampaignListRequest,
  getById?: boolean,
  customFields?: TConvertFieldObj,
) => {
  return useQuery({
    queryKey: ['campaign', 'list', params],
    queryFn: () => campaignApi.campaignListOptions(params),
    select: ({ data }) => {
      if (customFields) {
        const { customOptions } = transformToCodeNameOptions(
          data?.content ?? [],
          customFields,
        );
        return customOptions;
      }

      const { byId: campaignListById, byName: campaignListByName } =
        transformToCodeNameOptions(data?.content ?? []);
      return getById ? campaignListById : campaignListByName;
    },
  });
};

export const useLocationOptionsListQuery = (parentCode = '0') => {
  return useQuery({
    queryKey: ['locationList', parentCode],
    queryFn: () => locationApi.getLocationOptionsList({ parentCode }),
    select: (data) => transformToOptions(data.data),
    enabled: !!parentCode,
  });
};

export const useDepartmentOptionsListQuery = (parentCode = '0') => {
  return useQuery({
    queryKey: ['departmentList', parentCode],
    queryFn: () =>
      categoryApi.search({ categoryTypeCode: CategoryType.DEPARTMENT }),
    select: (data) => transformToOptions(data.data.content),
    enabled: !!parentCode,
  });
};

export const useBranchOptionsListQuery = (parentCode = '0') => {
  return useQuery({
    queryKey: ['branchList', parentCode],
    queryFn: () =>
      categoryApi.search({ categoryTypeCode: CategoryType.BRANCHES }),
    select: (data) => transformToOptions(data.data.content),
    enabled: !!parentCode,
  });
};

export const usePositionOptionsListQuery = (parentCode = '0') => {
  return useQuery({
    queryKey: ['positionList', parentCode],
    queryFn: () =>
      categoryApi.search({ categoryTypeCode: CategoryType.POSITION }),
    select: (data) => transformToOptions(data.data.content),
    enabled: !!parentCode,
  });
};

export const useGroupCustomerOptionsListQuery = (campaignId: string) => {
  return useQuery({
    queryKey: ['customerGroupList', campaignId],
    queryFn: () => groupCustomerApi.list(campaignId),
    select: ({ data }) => {
      const { byName: campaignListByName } = transformToCodeNameOptions(
        data ?? [],
      );
      return campaignListByName;
    },
    enabled: !!campaignId,
  });
};
