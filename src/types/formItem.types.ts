import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from '@dtos';
import type { UseQueryResult } from '@tanstack/react-query';
import type {
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

export type TFormType = 'add' | 'edit' | 'view';
export type TOptionsQueryType = 'code' | 'name' | 'id';
export interface IFormType<T, Init = T> {
  mode: TFormType;
  form?: FormInstance<T>;
  initialValues?: Partial<Init> | null;
}

export type ListMasterDataResponse = {
  code: string;
  name: string;
  id: string;
};

export type OptionsQueryType = {
  value: TOptionsQueryType;
  label: TOptionsQueryType;
};

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
  BLANK,
}

export type QueryHookResult<TData, TError> = UseQueryResult<TData, TError>;
export type GetListOptionsType = (
  params: BaseSearchParams,
) => QueryHookResult<
  BaseResponse<BaseSearchResponse<ListMasterDataResponse>>,
  Error
>;
export type GetQueryParamsType = (
  searchText: string,
  page: number,
) => BaseSearchParams;
export type TOTPProps = GetProps<typeof Input.OTP>;
export type TPasswordProps = GetProps<typeof Input.Password>;
export type TSelectProps = SelectProps & {
  getListOptions?: GetListOptionsType;
  getQueryParams?: GetQueryParamsType;
  optionsQuery?: OptionsQueryType;
};
export type TBaseFormItem = FormItemProps & {
  colProps?: ColProps;
  onAddClick?: (field?: string) => void;
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
      inputProps?: TSelectProps;
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
  | (TBaseFormItem & { type: INPUT_TYPE.BLANK; inputProps?: InputProps });
