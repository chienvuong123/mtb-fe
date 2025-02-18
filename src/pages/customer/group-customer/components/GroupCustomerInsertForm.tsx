import { OBaseForm } from '@components/organisms';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries/useGroupCustomerQueries';
import {
  MOCK_CAMPAIGN_OPTIONS,
  MOCK_CATEGORY_CAMPAIGN_OPTIONS,
} from '@mocks/group-customer';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/es/form/Form';
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

  const categoryId = useWatch('categoryId', form);

  const unselectedCategory = !categoryId;

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã Category',
            name: 'categoryId',
            inputProps: {
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              options: MOCK_CATEGORY_CAMPAIGN_OPTIONS.map((item) => ({
                value: item.id,
                label: item.id,
              })),
            },
          },

          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã campaign',
            name: 'campaignId',
            inputProps: {
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              disabled: unselectedCategory,
              options: MOCK_CAMPAIGN_OPTIONS.map((item) => ({
                value: item.id,
                label: item.id,
              })),
            },
          },

          {
            type: INPUT_TYPE.TEXT,
            label: 'Mã nhóm',
            name: 'code',
            maxLength: 100,
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Tên nhóm',
            name: 'name',
            maxLength: 100,
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
    [mode, unselectedCategory],
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
