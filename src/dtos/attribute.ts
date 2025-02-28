import type { EControlType } from '@constants/masterData';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export type ControlValue<T extends EControlType> = {
  TEXT: string;
  BLOCK_OF_TEXT: string;
  COMBO_BOX: {
    options: string[];
  };
  RADIO_BUTTON_GROUP: {
    options: string[];
  };
  CHECKBOX_LIST: {
    options: string[];
  };
  IMAGE: { title: string; src: string };
  DATE_PICKER: string;
  NUMBER_STEPPER: number;
  ON_OFF_SWITCH: {
    options: string[];
  };
  LINK: string;
  BUTTON: { title: string; link: string };
}[T];

export type ControlValueType = ControlValue<EControlType>;

export interface AttributeDTO extends BaseEntity {
  attributeName: string;
  controlType: EControlType;
  description: string;
  content: string | null;
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
