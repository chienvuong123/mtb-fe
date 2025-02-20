import type {
  UploadProps,
  FormItemProps,
  InputProps,
  ColProps,
  InputNumberProps,
  SelectProps,
  DatePickerProps,
  TimePickerProps,
  Input,
  FormInstance,
} from 'antd';
import type { GetProps } from 'antd/lib';
import type { TextAreaProps } from 'antd/lib/input';
import type { CSSProperties } from 'react';

export type TFormType = 'add' | 'edit' | 'view';
export interface IFormType<T, Init = T> {
  mode: TFormType;
  form?: FormInstance<T>;
  initialValues?: Partial<Init> | null;
}

export enum INPUT_TYPE {
  TEXT,
  SELECT,
  PASSWORD,
  OTP,
  DATE_PICKER,
  NUMBER,
  CURRENCY,
  TEXT_AREA,
  TIME_PICKER,
  FILE,
  BLANK,
  LABEL,
}

export type TOTPProps = GetProps<typeof Input.OTP>;
export type TPasswordProps = GetProps<typeof Input.Password>;

export type TBaseFormItem = FormItemProps & {
  colProps?: ColProps & {
    maxWidth?: CSSProperties['maxWidth']; // Only works without span prop
  };
  onAddClick?: (field?: string) => void;
  blockingPattern?: RegExp;
};

export type TFormItem =
  | (TBaseFormItem & {
      type: INPUT_TYPE.TEXT;
      inputProps?: InputProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.PASSWORD;
      inputProps?: TPasswordProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.OTP;
      inputProps?: TOTPProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.NUMBER;
      inputProps?: InputNumberProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.CURRENCY;
      inputProps?: InputNumberProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.SELECT;
      inputProps?: SelectProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.DATE_PICKER;
      inputProps?: DatePickerProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.TEXT_AREA;
      inputProps?: TextAreaProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.TIME_PICKER;
      inputProps?: TimePickerProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.FILE;
      inputProps?: UploadProps;
    })
  | (TBaseFormItem & { type: INPUT_TYPE.BLANK; inputProps?: InputProps })
  | (TBaseFormItem & {
      type: INPUT_TYPE.LABEL;
      inputProps?: InputProps & { label: string };
    });
