import OFormDetail from '@components/organisms/o-form-detail/OFormDetail'
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useMemo } from 'react'
import type { OpportunitySellDTO } from 'src/dtos/opportunity'

interface IOpportunitySellDetail {
    onClose: () => void;
    isViewMode?: boolean;
    initialValues?: Partial<OpportunitySellDTO> | null;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Order Id',
    name: 'code',
    inputProps: { disabled: true},
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Category',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100},
    required: true,
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Catagory',
    name: 'status',
    // inputProps: {
    //   options: STATUS_OPTIONS,
    // },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã Campaign',
    name: 'createdDate',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên Campaign',
    name: 'createdBy',
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
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Họ và tên',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Số điện thoại',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Năm sinh',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Giới tính',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Nghề nghiệp',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Phân khúc khách hàng',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Khách hàng định danh',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Nhóm khách hàng',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Sở thích',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Chi nhánh quản lý',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Seller',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Địa chỉ',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'CCCD',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Trạng thái',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
];

const OpportunitySellDetail: React.FC<IOpportunitySellDetail> = ({
    onClose,
    isViewMode,
    initialValues
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
      <OFormDetail<OpportunitySellDTO>
        form={form}
        items={formItems}
        onClose={onClose}
        isViewMode={isViewMode}
      />
    </div>
  )
}

export default OpportunitySellDetail
