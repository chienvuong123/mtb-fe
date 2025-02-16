import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export interface CustomerGroupDTO extends BaseEntity {
  code: string;
  name: string;
}

export interface CustomerGroupSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerGroupSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerGroupDTO>
>;
export type CustomerGroupViewResponse = BaseResponse<CustomerGroupDTO>;
