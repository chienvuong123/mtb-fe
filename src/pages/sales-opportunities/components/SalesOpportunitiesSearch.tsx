import { OSearchBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import type { TSalesOpportunitiesSearchForm } from 'src/dtos/sales-opportunities';

interface ISalesOpportunitiesSearch {
  initialValues?: TSalesOpportunitiesSearchForm;
  onSearch: (values: TSalesOpportunitiesSearchForm) => void;
  onClearAll?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Order ID',
    name: 'orderId',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Category',
    name: 'codeCategory',
    inputProps: { placeholder: 'Chọn...', maxLength: 100, disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Category',
    name: 'nameCategory',
    inputProps: { placeholder: 'Chọn...', maxLength: 100, disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Campaign',
    name: 'codeCampaign',
    inputProps: { placeholder: 'Chọn...', maxLength: 100, disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Campaign',
    name: 'nameCampaign',
    inputProps: { placeholder: 'Chọn...', maxLength: 100, disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã khách hàng',
    name: 'codeCustomer',
    inputProps: { title: 'Mã', placeholder: 'Chọn...', maxLength: 20 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Họ và tên',
    name: 'fullName',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'email',
    inputProps: { title: 'Email', placeholder: 'Nhập...', maxLength: 30 },
  },
  {
    type: INPUT_TYPE.NUMBER,
    label: 'Số điện thoại',
    name: 'phone',
    inputProps: {
      title: 'sdt',
      placeholder: 'Nhập...',
      maxLength: 10,
      style: { width: '100%', height: '40px', lineHeight: '40px' },
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Nghề nghiệp',
    name: 'profession',
    inputProps: { title: 'Nghề nghiệp', placeholder: 'Chọn...' },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Hạng khách hàng',
    name: 'rank',
    inputProps: { title: 'Hạng khách hàng', placeholder: 'Chọn...' },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Nhóm khách hàng',
    name: 'group',
    inputProps: { title: 'Nhóm khách hàng', placeholder: 'Chọn...' },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: { title: 'Trạng thái', placeholder: 'Chọn...' },
  },
];

const SalesOpportunitiesSearch: React.FC<ISalesOpportunitiesSearch> = ({
  initialValues,
  onSearch,
  onClearAll,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TSalesOpportunitiesSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default SalesOpportunitiesSearch;
