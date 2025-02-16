import { EControlType } from '@constants/masterData';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export interface ControlDTO extends BaseEntity {
  code: string;
  name: string;
  controlType: EControlType;
}

export interface ControlSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type ControlSearchResponse = BaseResponse<
  BaseSearchResponse<ControlDTO>
>;
export type ControlViewResponse = BaseResponse<ControlDTO>;
