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
  categoryTypeId?: string;
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

export type CategoryInsertDTO = Partial<ProductCategoryDTO> & {};

export type CategoryInsertRequest = {
  category: CategoryInsertDTO;
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
