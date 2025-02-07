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
} from 'antd';
import React, { useMemo } from 'react';

import clsx from 'clsx';
import {
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

interface IFormItemsProps {
  formItems?: TFormItem[];
  rowProps?: GetProps<typeof Row> & React.RefAttributes<HTMLDivElement>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormItemComponent<P = any> = (props: P) => React.ReactElement;

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
    <InputNumber {...props} controls={false} />
  ),
  [INPUT_TYPE.SELECT]: (props: GetProps<typeof ASelect>) => (
    <ASelect {...props} allowClear />
  ),
  [INPUT_TYPE.DATE_PICKER]: ({
    className,
    ...props
  }: GetProps<typeof DatePicker> & { className?: string }) => (
    <DatePicker {...props} className={clsx('w-full', className)} />
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
};

const useFormItems = ({ formItems, rowProps }: IFormItemsProps = {}) => {
  const getFormItem = useMemo(
    () =>
      (
        type: INPUT_TYPE,
        { className, ...itemProps }: TFormItem['inputProps'] = {},
      ) => {
        const Component = formItemComponents[type] as FormItemComponent;
        return Component ? (
          <Component className={className} {...itemProps} />
        ) : null;
      },
    [],
  );

  const formContent = useMemo(
    () =>
      formItems ? (
        <Row {...rowProps}>
          {formItems.map(
            ({ type, inputProps, colProps, className, ...formItemProps }) => {
              const { span, flex, ...otherColProps } = colProps ?? {};
              return (
                <Col
                  span={span ?? 6}
                  flex={flex ?? (span ? undefined : '20%')}
                  {...otherColProps}
                  key={formItemProps.name}
                >
                  <Form.Item
                    {...formItemProps}
                    className={clsx('mb-0', className)}
                  >
                    {getFormItem(type, inputProps)}
                  </Form.Item>
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
