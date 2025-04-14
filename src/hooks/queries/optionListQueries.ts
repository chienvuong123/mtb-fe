import { categoryApi } from '@apis';
import { CategoryType } from '@dtos';
import { useQuery } from '@tanstack/react-query';
import { transformToF88Options, transformToOptions } from '@utils/objectHelper';

export const useCategoryOptionsListQuery = (
  {
    categoryTypeCode,
    parentId,
  }: { categoryTypeCode: CategoryType; parentId?: string },
  combine?: boolean,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: ['categoryList', categoryTypeCode, parentId],
    queryFn: () =>
      categoryApi.getCategoryOptionsList(categoryTypeCode, parentId),
    select: ({ data }) => transformToOptions(data, combine),
    enabled,
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

export const useQueryCategoryList = (combine?: boolean) => {
  return useQuery({
    queryKey: ['category', 'list'],
    queryFn: () => categoryApi.categoryListOptions(),
    select: ({ data }) => transformToOptions(data.content, combine),
  });
};
