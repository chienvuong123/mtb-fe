import { OSearchBaseForm } from '@components/organisms';
import type { CategoryDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC } from 'react';
import type { CampaignDTO } from 'src/dtos/campaign';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

interface IGroupCustomerSearchForm {
  listMasterData: {
    campaign: CampaignDTO[];
    category: CategoryDTO[];
  };
  initialValues?: Partial<GroupCustomerDTO>;
  onSearch: (values: GroupCustomerDTO) => void;
  onClearAll?: () => void;
  onCreate: (values: Partial<GroupCustomerDTO>) => void;
}

const GroupCustomerSearchForm: FC<IGroupCustomerSearchForm> = ({
  listMasterData,
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
        options: listMasterData.campaign.map((item) => ({
          label: item.code,
          value: item.code,
        })),
        showSearch: true,
        allowClear: false,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên Category',
      name: 'nameCategory',
      inputProps: {
        options: listMasterData.campaign.map((item) => ({
          label: item.name,
          value: item.name,
        })),
        allowClear: false,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Mã campaign',
      name: 'campaignId',
      inputProps: {
        options: listMasterData.campaign.map((item) => ({
          label: item.code,
          value: item.code,
        })),
        allowClear: false,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên campaign',
      name: 'nameCampaign',
      inputProps: {
        options: listMasterData.campaign.map((item) => ({
          label: item.name,
          value: item.name,
        })),
        allowClear: false,
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
