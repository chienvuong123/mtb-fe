import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import {
  EGender,
  GENDER_OBJECT,
  STATUS_CUSTOMER_OBJECT,
} from '@constants/masterData';
import type { EApproachStatus } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
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
    label: 'Ngày cập nhật',
    name: 'updatedDate',
    inputProps: { disabled: true },
    getValueProps: (value) => ({
      value: value ? dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY) : '',
    }),
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
    getValueProps: (value) => ({
      value: GENDER_OBJECT[value as EGender] || '',
    }),
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
    label: 'Khách hàng định danh',
    name: 'identifierCustomer',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Nhóm khách hàng',
    name: 'cusGroupName',
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
    label: 'Số giấy tờ định danh',
    name: 'identityCard',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: { disabled: true },
    getValueProps: (value) => ({
      value: STATUS_CUSTOMER_OBJECT[value as EApproachStatus] || '',
    }),
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
