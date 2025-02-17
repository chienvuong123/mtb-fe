import type { CategoryType } from '../category';
import type { PageableObject } from '../common';

export type MediaCategoryDTO = {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  code: string;
  name: string;
  status: string;
  categoryTypeCode?: CategoryType;
};

export type MediaCategorySearch = {
  categoryTypeCode: CategoryType;
  reqNo?: string;
  code?: string;
  name?: string;
  pageNumber: number;
  pageSize: number;
  pageable?: PageableObject;
};

export type CMResponseMediaCategoryDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: MediaCategoryDTO[];
};

export type TMediaSearchForm = {
  code: string;
  name: string;
  status: string;
};
