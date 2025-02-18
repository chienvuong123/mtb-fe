import { OSearchBaseForm } from '@components/organisms';
import { useCampaignSearchMasterDataQuery } from '@hooks/queries/useCampaignQueries';
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
        allowClear: false,
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên Category',
      name: 'nameCategory',
      inputProps: {
        showSearch: true,
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Mã campaign',
      name: 'campaignId',
      inputProps: {
        optionsQuery: { value: 'id', label: 'id' },
        getListOptions: useCampaignSearchMasterDataQuery,
        getQueryParams: (searchText: string, page: number) => {
          return {
            page: { pageNum: page, pageSize: 10 },
            code: searchText,
          };
        },
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên campaign',
      name: 'nameCampaign',
      inputProps: {
        optionsQuery: { value: 'name', label: 'name' },
        getListOptions: useCampaignSearchMasterDataQuery,
        getQueryParams: (searchText: string, page: number) => {
          return {
            page: { pageNum: page, pageSize: 10 },
            name: searchText,
          };
        },
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
