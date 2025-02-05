import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export enum ControlType {
  EDITOR = 'EDITOR',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  IMAGE = 'IMAGE',
  DATETIME = 'DATETIME',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SWITCH = 'SWITCH',
  LINK = 'LINK',
}

export interface ControlDTO extends BaseEntity {
  code: string;
  name: string;
  controlType: ControlType;
}

export interface ControlAddRequest extends Partial<ControlDTO> {
  reqNo: string;
}

export interface ControlEditRequest extends Partial<ControlDTO> {
  reqNo: string;
}

export interface ControlSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type ControlSearchResponse = BaseResponse<
  BaseSearchResponse<ControlDTO>
>;
export type ControlViewResponse = BaseResponse<ControlDTO>;
