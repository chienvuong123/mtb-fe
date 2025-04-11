import { OSearchBaseForm } from '@components/organisms';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { handleResetFields } from '@utils/formHelper';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import type { GroupCustomerDTO } from '@dtos';

const GroupCustomerSearchForm: FC<CBaseSearch<GroupCustomerDTO>> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const { hasPermission } = useProfile();

  const categoryId = useWatch('categoryId', form);

  const unselectedCategory = !categoryId;

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: campaignList } = useQueryCampaignList({ categoryId }, true);

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryId',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: categoryList,
          onChange: () => handleResetFields(['campaignId'], form),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'campaignId',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: campaignList,
          disabled: unselectedCategory,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhóm',
        name: 'code',
        inputProps: {
          placeholder: 'Nhập...',
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên nhóm',
        name: 'name',
        inputProps: {
          placeholder: 'Nhập...',
        },
      },
    ];
    return formItems;
  }, [categoryList, campaignList, unselectedCategory, form]);

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (unselectedCategory || !campaignList?.length) {
      form.resetFields(['campaignId']);
    }
  }, [unselectedCategory, form, campaignList]);

  return (
    <div>
      <OSearchBaseForm<GroupCustomerDTO>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={
          hasPermission(ROUTES.CUSTOMER.GROUP_CREATE)
            ? () => onCreate?.(form.getFieldsValue())
            : undefined
        }
      />
    </div>
  );
};

export default GroupCustomerSearchForm;
