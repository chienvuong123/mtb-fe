export type SortObject = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

export type PageableObject = {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort?: SortObject;
  unpaged?: boolean;
};

export type PageParams = {
  current: number;
  pageSize: number;
};

export type SortParams = {
  field: string;
  direction: string;
};

// Base interfaces
export interface BaseEntity {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  status?: string;
}

export interface BaseResponse<T> {
  errorCode: string;
  errorDesc: string;
  reqNo: string;
  data: T;
}

export interface BaseSearchResponse<T> {
  content: T[];
  page: number;
  size: number;
  total: number;
}

// DOCS UPDATE 06-02-2025 16:00

export type PageDTO = {
  pageSize: number;
  pageNum: number;
};

export type OrderDTO = {
  field: string;
  direction: string;
};

export interface BaseSearchParams {
  page?: PageDTO;
  order?: OrderDTO;
}

export interface BaseOptionListDTO {
  code: string;
  name: string;
  id?: string;
  active?: boolean;
}

export type TId = { id: string };

export type BaseAntdOptionType = {
  label: string;
  value: string | number;
  code?: string;
};
