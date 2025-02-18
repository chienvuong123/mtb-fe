import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import type { TCampaignSearchForm } from 'src/dtos/campaign';

interface ICampaignSearch {
  initialValues: TCampaignSearchForm;
  onSearch: (values: TCampaignSearchForm) => void;
  onClearAll: () => void;
  onCreate?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Category',
    name: 'categoryCode',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
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
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Campaign',
    name: 'codeCampaign',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Campaign',
    name: 'nameCampaign',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      placeholder: 'Chọn...',
      options: STATUS_CAMPAIGN_OPTIONS,
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày bắt đầu',
    name: 'startDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
    },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày kết thúc',
    name: 'endDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
    },
  },
];

const CampaignSearch: React.FC<ICampaignSearch> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <OSearchBaseForm<TCampaignSearchForm>
      items={items}
      form={form}
      onSearch={onSearch}
      onClearAll={onClearAll}
      onCreate={onCreate}
    />
  );
};

export default CampaignSearch;
