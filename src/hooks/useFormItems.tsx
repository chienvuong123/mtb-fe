import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  TimePicker,
  Upload,
  type GetProps,
  type FormInstance,
} from 'antd';
import React, { useMemo, type FocusEvent } from 'react';

import clsx from 'clsx';
import {
  AButton,
  AInputArea,
  AInputOtp,
  AInputPassword,
  ASelect,
} from '@components/atoms';
import {
  INPUT_TYPE,
  type TFormItem,
  type TOTPProps,
  type TPasswordProps,
} from '@types';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { PlusIcon } from '@assets/icons';

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

const formItemComponents: Record<INPUT_TYPE, FormItemComponent> = {
  [INPUT_TYPE.TEXT]: (props: GetProps<typeof Input>) => <Input {...props} />,
  [INPUT_TYPE.TEXT_AREA]: (props: GetProps<typeof AInputArea>) => (
    <AInputArea {...props} />
  ),
  [INPUT_TYPE.OTP]: (props: TOTPProps) => <AInputOtp {...props} />,
  [INPUT_TYPE.PASSWORD]: (props: TPasswordProps) => (
    <AInputPassword {...props} />
  ),
  [INPUT_TYPE.NUMBER]: ({
    className,
    controls = false,
    size = 'large',
    ...props
  }: GetProps<typeof InputNumber>) => (
    <InputNumber
      className={clsx('w-full fs-14', className)}
      controls={controls}
      size={size}
      {...props}
    />
  ),
  [INPUT_TYPE.SELECT]: ({
    filterOption,
    ...props
  }: GetProps<typeof ASelect>) => (
    <ASelect
      allowClear
      notFoundContent="Không có dữ liệu"
      maxTagCount="responsive"
      filterOption={
        filterOption === true
          ? (input, option) =>
              ((option?.label ?? '') as string)
                .toLowerCase()
                .includes(input.toLowerCase())
          : filterOption
      }
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
              onAddClick,
              ...formItemProps
            }) => {
              const {
                span,
                flex,
                className: colClassName,
                ...otherColProps
              } = colProps ?? {};
              const showAddBtn = Boolean(onAddClick);

              return (
                <Col
                  span={span ?? 6}
                  flex={flex ?? (span ? undefined : '20%')}
                  className={clsx(
                    { 'dis-flex gap-14 ai-flex-end': showAddBtn },
                    colClassName,
                  )}
                  {...otherColProps}
                  key={formItemProps.name}
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
                  {showAddBtn && (
                    <AButton
                      type="primary"
                      icon={<PlusIcon />}
                      className="min-w-40 h-40"
                      onClick={() => onAddClick?.(formItemProps.name)}
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
