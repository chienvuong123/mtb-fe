import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export interface CustomerSegmentDTO extends BaseEntity {
  code: string;
  name: string;
}

export interface CustomerSegmentAddRequest extends Partial<CustomerSegmentDTO> {
  reqNo: string;
}

export interface CustomerSegmentEditRequest
  extends Partial<CustomerSegmentDTO> {
  reqNo: string;
}

export interface CustomerSegmentSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerSegmentSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerSegmentDTO>
>;
export type CustomerSegmentViewResponse = BaseResponse<CustomerSegmentDTO>;
