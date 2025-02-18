import { OBaseForm } from '@components/organisms';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries/useGroupCustomerQueries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import clsx from 'clsx';
import { useEffect, useMemo, type FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

interface IGroupCustomerInsertForm {
  onClose: () => void;
  onSubmit: (values: Partial<GroupCustomerDTO>) => void;
  mode: 'add' | 'view';
  initialValues?: Partial<GroupCustomerDTO> | null;
}

const GroupCustomerInsertForm: FC<IGroupCustomerInsertForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã Category',
            name: 'categoryId',
            inputProps: {
              options: [],
              allowClear: false,
            },
          },

          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã campaign',
            name: 'campaignId',
            inputProps: {
              options: [],
              allowClear: false,
              colProps: { span: 24, flex: 1 },
            },
          },

          {
            type: INPUT_TYPE.TEXT,
            label: 'Mã nhóm',
            name: 'code',
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Tên nhóm',
            name: 'name',
          },
        ] as TFormItem[]
      ).map((i) => {
        const item: TFormItem = { ...i, colProps: { flex: '50%' } };
        if (mode === 'view') {
          return {
            ...item,
            inputProps: {
              ...item.inputProps,
              className: clsx('pointer-events-none', item.className),
              readOnly: true,
            },
          };
        }
        return item;
      }),
    [mode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues && mode === 'view') {
      form.setFieldsValue({ ...initialValues });
      return;
    }
    form.resetFields();
  }, [initialValues, form, mode]);

  return (
    <div>
      <OBaseForm<GroupCustomerDTO>
        mutationKey={GROUP_CUSTOMER_KEY}
        items={items}
        isViewMode={mode === 'view'}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default GroupCustomerInsertForm;
