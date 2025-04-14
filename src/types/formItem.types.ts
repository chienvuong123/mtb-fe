import type { TUploadMultimedia } from '@components/molecules/m-multimedia-upload';
import type {
  ButtonProps,
  CheckboxProps,
  ColProps,
  DatePickerProps,
  FormInstance,
  FormItemProps,
  Input,
  InputNumberProps,
  InputProps,
  SelectProps,
  TimePickerProps,
  UploadProps,
} from 'antd';
import type { GetProps } from 'antd/lib';
import type { TextAreaProps } from 'antd/lib/input';
import type React from 'react';
import type { CSSProperties } from 'react';
import type { ReactQuillProps } from 'react-quill';

export type TFormType = 'add' | 'edit' | 'view';
export interface IFormType<T, Init = T> {
  mode?: TFormType;
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
  CHECKBOX,
  EDITOR,
  NUMBER_RANGE,
  MULTIMEDIA_UPLOAD,
}

export type TOTPProps = GetProps<typeof Input.OTP>;
export type TPasswordProps = GetProps<typeof Input.Password>;

export type TBaseFormItem = FormItemProps & {
  colProps?: ColProps & {
    maxWidth?: CSSProperties['maxWidth']; // Only works without span prop
  };
  surfixButton?: boolean | ButtonProps;
  blockingPattern?: RegExp;
};

export type TInputRange = {
  start?: InputProps & { formItemProps?: FormItemProps };
  end?: InputProps & { formItemProps?: FormItemProps };
  form?: FormInstance;
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
      inputProps?: InputProps & { label: React.ReactNode };
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.CHECKBOX;
      inputProps?: CheckboxProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.EDITOR;
      inputProps?: ReactQuillProps;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.NUMBER_RANGE;
      inputProps?: InputProps & TInputRange;
    })
  | (TBaseFormItem & {
      type: INPUT_TYPE.MULTIMEDIA_UPLOAD;
      inputProps?: TUploadMultimedia;
    });
