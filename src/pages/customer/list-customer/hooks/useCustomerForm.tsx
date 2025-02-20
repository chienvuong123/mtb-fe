import { GENDER_OPTIONS } from '@constants/masterData';
import {
  BLOCKING_CHARACTERS_PARTERN,
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { Form } from 'antd';
import type { CustomerDTO } from '@dtos';
import { dayjsToString, stringToDayjs } from '@utils/dateHelper';
import { INPUT_TYPE, type TFormItem, type IFormType } from '@types';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo } from 'react';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';
import dayjs from 'dayjs';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import type { ICustomerForm, TCustomerForm } from '../customer.type';

const useCustomerForm = ({
  mode,
  initialValues,
  onSubmit,
  onClose,
}: IFormType<TCustomerForm, CustomerDTO> & Partial<ICustomerForm>) => {
  const [form] = Form.useForm<Partial<TCustomerForm>>();

  const categoryId = Form.useWatch(['categoryId'], form);
  const categoryName = Form.useWatch(['categoryName'], form);
  const campaignId = Form.useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList();
  const { data: campaignList } = useQueryCampaignList();

  const { categoryListByCode, categoryListByName } = categoryList ?? {};
  const { campaignListByCode, campaignListByName } = campaignList ?? {};

  const hasCategory = categoryId && categoryName;

  const onSelectChange = useCallback(
    (fieldChange: keyof CustomerDTO, value: string) => {
      form.setFieldValue(fieldChange, value);
    },
    [form],
  );

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã Category',
            name: 'categoryId',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              placeholder: 'Nhập...',
              options: categoryListByCode,
              showSearch: true,
              filterOption: true,
              onChange: (value) => onSelectChange('categoryName', value),
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Tên category',
            name: 'categoryName',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              placeholder: 'Nhập...',
              options: categoryListByName,
              showSearch: true,
              filterOption: true,
              onChange: (value) => onSelectChange('categoryId', value),
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Mã Campaign',
            name: 'campaignId',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              options: campaignListByCode,
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              disabled: !hasCategory,
              onChange: (value) => onSelectChange('campaignName', value),
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Tên Campaign',
            name: 'campaignName',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              options: campaignListByName,
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              disabled: !hasCategory,
              onChange: (value) => onSelectChange('campaignId', value),
            },
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Mã khách hàng',
            name: 'code',
            required: true,
            rules: [{ required: true }],
            inputProps: { maxLength: 30, readOnly: mode !== 'add' },
            blockingPattern: BLOCKING_CHARACTERS_PARTERN,
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Họ và tên',
            name: 'name',
            required: true,
            rules: [{ required: true }],
            inputProps: { maxLength: 30 },
            blockingPattern: BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Số điện thoại',
            name: 'phone',
            inputProps: { maxLength: 12 },
            blockingPattern: BLOCKING_NUMBER_PARTERN,
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
            name: 'birthday',
            inputProps: { placeholder: 'Nhập...', maxDate: dayjs() },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Giới tính',
            name: 'gender',
            inputProps: { options: GENDER_OPTIONS },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Nhóm khách hàng',
            name: 'cusGroup',
            inputProps: {
              disabled: !hasCategory || !campaignId,
              options: MOCK_CUSTOMER_OPTIONS,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Phân khúc khách hàng',
            name: 'cusSegment',
            inputProps: {
              options: MOCK_CUSTOMER_OPTIONS,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Nghề nghiệp',
            name: 'job',
            inputProps: {
              options: MOCK_CUSTOMER_OPTIONS,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Định danh khách hàng',
            name: 'identification',
            inputProps: {
              options: MOCK_CUSTOMER_OPTIONS,
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
            type: INPUT_TYPE.TEXT,
            label: 'CCCD',
            name: 'identityCard',
            inputProps: { maxLength: 20, stringMode: true },
            blockingPattern: BLOCKING_NUMBER_PARTERN,
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Sở thích',
            name: 'hobbies',
            inputProps: {
              options: MOCK_CUSTOMER_OPTIONS,
              mode: 'multiple',
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Chi nhánh quản lý',
            name: 'branch',
            inputProps: {
              options: MOCK_CUSTOMER_OPTIONS,
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
              options: MOCK_CUSTOMER_OPTIONS,
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
    [
      mode,
      hasCategory,
      campaignId,
      categoryListByCode,
      categoryListByName,
      campaignListByCode,
      campaignListByName,
      onSelectChange,
    ],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      const { birthday, hobbies, identification, ...otherInit } =
        initialValues ?? {};
      form.setFieldsValue({
        ...otherInit,
        birthday: birthday ? stringToDayjs(birthday) : undefined,
        hobbies: hobbies?.split(',') ?? [],
        identification: identification?.split(',') ?? [],
      } as TCustomerForm);
    }
  }, [initialValues, form]);

  const handleSubmit = ({
    birthday,
    hobbies,
    identification,
    ...values
  }: TCustomerForm) => {
    onSubmit?.(
      {
        ...values,
        birthday: dayjsToString(birthday),
        hobbies: hobbies?.join(','),
        identification: identification?.join(','),
      },
      form,
    );
  };

  const handleClose = () => {
    onClose?.();
    form.resetFields();
  };

  return { form, formItems: items, handleSubmit, handleClose };
};

export default useCustomerForm;
