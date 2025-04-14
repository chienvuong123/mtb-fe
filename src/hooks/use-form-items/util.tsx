import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  TimePicker,
  Typography,
  Upload,
  type GetProps,
  type FormInstance,
  Flex,
  Form,
} from 'antd';
import React from 'react';

import {
  AAutoCompleteCurrency,
  AInputArea,
  AInputNumber,
  AInputOtp,
  AInputPassword,
  ASelect,
} from '@components/atoms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import {
  INPUT_TYPE,
  type TInputRange,
  type TOTPProps,
  type TPasswordProps,
} from '@types';
import clsx from 'clsx';
import type { ReactQuillProps } from 'react-quill';
import ReactQuill from 'react-quill';
import type { DefaultOptionType } from 'antd/es/select';
import { REMOVE_ACCENTS_REGEX } from '@constants/regex';
import dayjs from 'dayjs';
import {
  MMultimediaUpload,
  type TUploadMultimedia,
} from '@components/molecules/m-multimedia-upload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormItemComponent<P = any> = (props: P) => React.ReactElement;

export const updateTooltipContent = (
  type: INPUT_TYPE,
  fieldName: string,
  form: FormInstance,
  inputProps: Record<string, unknown>,
) => {
  const fieldValue = form.getFieldValue(fieldName);

  let displayValue;
  switch (type) {
    case INPUT_TYPE.DATE_PICKER: {
      displayValue = fieldValue
        ? dayjs(fieldValue).format(DATE_SLASH_FORMAT_DDMMYYYY)
        : '';
      break;
    }
    case INPUT_TYPE.SELECT: {
      if ('options' in inputProps && Array.isArray(inputProps.options)) {
        displayValue = (inputProps.options as DefaultOptionType[]).find(
          (option) => option.value === fieldValue,
        )?.label;

        if (typeof displayValue === 'string') {
          break;
        }
        if (typeof displayValue === 'object') {
          displayValue = (displayValue as JSX.Element)?.props?.children ?? '';
          break;
        }

        displayValue = fieldValue;
      }
      break;
    }
    default: {
      displayValue = fieldValue;
      break;
    }
  }
  return typeof displayValue === 'string' ? displayValue : '';
};

export const trimField = (
  value?: string,
  fieldName?: string,
  form?: FormInstance,
) => {
  form?.setFieldValue(fieldName, value?.trim());
};

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(REMOVE_ACCENTS_REGEX, '').toLowerCase();
};

export const handleFilterOption = (
  input: string,
  option?: DefaultOptionType,
) => {
  const label = (option?.label ? String(option.label) : '').toLowerCase();
  const labelNoAccent = removeAccents(label);
  const inputNoAccent = removeAccents(input.toLowerCase());
  return (
    label.includes(input.toLowerCase()) || labelNoAccent.includes(inputNoAccent)
  );
};

export const formItemComponents: Record<INPUT_TYPE, FormItemComponent> = {
  [INPUT_TYPE.TEXT]: (props: GetProps<typeof Input>) => <Input {...props} />,
  [INPUT_TYPE.TEXT_AREA]: (props: GetProps<typeof AInputArea>) => (
    <AInputArea {...props} />
  ),
  [INPUT_TYPE.OTP]: (props: TOTPProps) => <AInputOtp {...props} />,
  [INPUT_TYPE.PASSWORD]: (props: TPasswordProps) => (
    <AInputPassword {...props} />
  ),
  [INPUT_TYPE.NUMBER]: (props: GetProps<typeof InputNumber>) => (
    <AInputNumber {...props} />
  ),
  [INPUT_TYPE.CURRENCY]: (
    props: Omit<GetProps<typeof InputNumber>, 'form'>,
  ) => <AAutoCompleteCurrency {...props} />,
  [INPUT_TYPE.SELECT]: ({
    filterOption,
    ...props
  }: GetProps<typeof ASelect>) => (
    <ASelect
      allowClear
      notFoundContent="Không có dữ liệu"
      maxTagCount="responsive"
      filterOption={filterOption === true ? handleFilterOption : filterOption}
      {...props}
    />
  ),
  [INPUT_TYPE.DATE_PICKER]: ({
    className,
    size = 'large',
    format = DATE_SLASH_FORMAT_DDMMYYYY,
    ...props
  }: GetProps<typeof DatePicker> & { className?: string }) => (
    <DatePicker
      className={clsx('w-full h-40', className)}
      size={size}
      format={format}
      {...props}
    />
  ),
  [INPUT_TYPE.TIME_PICKER]: ({ className }: { className?: string }) => (
    <TimePicker className={clsx('w-full', className)} showSecond={false} />
  ),
  [INPUT_TYPE.FILE]: () => (
    <Upload.Dragger name="files" action="/upload.do">
      <p className="ant-upload-drag-icon" />
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Upload.Dragger>
  ),
  [INPUT_TYPE.BLANK]: () => <div />,
  [INPUT_TYPE.LABEL]: (props: GetProps<typeof Typography>) => (
    <Typography {...props} />
  ),
  [INPUT_TYPE.CHECKBOX]: (props: GetProps<typeof Checkbox>) => (
    <Checkbox {...props} />
  ),
  [INPUT_TYPE.EDITOR]: (props: ReactQuillProps) => <ReactQuill {...props} />,
  [INPUT_TYPE.NUMBER_RANGE]: ({
    start,
    end,
  }: GetProps<typeof Input> & TInputRange) => {
    const {
      formItemProps: startFormItemProps,
      name: startName,
      ...startProps
    } = start || {};
    const {
      formItemProps: endFormItemProps,
      name: endName,
      ...endProps
    } = end || {};
    return (
      <Flex gap={12}>
        <Form.Item name={startName} {...startFormItemProps}>
          <Input {...startProps} />
        </Form.Item>
        <Form.Item name={endName} {...endFormItemProps}>
          <Input {...endProps} />
        </Form.Item>
      </Flex>
    );
  },
  [INPUT_TYPE.MULTIMEDIA_UPLOAD]: (props: TUploadMultimedia) => (
    <MMultimediaUpload {...props} />
  ),
};
