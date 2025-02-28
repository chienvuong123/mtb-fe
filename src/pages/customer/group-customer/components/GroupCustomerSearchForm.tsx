import { OSearchBaseForm } from '@components/organisms';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type TFormItem } from '@types';
import { handleResetFields } from '@utils/formHelper';
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
  const { isAdmin, isCampaignManager, isSaleManager } = useProfile();

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
          isAdmin || isCampaignManager || isSaleManager
            ? () => onCreate(form.getFieldsValue())
            : undefined
        }
      />
    </div>
  );
};

export default GroupCustomerSearchForm;
