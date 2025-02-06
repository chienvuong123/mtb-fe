import type { PageableObject } from '../common';

export type ProductCategoryDTO = {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  code: string;
  name: string;
  status: string;
  categoryTypeCode?: string;
};

export type ProductCategorySearch = {
  categoryType: string;
  reqNo?: string;
  code?: string;
  name?: string;
  pageNumber: number;
  pageSize: number;
  pageable?: PageableObject;
};
export type ProductCategoryUpsertRequest = {
  reqNo: string;
  category: Pick<ProductCategoryDTO, 'name' | 'status'> &
    Partial<Omit<ProductCategoryDTO, 'name' | 'status'>>;
};

export type CMResponseProductCategoryDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: ProductCategoryDTO[];
};

export type CMResponseCategoryDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: {
    content: ProductCategoryDTO[];
    page: number;
    size: number;
  };
};

export type TProductSearchForm = { code: string; name: string };
