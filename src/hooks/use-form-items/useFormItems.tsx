import {
  Col,
  Form,
  Row,
  Typography,
  type GetProps,
  type FormInstance,
} from 'antd';
import React, { useMemo, type FocusEvent } from 'react';

import { AButton } from '@components/atoms';
import { INPUT_TYPE, type TFormItem } from '@types';
import clsx from 'clsx';
import { PlusIcon } from '@assets/icons';
import { formItemComponents, trimField, type FormItemComponent } from './util';
import NativeTooltipFormItem from './NativeTooltipFormItem';

interface IFormItemsProps {
  formItems?: TFormItem[];
  rowProps?: GetProps<typeof Row> & React.RefAttributes<HTMLDivElement>;
  form?: FormInstance;
  isViewMode?: boolean;
}

const useFormItems = ({
  formItems,
  rowProps,
  form,
  isViewMode,
}: IFormItemsProps = {}) => {
  const renderFormItem = useMemo(
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
        const { className, ...inputProps } = props ?? {};

        const handleBlur = [INPUT_TYPE.TEXT, INPUT_TYPE.TEXT_AREA].includes(
          type,
        )
          ? (e: FocusEvent<HTMLInputElement>) =>
              trimField(e.target.value, fieldName, form)
          : undefined;

        if (!isViewMode) {
          const Component = formItemComponents[type] as FormItemComponent;
          return (
            <Component
              className={className}
              onBlur={handleBlur}
              form={form}
              name={fieldName}
              {...inputProps}
            />
          );
        }

        return (
          <NativeTooltipFormItem
            type={type}
            fieldName={fieldName}
            inputProps={inputProps as Record<string, unknown>}
            form={form}
            isViewMode={isViewMode}
            className={className}
            handleBlur={handleBlur}
          />
        );
      },
    [form, isViewMode],
  );

  const formContent = useMemo(() => {
    if (!formItems) return null;

    return (
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
                      {renderFormItem({
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
    );
  }, [formItems, rowProps, renderFormItem]);

  return { formContent, getFormItem: renderFormItem };
};

export default useFormItems;
