import { OSearchBaseForm } from '@components/organisms';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

interface IGroupCustomerSearchForm {
  initialValues?: Partial<GroupCustomerDTO>;
  onSearch: (values: GroupCustomerDTO) => void;
  onClearAll?: () => void;
  onCreate: (values: Partial<GroupCustomerDTO>) => void;
}

const GroupCustomerSearchForm: FC<IGroupCustomerSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  const categoryId = useWatch('categoryId', form);

  const unselectedCategory = !categoryId;

  const { data: categoryList } = useQueryCategoryList();

  const categoryCode = categoryList?.find((i) => {
    return i.value === categoryId;
  })?.code;

  const { data: campaignList } = useQueryCampaignList(
    {
      categoryCode,
    },
    true,
  );

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
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên nhóm',
        name: 'name',
      },
    ];
    return formItems;
  }, [categoryList, campaignList, unselectedCategory]);

  useEffect(() => {
    if (initialValues) {
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
        onCreate={() => onCreate(form.getFieldsValue())}
      />
    </div>
  );
};

export default GroupCustomerSearchForm;
