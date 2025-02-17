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
  SELECT: {
    options: { text: string; value: string }[];
  };
  RADIO: {
    options: { text: string; value: string }[];
  };
  CHECKBOX: {
    options: { text: string; value: string }[];
  };
  IMAGE: { title: string; src: string };
  DATETIME: string;
  NUMBER: number;
  SWITCH: {
    options: { text: string; value: string }[];
  };
  LINK: string;
  BUTTON: { title: string; link: string };
}[T];

export type ControlValueType = ControlValue<EControlType>;

export interface AttributeDTO extends BaseEntity {
  attributeName: string;
  controlType: EControlType;
  content: string;
  config: ControlValueType;
  haveNote?: boolean;
  controlName?: string;
}

export interface AttributeSearchRequest extends BaseSearchParams {
  attributeName?: string;
}

export type AttributeSearchResponse = BaseResponse<
  BaseSearchResponse<AttributeDTO>
>;
export type AttributeViewResponse = BaseResponse<AttributeDTO>;
