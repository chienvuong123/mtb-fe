import { OFormDetail } from '@components/organisms';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useMemo } from 'react';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Order Id',
    name: 'orderId',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Category',
    name: 'categoryCode',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên Catagory',
    name: 'categoryName',
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Campaign',
    name: 'campaignCode',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên Campaign',
    name: 'campaignName',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã khách hàng',
    name: 'customerCode',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Họ và tên',
    name: 'customerName',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.NUMBER,
    label: 'Số điện thoại',
    name: 'customerPhone',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'customerEmail',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Năm sinh',
    name: 'birthDate',
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
    name: 'customerSegment',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Loại giấy tờ định danh',
    name: 'identnDocType',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Số giấy tờ định danh',
    name: 'identityCard',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Hạn mức vay',
    name: 'limitAmount',
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Chi nhánh quản lý',
    name: 'branch',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Seller',
    name: 'seller',
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
    label: 'Nhóm khách hàng',
    name: 'cusGroupName',
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Trạng thái cơ hội bán',
    name: 'mbOpportunityStt',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Trạng thái khoản vay F88',
    name: 'quickOfferStatus',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Loại tài sản',
    name: 'categoryAssetName',
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên tài sản',
    name: 'assetName',
  },
];

const SalesOpportunitiesDetail: React.FC<CBaseForm<SalesOpportunitiesDTO>> = ({
  onClose,
  mode,
  initialValues,
}) => {
  const [form] = useForm();

  const formItems = useMemo(
    () =>
      mode === 'view'
        ? items.map((i) => ({
            ...i,
            inputProps: {
              ...i.inputProps,
              disabled: i.type === INPUT_TYPE.SELECT,
              readOnly: true,
            },
          }))
        : items,
    [mode],
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
        isViewMode={mode === 'view'}
      />
    </div>
  );
};

export default SalesOpportunitiesDetail;
