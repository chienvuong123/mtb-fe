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

// Base interfaces
export interface BaseEntity {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  status: string;
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
}

export interface BaseSearchParams {
  reqNo: string;
  pageNumber: number;
  pageSize: number;
  pageable?: PageableObject;
}

export interface BaseViewParams {
  reqNo: string;
  id: number;
}
