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
} from 'antd';
import type { GetProps } from 'antd/lib';
import type { TextAreaProps } from 'antd/lib/input';

export enum INPUT_TYPE {
  TEXT,
  SELECT,
  PASSWORD,
  OTP,
  DATE_PICKER,
  NUMBER,
  TEXT_AREA,
  TIME_PICKER,
  FILE,
}

export type TOTPProps = GetProps<typeof Input.OTP>;
export type TPasswordProps = GetProps<typeof Input.Password>;

export type TBaseFormItem = FormItemProps & {
  colProps?: ColProps;
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
    });
