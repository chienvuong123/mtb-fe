import { GENDER_OPTIONS } from '@constants/masterData';
import {
  BLOCKING_CHARACTERS_PARTERN,
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { Form } from 'antd';
import { CategoryType, type CustomerDTO } from '@dtos';
import { dayjsToString, stringToDayjs } from '@utils/dateHelper';
import { INPUT_TYPE, type TFormItem, type IFormType } from '@types';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  useCategoryOptionsListQuery,
  useGroupCustomerOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
  useSellerOptionsListQuery,
} from '@hooks/queries';
import type { ICustomerForm, TCustomerForm } from '../customer.type';

const useCustomerForm = ({
  mode,
  initialValues,
  onSubmit,
  onClose,
}: IFormType<TCustomerForm, CustomerDTO> & Partial<ICustomerForm>) => {
  const [form] = Form.useForm<Partial<TCustomerForm>>();

  const categoryId = Form.useWatch(['categoryId'], form);
  const campaignId = Form.useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList(false, {
    label: 'combine',
    value: 'code',
  });
  const { data: campaignList } = useQueryCampaignList({
    categoryCode: categoryId,
  });
  const { data: sellerList } = useSellerOptionsListQuery();
  const { data: hobbiesList } = useCategoryOptionsListQuery(CategoryType.HOBBY);
  const { data: jobList } = useCategoryOptionsListQuery(CategoryType.JOB);
  const { data: identificationList } = useCategoryOptionsListQuery(
    CategoryType.MB_IDENTIFICATION,
  );
  const { data: customerSegmentList } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_SEGMENT,
  );
  const { data: branchList } = useCategoryOptionsListQuery(
    CategoryType.BRANCHES,
  );
  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId ?? '',
  );

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.SELECT,
            label: 'Category',
            name: 'categoryId',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              placeholder: 'Nhập...',
              options: categoryList,
              showSearch: true,
              filterOption: true,
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Campaign',
            name: 'campaignId',
            required: true,
            rules: [{ required: true }],
            inputProps: {
              options: campaignList,
              placeholder: 'Chọn...',
              showSearch: true,
              filterOption: true,
              disabled: !categoryId,
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
            inputProps: { maxLength: 50 },
            rules: [{ type: 'email', message: 'Định dạng email không hợp lệ' }],
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
              disabled: !categoryId || !campaignId,
              options: groupCustomerList,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Phân khúc khách hàng',
            name: 'cusSegment',
            inputProps: {
              options: customerSegmentList,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Nghề nghiệp',
            name: 'job',
            inputProps: {
              options: jobList,
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Định danh khách hàng',
            name: 'identification',
            inputProps: {
              options: identificationList,
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
              options: hobbiesList,
              mode: 'multiple',
              placeholder: 'Chọn...',
            },
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Chi nhánh quản lý',
            name: 'branch',
            inputProps: {
              options: branchList,
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
              options: sellerList,
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
      categoryId,
      campaignId,
      categoryList,
      campaignList,
      sellerList,
      hobbiesList,
      jobList,
      customerSegmentList,
      identificationList,
      branchList,
      groupCustomerList,
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
