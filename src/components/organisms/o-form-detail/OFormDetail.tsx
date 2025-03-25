import { Divider, Flex, Form, type FormInstance, Typography } from 'antd';
import { AButton } from '@components/atoms';
import { useFormItems } from '@hooks';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useMemo } from 'react';
import clsx from 'clsx';
import './styles.scss';

const BUTTON_TEXT = {
  BACK: 'Trở về',
} as const;

interface IOFormDetail<T> {
  items: TFormItem[];
  form: FormInstance<T>;
  className?: string;
  isViewMode?: boolean;
  onClose?: () => void;
}

const OFormDetail = <T extends object>({
  form,
  items,
  className,
  isViewMode,
  onClose,
}: IOFormDetail<T>) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, inputProps = {}, ...others }) => {
        const modifiedInputProps = isViewMode
          ? {
              ...inputProps,
              open: false,
              readOnly: true,
              suffixIcon: null,
              allowClear: false,
              disabled: false,
              className: clsx('cursor-text', inputProps.className, {
                'pointer-events-none': others.type === INPUT_TYPE.SELECT,
              }),
            }
          : inputProps;
        return {
          label: (
            <Typography.Text ellipsis className="fw-500 fs-14">
              {label}
            </Typography.Text>
          ),
          inputProps: modifiedInputProps,
          ...others,
          required: false,
        };
      }) as TFormItem[],
    [items, isViewMode],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [14, 17] },
    isViewMode,
    form,
  });

  const handleClose = () => {
    onClose?.();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={clsx('o-form-detail', className)}
    >
      <div className="o-form-detail pos-relative">
        <div className="form-wrapper pa-24" data-testid="form-content">
          {formContent}
        </div>

        {onClose && (
          <div className="w-full btn-group">
            <Divider className="ma-0" />
            <Flex justify="center" className="py-16 w-full" gap="middle">
              <AButton
                onClick={handleClose}
                type="primary"
                variant="filled"
                data-testid="back-button"
              >
                {BUTTON_TEXT.BACK}
              </AButton>
            </Flex>
          </div>
        )}
      </div>
    </Form>
  );
};

export default OFormDetail;
