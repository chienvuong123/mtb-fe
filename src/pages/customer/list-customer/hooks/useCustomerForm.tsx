import { GENDER_OPTIONS } from '@constants/masterData';
import { ALLOWED_VN_CHARACTERS_PARTERN } from '@constants/regex';
import type { CustomerDTO } from '@dtos';
import { dayjsToString, stringToDayjs } from '@libs/dayjs';
import { INPUT_TYPE, type TFormItem, type IFormType } from '@types';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import type { ICustomerForm, TCustomerForm } from '../customer.type';

const useCustomerForm = ({
  mode,
  form,
  initialValues,
  onSubmit,
  onClose,
}: IFormType<TCustomerForm, CustomerDTO> & Partial<ICustomerForm>) => {
  const items = useMemo(
    () =>
      (
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
                pattern: ALLOWED_VN_CHARACTERS_PARTERN,
                message: 'Chỉ cho phép ký tự chữ và số',
              },
            ],
            inputProps: { maxLength: 30, readOnly: mode !== 'add' },
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Họ và tên',
            name: 'name',
            required: true,
            rules: [
              { required: true },
              {
                pattern: ALLOWED_VN_CHARACTERS_PARTERN,
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
      ).map((i) => {
        const item: TFormItem = { ...i, colProps: { flex: '20%' } };
        if (mode === 'view') {
          return {
            ...item,
            inputProps: {
              ...item.inputProps,
              className: clsx('pointer-events-none', item.className),
              readOnly: true,
            },
          };
        }
        return item;
      }),
    [mode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      const { birthDay, hobbies, identification, ...otherInit } =
        initialValues ?? {};
      form.setFieldsValue({
        ...otherInit,
        birthDay: birthDay ? stringToDayjs(birthDay) : undefined,
        hobbies: hobbies ? JSON.parse(hobbies) : [],
        identification: identification ? JSON.parse(identification) : [],
      } as TCustomerForm);
    }
  }, [initialValues, form]);

  const handleSubmit = ({
    birthDay,
    hobbies,
    identification,
    ...values
  }: TCustomerForm) => {
    onSubmit?.(
      {
        ...values,
        birthDay: dayjsToString(birthDay),
        hobbies: hobbies ? JSON.stringify(hobbies) : undefined,
        identification: identification
          ? JSON.stringify(identification)
          : undefined,
      },
      form,
    );
  };

  const handleClose = () => {
    onClose?.();
    form.resetFields();
  };

  return { formItems: items, handleSubmit, handleClose };
};

export default useCustomerForm;
