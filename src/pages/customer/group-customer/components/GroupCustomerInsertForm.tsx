import { OBaseForm } from '@components/organisms';
import { ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN } from '@constants/regex';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries/groupCustomerQueries';
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

  const { data: categoryList } = useQueryCategoryList(false, {
    label: 'combine',
    value: 'code',
  });
  const { data: campaignList } = useQueryCampaignList({
    categoryCode: categoryId,
  });

  const unselectedCategory = !categoryId;

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.SELECT,
            label: 'Category',
            name: 'categoryId',
            rules: [{ required: true }],
            inputProps: {
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              options: categoryList,
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Campaign',
            name: 'campaignId',
            rules: [{ required: true }],
            inputProps: {
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              disabled: unselectedCategory,
              options: campaignList,
            },
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Mã nhóm',
            name: 'code',
            inputProps: {
              maxLength: 30,
            },
            rules: [
              { required: true },
              {
                pattern: ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN,
                message: 'Không được nhập ký tự đặc biệt',
              },
            ],
            normalize: (value: string) => value.trim(),
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Tên nhóm',
            name: 'name',
            inputProps: {
              maxLength: 100,
            },
            rules: [{ required: true }],
          },
        ] as TFormItem[]
      ).map((i) => {
        const item: TFormItem = { ...i, colProps: { span: 12 } };
        if (mode === 'view') {
          return {
            ...item,
            colProps: { span: 12 },
            inputProps: {
              ...item.inputProps,
              className: clsx('pointer-events-none', item.className),
              readOnly: true,
            },
          };
        }
        return item;
      }),
    [mode, unselectedCategory, categoryList, campaignList],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues && mode === 'view') {
      form.setFieldsValue({ ...initialValues });
      return;
    }
    form.resetFields();
  }, [initialValues, form, mode]);

  useEffect(() => {
    if (unselectedCategory || !campaignList?.length) {
      form.resetFields(['campaignId']);
    }
  }, [unselectedCategory, form, campaignList]);

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
