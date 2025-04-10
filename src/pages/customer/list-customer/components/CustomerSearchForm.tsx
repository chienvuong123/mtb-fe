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
import { getValueFromEvent, handleResetFields } from '@utils/formHelper';
import { ROUTES } from '@routers/path';

const handleGetValueFromEvent = (e: React.ChangeEvent<HTMLInputElement>) =>
  getValueFromEvent(e?.target?.value ?? e, BLOCKING_NUMBER_PARTERN);

const CustomerSearchForm: FC<
  CBaseSearch<CustomerDTO> & {
    onDeleteAll?: () => void;
  }
> = ({ initialValues, onSearch, onClearAll, onCreate, onDeleteAll }) => {
  const [form] = useForm();
  const {
    isAdmin,
    isCampaignManager,
    isSellerManager,
    isSeller,
    hasPermission,
  } = useProfile();

  const categoryId = useWatch(['categoryId'], form);
  const campaignId = useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: campaignList } = useQueryCampaignList(
    { categoryId: isSeller ? undefined : categoryId },
    true,
    !!categoryId,
  );
  const { data: customerSegmentList } = useCategoryOptionsListQuery(
    { categoryTypeCode: CategoryType.CUSTOMER_SEGMENT },
    false,
    isAdmin || isCampaignManager || isSellerManager,
  );
  const { data: statusOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_STATUS,
  });
  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId ?? '',
    false,
    !!((isAdmin || isCampaignManager || isSellerManager) && campaignId),
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
          hidden: isSeller || isSellerManager,
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
          hidden: isSeller || isSellerManager,
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
          hidden: isSeller || isSellerManager,
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
          label: 'Trạng thái tiếp cận',
          name: 'approachResultStatus',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: statusOptions,
          },
        },
        {
          type: INPUT_TYPE.NUMBER_RANGE,
          label: 'Số lần gọi',
          name: 'numberOfCalls',
          inputProps: {
            start: {
              placeholder: 'Từ...',
              maxLength: 10,
              formItemProps: {
                name: 'startNumberOfCalls',
                getValueFromEvent: handleGetValueFromEvent,
              },
            },
            end: {
              placeholder: 'Đến...',
              maxLength: 10,
              formItemProps: {
                name: 'endNumberOfCalls',
                getValueFromEvent: handleGetValueFromEvent,
              },
            },
          },
          blockingPattern: BLOCKING_NUMBER_PARTERN,
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Nhóm khách hàng',
          name: 'cusGroup',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: groupCustomerList,
            disabled: !campaignId || !categoryId,
          },
          hidden: isSeller || isSellerManager,
        },
      ] as TFormItem[],
    [
      categoryId,
      campaignId,
      categoryList,
      campaignList,
      customerSegmentList,
      statusOptions,
      groupCustomerList,
      form,
      isSeller,
      isSellerManager,
    ],
  );

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<CustomerDTO>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={
          hasPermission(ROUTES.CUSTOMER.CREATE)
            ? () => onCreate?.(form.getFieldsValue() as CustomerDTO)
            : undefined
        }
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
};

export default CustomerSearchForm;
