import { assetApi, categoryApi } from '@apis';
import type { CategoryType } from '@dtos';
import { useQuery } from '@tanstack/react-query';

export const useCategoryOptionsListQuery = (categoryTypeCode: CategoryType) => {
  return useQuery({
    queryKey: ['categoryList', categoryTypeCode],
    queryFn: () => categoryApi.getCategoryOptionsList(categoryTypeCode),
    select: (data) =>
      data.data.map((item) => ({
        label: item.name,
        value: item.code,
      })) ?? [],
  });
};

export const useAssetCategoryOptionsListQuery = () => {
  return useQuery({
    queryKey: ['assetCategoryList'],
    queryFn: () => assetApi.getCategoryOptionsList(),
    select: (data) => {
      return (
        data.data.map((item) => ({
          label: item.name,
          value: item.code,
        })) ?? []
      );
    },
  });
};

export const useAssetCompanyOptionsListQuery = ({
  categoryAssetCode,
}: {
  categoryAssetCode: string;
}) => {
  return useQuery({
    queryKey: ['assetCompanyList', categoryAssetCode],
    queryFn: () =>
      assetApi.getCompanyOptionsList({ categoryCode: categoryAssetCode }),
    select: (data) =>
      data.data.map((item) => ({
        label: item.name,
        value: item.code,
      })) ?? [],
  });
};

export const useAssetModelOptionsListQuery = ({
  companyAssetCode,
  categoryAssetCode,
}: {
  companyAssetCode: string;
  categoryAssetCode: string;
}) => {
  return useQuery({
    queryKey: ['assetModelList', companyAssetCode, categoryAssetCode],
    queryFn: () =>
      assetApi.getModelOptionsList({ companyAssetCode, categoryAssetCode }),
    select: (data) =>
      data.data.map((item) => ({
        label: item.name,
        value: item.code,
      })) ?? [],
  });
};

export const useAssetYearOptionsListQuery = ({
  companyAssetCode,
  categoryAssetCode,
  modelAssetCode,
}: {
  companyAssetCode: string;
  categoryAssetCode: string;
  modelAssetCode: string;
}) => {
  return useQuery({
    queryKey: [
      'assetYearList',
      companyAssetCode,
      categoryAssetCode,
      modelAssetCode,
    ],
    queryFn: () =>
      assetApi.getYearOptionsList({
        companyAssetCode,
        categoryAssetCode,
        modelAssetCode,
      }),
    select: (data) =>
      data.data.map((item) => ({
        label: item.name,
        value: item.code,
      })) ?? [],
  });
};

export const useAssetNameOptionsListQuery = ({
  companyAssetCode,
  categoryAssetCode,
  modelAssetCode,
  yearAssetCode,
}: {
  companyAssetCode: string;
  categoryAssetCode: string;
  modelAssetCode: string;
  yearAssetCode: string;
}) => {
  return useQuery({
    queryKey: [
      'assetNameList',
      companyAssetCode,
      categoryAssetCode,
      modelAssetCode,
      yearAssetCode,
    ],
    queryFn: () =>
      assetApi.getNameOptionsList({
        companyAssetCode,
        categoryAssetCode,
        modelAssetCode,
        yearCode: yearAssetCode,
      }),
    select: (data) =>
      data.data.map((item) => ({
        label: item.name,
        value: item.code,
      })) ?? [],
  });
};
