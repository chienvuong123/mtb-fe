import type { EControlType } from '@constants/masterData';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export type ControlValue<T extends EControlType> = {
  TEXT: string;
  EDITOR: string;
  SELECT: string[];
  RADIO: string[];
  CHECKBOX: string[];
  IMAGE: { alt: string; url: string };
  DATETIME: string;
  NUMBER: number;
  SWITCH: string[];
  LINK: string;
  BUTTON: { title: string; link: string };
}[T];

export type ControlValueType = ControlValue<EControlType>;

export interface AttributeDTO extends BaseEntity {
  name: string;
  controlType: EControlType;
  content: string;
  value: ControlValueType;
}

export interface AttributeSearchRequest extends BaseSearchParams {
  name?: string;
}

export type AttributeSearchResponse = BaseResponse<
  BaseSearchResponse<AttributeDTO>
>;
export type AttributeViewResponse = BaseResponse<AttributeDTO>;
