import type { CategoryType } from '../category';
import type { BaseEntity, PageableObject } from '../common';

export interface MediaCategoryDTO extends Partial<BaseEntity> {
  code?: string;
  name?: string;
  status?: string;
  categoryTypeCode?: CategoryType;
}

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
