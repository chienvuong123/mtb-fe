import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useMemo } from 'react';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';

interface ISalesOpportunitiesDetail {
  onClose: () => void;
  isViewMode?: boolean;
  initialValues?: Partial<SalesOpportunitiesDTO> | null;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Order Id',
    name: 'orderID',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Category',
    name: 'codeCategory',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    required: true,
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Catagory',
    name: 'nameCategory',
    // inputProps: {
    //   options: STATUS_OPTIONS,
    // },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Campaign',
    name: 'codeCampaign',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên Campaign',
    name: 'nameCampaign',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ngày cập nhật',
    name: 'updatedDate',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã khách hàng',
    name: 'codeCustomer',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Họ và tên',
    name: 'fullName',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.NUMBER,
    label: 'Số điện thoại',
    name: 'phone',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'email',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Năm sinh',
    name: 'birthday',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Giới tính',
    name: 'gender',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Nghề nghiệp',
    name: 'profession',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Phân khúc khách hàng',
    name: 'segmentCustomer',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Khách hàng định danh',
    name: 'identifierCustomer',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Nhóm khách hàng',
    name: 'groupCustomer',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Sở thích',
    name: 'hobby',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Chi nhánh quản lý',
    name: 'branchManager',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Seller',
    name: 'Seller',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Địa chỉ',
    name: 'address',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'CCCD',
    name: 'cccd',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: { disabled: true },
  },
];

const SalesOpportunitiesDetail: React.FC<ISalesOpportunitiesDetail> = ({
  onClose,
  isViewMode,
  initialValues,
}) => {
  const [form] = useForm();

  const formItems = useMemo(
    () =>
      isViewMode
        ? items.map((i) => ({
            ...i,
            inputProps: {
              ...i.inputProps,
              disabled: i.type === INPUT_TYPE.SELECT,
              readOnly: true,
            },
          }))
        : items,
    [isViewMode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OFormDetail<SalesOpportunitiesDTO>
        form={form}
        items={formItems}
        onClose={onClose}
        isViewMode={isViewMode}
      />
    </div>
  );
};

export default SalesOpportunitiesDetail;
