import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  TimePicker,
  Typography,
  Upload,
  type GetProps,
  type FormInstance,
} from 'antd';
import React, { useMemo, type FocusEvent } from 'react';

import {
  AAutoCompleteCurrency,
  AButton,
  AInputArea,
  AInputNumber,
  AInputOtp,
  AInputPassword,
  ASelect,
} from '@components/atoms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import {
  INPUT_TYPE,
  type TFormItem,
  type TOTPProps,
  type TPasswordProps,
} from '@types';
import clsx from 'clsx';
import type { ReactQuillProps } from 'react-quill';
import ReactQuill from 'react-quill';
import { PlusIcon } from '@assets/icons';
import type { DefaultOptionType } from 'antd/es/select';
import { REMOVE_ACCENTS_REGEX } from '@constants/regex';

interface IFormItemsProps {
  formItems?: TFormItem[];
  rowProps?: GetProps<typeof Row> & React.RefAttributes<HTMLDivElement>;
  form?: FormInstance;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormItemComponent<P = any> = (props: P) => React.ReactElement;

const trimField = (value?: string, fieldName?: string, form?: FormInstance) => {
  form?.setFieldValue(fieldName, value?.trim());
};

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(REMOVE_ACCENTS_REGEX, '').toLowerCase();
};

const handleFilterOption = (input: string, option?: DefaultOptionType) => {
  const label = (option?.label ? String(option.label) : '').toLowerCase();
  const labelNoAccent = removeAccents(label);
  const inputNoAccent = removeAccents(input.toLowerCase());
  return (
    label.includes(input.toLowerCase()) || labelNoAccent.includes(inputNoAccent)
  );
};

const formItemComponents: Record<INPUT_TYPE, FormItemComponent> = {
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
};

const useFormItems = ({ formItems, rowProps, form }: IFormItemsProps = {}) => {
  const getFormItem = useMemo(
    () =>
      ({
        type,
        fieldName,
        props,
      }: {
        type: INPUT_TYPE;
        fieldName?: string;
        props: TFormItem['inputProps'];
      }) => {
        const Component = formItemComponents[type] as FormItemComponent;
        const { className, ...inputProps } = props ?? {};

        const handleBlur = [INPUT_TYPE.TEXT, INPUT_TYPE.TEXT_AREA].includes(
          type,
        )
          ? (e: FocusEvent<HTMLInputElement>) =>
              trimField(e.target.value, fieldName, form)
          : undefined;
        return Component ? (
          <Component
            className={className}
            onBlur={handleBlur}
            form={form}
            name={fieldName}
            {...inputProps}
          />
        ) : null;
      },
    [form],
  );

  const formContent = useMemo(
    () =>
      formItems ? (
        <Row {...rowProps}>
          {formItems.map(
            ({
              type,
              inputProps,
              colProps,
              className,
              surfixButton,
              ...formItemProps
            }) => {
              const {
                span,
                flex,
                className: colClassName,
                style,
                maxWidth = '20%',
                ...otherColProps
              } = colProps ?? {};
              const showAddBtn = Boolean(surfixButton);

              return (
                <Col
                  span={span}
                  flex={flex ?? (span ? undefined : '20%')}
                  style={{ maxWidth: span ? undefined : maxWidth, ...style }}
                  className={clsx({ 'pos-relative': showAddBtn }, colClassName)}
                  key={formItemProps.name}
                  hidden={formItemProps?.hidden}
                  {...otherColProps}
                >
                  {type === INPUT_TYPE.LABEL ? (
                    <Typography
                      className={clsx('fw-500 fs-14', inputProps?.className)}
                    >
                      {inputProps?.label}
                    </Typography>
                  ) : (
                    <div
                      className={clsx({
                        'mr-57': showAddBtn,
                      })}
                    >
                      <Form.Item
                        className={clsx('mb-0 w-full', className)}
                        {...formItemProps}
                      >
                        {getFormItem({
                          type,
                          props: inputProps,
                          fieldName: formItemProps.name,
                        })}
                      </Form.Item>
                    </div>
                  )}
                  {showAddBtn && !formItemProps?.hidden && (
                    <AButton
                      type="primary"
                      icon={<PlusIcon />}
                      className="min-w-40 h-40 pos-absolute right-8 top-26"
                      {...(surfixButton !== true && surfixButton)}
                    />
                  )}
                </Col>
              );
            },
          )}
        </Row>
      ) : null,
    [formItems, rowProps, getFormItem],
  );

  return { formContent, getFormItem };
};

export default useFormItems;
