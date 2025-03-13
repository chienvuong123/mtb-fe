import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, type FC, useMemo } from 'react';
import { CategoryType, type CustomerDTO } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useGroupCustomerOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
} from '@hooks/queries';
import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import { useProfile } from '@stores';
import { handleResetFields } from '@utils/formHelper';
import { parseCustomerObj } from '../customerHelper';
import type { TCustomerSearchForm } from '../customer.type';

const CustomerSearchForm: FC<
  CBaseSearch<CustomerDTO, TCustomerSearchForm> & {
    onDeleteAll?: () => void;
  }
> = ({ initialValues, onSearch, onClearAll, onCreate, onDeleteAll }) => {
  const [form] = useForm();
  const { isAdmin, isCampaignManager, isSellerManager, isSeller } =
    useProfile();

  const categoryId = useWatch(['categoryId'], form);
  const campaignId = useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: campaignList } = useQueryCampaignList(
    { categoryId: isSeller ? undefined : categoryId },
    true,
  );
  const { data: customerSegmentList } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_SEGMENT,
    false,
    isAdmin || isCampaignManager || isSellerManager,
  );
  const { data: jobList } = useCategoryOptionsListQuery(CategoryType.JOB);
  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId ?? '',
    false,
    isAdmin || isCampaignManager || isSellerManager,
  );

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Category',
          name: 'categoryId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: categoryList,
            onChange: () => handleResetFields(['campaignId', 'cusGroup'], form),
          },
          hidden: isSeller,
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Campaign',
          name: 'campaignId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: campaignList,
            disabled: !isSeller && !categoryId,
            onChange: () => handleResetFields(['cusGroup'], form),
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
          hidden: isSeller,
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Phân khúc khách hàng',
          name: 'cusSegment',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: customerSegmentList,
          },
          hidden: isSeller,
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Số điện thoại',
          name: 'phone',
          inputProps: { placeholder: 'Nhập...', maxLength: 10 },
          blockingPattern: BLOCKING_NUMBER_PARTERN,
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Nghề nghiệp',
          name: 'job',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: jobList,
          },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Số lần gọi',
          name: 'numberOfCalls',
          inputProps: { placeholder: 'Nhập...', maxLength: 2 },
          blockingPattern: BLOCKING_NUMBER_PARTERN,
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
            options: groupCustomerList,
            disabled: !campaignId || !categoryId,
          },
          hidden: isSeller,
        },
      ] as TFormItem[],
    [
      categoryId,
      campaignId,
      categoryList,
      campaignList,
      customerSegmentList,
      jobList,
      groupCustomerList,
      form,
      isSeller,
    ],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(parseCustomerObj(initialValues));
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TCustomerSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={
          isAdmin || isCampaignManager
            ? () => onCreate?.(form.getFieldsValue() as CustomerDTO)
            : undefined
        }
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
};

export default CustomerSearchForm;
