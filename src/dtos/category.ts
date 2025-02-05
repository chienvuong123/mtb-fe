import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export enum CategoryType {
  PRODUCT = '2',
  SERVICE = 'SERVICE',
}

export interface CategoryDTO extends BaseEntity {
  code: string;
  name: string;
  categoryType: CategoryType;
}

export interface CategorySearchRequest extends BaseSearchParams {
  categoryType?: string;
  code?: string;
  name?: string;
}

export type CategorySearchResponse = BaseResponse<
  BaseSearchResponse<CategoryDTO>
>;

export type CategoryViewResponse = BaseResponse<CategoryDTO>;
