import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC, useMemo } from 'react';
import type { CustomerDTO } from '@dtos';

interface ICustomerSearchForm {
  initialValues: Partial<CustomerDTO>;
  onSearch: (values: object) => void;
  onClearAll?: () => void;
  onDeleteAll: () => void;
  onCreate: (values: CustomerDTO) => void;
}

const CustomerSearchForm: FC<ICustomerSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
  onDeleteAll,
}) => {
  const [form] = useForm();

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Mã Category',
          name: 'categoryId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: [
              {
                value: '13d7d45d-9265-4a15-a94d-20fde3a2f68b',
                label: 'Selection 1',
              },
            ],
          },
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Tên Category',
          name: 'categoryName',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: [{ value: 'Tên danh mục', label: 'Tên danh mục' }],
          },
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Mã Campaign',
          name: 'campaignId',
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
          name: 'campaignName',
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
          type: INPUT_TYPE.TEXT,
          label: 'Mã khách hàng',
          name: 'code',
          inputProps: { placeholder: 'Nhập...' },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Họ và tên',
          name: 'name',
          inputProps: { placeholder: 'Nhập...' },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Email',
          name: 'email',
          inputProps: { placeholder: 'Nhập...' },
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Phân khúc khách hàng',
          name: 'cusSegment',
          inputProps: {
            placeholder: 'Chọn...',
            mode: 'multiple',
            showSearch: true,
            filterOption: true,
            options: [
              { value: 1, label: 'Selection 1' },
              { value: 2, label: 'Selection 2' },
            ],
          },
        },
        {
          type: INPUT_TYPE.NUMBER,
          label: 'Số điện thoại',
          name: 'phone',
          inputProps: { placeholder: 'Nhập...' },
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Nghề nghiệp',
          name: 'job',
          inputProps: {
            placeholder: 'Chọn...',
            mode: 'multiple',
            options: [
              { value: 1, label: 'Selection 1' },
              { value: 2, label: 'Selection 2' },
            ],
          },
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Nhóm khách hàng',
          name: 'cusGroup',
          inputProps: {
            placeholder: 'Chọn...',
            mode: 'multiple',
            showSearch: true,
            filterOption: true,
            options: [
              { value: 1, label: 'Selection 1' },
              { value: 2, label: 'Selection 2' },
            ],
          },
        },
      ] as TFormItem[],
    [],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<CustomerDTO>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={() => onCreate(form.getFieldsValue())}
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
};

export default CustomerSearchForm;
