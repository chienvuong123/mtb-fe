import { OSearchBaseForm } from '@components/organisms';
import {
  MOCK_CAMPAIGN_OPTIONS,
  MOCK_CATEGORY_CAMPAIGN_OPTIONS,
} from '@mocks/group-customer';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC } from 'react';
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

  const items: TFormItem[] = [
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
      label: 'Tên Category',
      name: 'nameCategory',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        options: MOCK_CATEGORY_CAMPAIGN_OPTIONS.map((item) => ({
          value: item.name,
          label: item.name,
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
        options: MOCK_CAMPAIGN_OPTIONS.map((item) => ({
          value: item.id,
          label: item.id,
        })),
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên campaign',
      name: 'nameCampaign',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        options: MOCK_CAMPAIGN_OPTIONS.map((item) => ({
          value: item.name,
          label: item.name,
        })),
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

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

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
