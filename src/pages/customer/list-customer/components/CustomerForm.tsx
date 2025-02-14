import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useEffect, type FC, useMemo } from 'react';
import { useForm } from 'antd/lib/form/Form';
import type { CustomerDTO } from '@dtos';
import { GENDER_OPTIONS } from '@constants/masterData';
import { ALLOWED_CHARACTERS_PARTERN } from '@constants/regex';
import { dayjsToString, stringToDayjs } from '@libs/dayjs';
import type { Dayjs } from 'dayjs';
import clsx from 'clsx';
import type { FormInstance } from 'antd';

export type TCustomerForm = Partial<Omit<CustomerDTO, 'birthDay'>> & {
  birthDay?: Dayjs;
};
interface ICustomerForm {
  isViewMode?: boolean;
  initialValues?: Partial<CustomerDTO> | null;
  onClose: () => void;
  onSubmit: (values: Partial<CustomerDTO>, form: FormInstance) => void;
}

const items: TFormItem[] = (
  [
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã Category',
      name: 'categoryId',
      inputProps: { disabled: true },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên category',
      name: 'categoryName',
      inputProps: { disabled: true },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Mã Campaign',
      inputProps: {
        options: [{ value: 'CMP001', label: 'CMP001' }],
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
      },
      name: 'campaignId',
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Tên Campaign',
      name: 'campaignName',
      inputProps: {
        options: [{ value: 'Tên Campaign', label: 'Tên Campaign' }],
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã khách hàng',
      name: 'code',
      required: true,
      rules: [
        { required: true },
        {
          pattern: ALLOWED_CHARACTERS_PARTERN,
          message: 'Chỉ cho phép ký tự chữ và số',
        },
      ],
      inputProps: { maxLength: 30 },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Họ và tên',
      name: 'name',
      required: true,
      rules: [
        { required: true },
        {
          pattern: ALLOWED_CHARACTERS_PARTERN,
          message: 'Chỉ cho phép ký tự chữ và số',
        },
      ],
      inputProps: { maxLength: 30 },
    },
    {
      type: INPUT_TYPE.NUMBER,
      label: 'Số điện thoại',
      name: 'phone',
      inputProps: { maxLength: 12 },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Email',
      name: 'email',
      required: true,
      inputProps: { maxLength: 50 },
      rules: [
        { required: true },
        { type: 'email', message: 'Định dạng email không hợp lệ' },
      ],
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Năm sinh',
      name: 'birthDay',
      inputProps: { placeholder: 'Nhập...' },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Giới tính',
      name: 'gender',
      inputProps: { options: GENDER_OPTIONS },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Nhóm khách hàng',
      name: 'cusGroup',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Phân khúc khách hàng',
      name: 'cusSegment',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Nghề nghiệp',
      name: 'job',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Khách hàng định danh',
      name: 'identification',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        mode: 'multiple',
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Địa chỉ',
      name: 'address',
      inputProps: { maxLength: 200 },
    },
    {
      type: INPUT_TYPE.NUMBER,
      label: 'CCCD',
      name: 'identityCard',
      inputProps: { maxLength: 20, stringMode: true },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Sở thích',
      name: 'hobbies',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        mode: 'multiple',
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Chi nhánh quản lý',
      name: 'branch',
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        placeholder: 'Chọn...',
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Seller',
      name: 'seller',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        options: [
          { value: '1', label: 'Selection 1' },
          { value: '2', label: 'Selection 2' },
        ],
        placeholder: 'Chọn...',
      },
    },
  ] as TFormItem[]
).map((i) => ({ ...i, colProps: { flex: '20%' } }));

const CustomerForm: FC<ICustomerForm> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
}) => {
  const [form] = useForm();

  const formItems = useMemo(
    () =>
      isViewMode
        ? items.map((i) => ({
            ...i,
            inputProps: {
              ...i.inputProps,
              className: clsx('pointer-events-none', i.className),
              readOnly: true,
            },
          }))
        : items,
    [isViewMode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthDay: initialValues?.birthDay
          ? stringToDayjs(initialValues.birthDay)
          : undefined,
      } as TCustomerForm);
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<TCustomerForm>
        items={formItems}
        form={form}
        onSubmit={({ birthDay, ...v }) =>
          onSubmit(
            {
              ...v,
              birthDay: dayjsToString(birthDay),
            },
            form,
          )
        }
        isViewMode={isViewMode}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CustomerForm;
