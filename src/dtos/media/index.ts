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
  categoryTypeId?: string;
};

export type MediaCategorySearch = {
  categoryType: string;
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
