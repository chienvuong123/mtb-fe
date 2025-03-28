import {
  type ButtonProps,
  Divider,
  Flex,
  type FlexProps,
  Form,
  type FormInstance,
  Typography,
} from 'antd';
import { trimObjectValues } from '@utils/objectHelper';
import { AButton } from '@components/atoms';
import { useFormItems } from '@hooks';
import type { TFormItem } from '@types';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import './styles.scss';
import { getValueFromEvent } from '@utils/formHelper';
import { useIsMutating } from '@tanstack/react-query';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
} as const;

interface IOBaseForm<T> {
  items: TFormItem[];
  form: FormInstance<T>;
  onSubmit?: (values: T) => void;
  onClose?: () => void;
  className?: string;
  isViewMode?: boolean;
  mutationKey: string;
  disabledSubmit?: boolean;
  children?: React.ReactNode;
  saveBtnProps?: ButtonProps;
  cancelBtnProps?: ButtonProps;
  footerProps?: Omit<FlexProps, 'children'>;
}

const OBaseForm = <T extends object>({
  form,
  items,
  onSubmit,
  onClose,
  className,
  isViewMode,
  mutationKey,
  disabledSubmit,
  children,
  saveBtnProps,
  cancelBtnProps,
  footerProps,
}: IOBaseForm<T>) => {
  const mutatingCount = useIsMutating({ mutationKey: [mutationKey] });

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mutatingCount > 0) {
      setSubmitLoading(true);
    } else {
      setTimeout(() => {
        setSubmitLoading(false);
      }, 500);
    }
  }, [mutatingCount]);

  const handleSaveClick = async () => {
    await form.validateFields();
    setSubmitLoading(true);
    form.submit();
  };

  const transformItems = useMemo(
    () =>
      items.map(({ label, blockingPattern, type, ...others }) => {
        return {
          label: (
            <Typography.Text ellipsis className="fw-500 fs-14">
              {label}
            </Typography.Text>
          ),
          getValueFromEvent: blockingPattern
            ? (e: React.ChangeEvent<HTMLInputElement>) => {
                return getValueFromEvent(
                  e?.target?.value ?? e,
                  blockingPattern,
                );
              }
            : undefined,
          type,
          ...others,
        };
      }) as TFormItem[],
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [14, 17] },
    form,
    isViewMode,
  });

  const handleSubmit = (values: T) => {
    onSubmit?.(trimObjectValues(values));
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form]);

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className={clsx('o-base-form', className)}
      noValidate
    >
      <div className="o-base-form pos-relative">
        <div className="form-wrapper px-40 py-28" data-testid="form-content">
          {formContent}
          {children}
        </div>

        <div className="w-full btn-group bg-white" hidden={isViewMode}>
          <Divider className="ma-0" />
          <Flex
            justify="center"
            className="py-16 w-full"
            gap="middle"
            {...footerProps}
          >
            {!cancelBtnProps?.hidden && (
              <AButton
                onClick={onClose}
                variant="filled"
                color="primary"
                data-testid="cancel-button"
                {...cancelBtnProps}
              >
                {BUTTON_TEXT.CANCEL}
              </AButton>
            )}
            {!saveBtnProps?.hidden && (
              <AButton
                type="primary"
                htmlType="submit"
                data-testid="submit-button"
                disabled={disabledSubmit || submitLoading}
                onClick={handleSaveClick}
                {...saveBtnProps}
              >
                {BUTTON_TEXT.SAVE}
              </AButton>
            )}
          </Flex>
        </div>
      </div>
    </Form>
  );
};

export default OBaseForm;
