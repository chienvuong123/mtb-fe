import { Divider, Flex, Form, type FormInstance, Typography } from 'antd';
import { trimObjectValues } from '@utils/objectHelper';
import { AButton } from '@components/atoms';
import { useFormItems } from '@hooks';
import type { TFormItem } from '@types';
import { useMemo } from 'react';
import clsx from 'clsx';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
} as const;

interface IOBaseForm<T> {
  items: TFormItem[];
  form: FormInstance<T>;
  onSubmit: (values: T) => void;
  onClose?: () => void;
  className?: string;
}

const OBaseForm = <T extends object>({
  form,
  items,
  onSubmit,
  onClose,
  className,
}: IOBaseForm<T>) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, colProps, ...others }) => ({
        label: <Typography className="fw-500 fs-14">{label}</Typography>,
        colProps: {
          span: colProps?.span ?? 12,
          ...colProps,
        },
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [14, 17] },
  });

  const handleClear = () => {
    onClose?.();
    form.resetFields();
  };

  const handleSubmit = (values: T) => {
    onSubmit(trimObjectValues(values));
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className={clsx('o-base-form', className)}
    >
      <div className="o-base-form pos-relative">
        <div className="form-wrapper px-40 py-28" data-testid="form-content">
          {formContent}
        </div>

        <div className="w-full btn-group">
          <Divider className="ma-0" />
          <Flex justify="center" className="py-16 w-full" gap="middle">
            <AButton
              onClick={handleClear}
              variant="filled"
              color="primary"
              data-testid="cancel-button"
            >
              {BUTTON_TEXT.CANCEL}
            </AButton>
            <AButton
              type="primary"
              htmlType="submit"
              data-testid="submit-button"
            >
              {BUTTON_TEXT.SAVE}
            </AButton>
          </Flex>
        </div>
      </div>
    </Form>
  );
};

export default OBaseForm;
