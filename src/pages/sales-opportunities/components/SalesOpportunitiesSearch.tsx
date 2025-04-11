import { OSearchBaseForm } from '@components/organisms';
import { STATUS_SALES_OPPORTUNITIES_OPTIONS } from '@constants/masterData';
import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import { CategoryType } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
} from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/es/form/Form';
import React, { useEffect, useMemo } from 'react';
import type { TSalesOpportunitiesSearchForm } from '@dtos';

const SalesOpportunitiesSearch: React.FC<
  CBaseSearch<TSalesOpportunitiesSearchForm>
> = ({ initialValues, onSearch, onClearAll }) => {
  const [form] = useForm();
  const categoryId = useWatch('categoryId', form);

  const { isSeller, isSellerManager } = useProfile();

  const unselectedCategory = !categoryId && !isSeller;

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: campaignList } = useQueryCampaignList({ categoryId }, false);

  const { data: customerApproachStatus } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_STATUS,
  });

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Order ID',
        name: 'orderId',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
      ...(isSeller || isSellerManager
        ? []
        : [
            {
              type: INPUT_TYPE.SELECT,
              label: 'Category',
              name: 'categoryId',
              inputProps: {
                placeholder: 'Chọn...',
                showSearch: true,
                filterOption: true,
                options: categoryList,
              },
            } as const,
          ]),
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'campaignId',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          disabled: unselectedCategory,
          options: campaignList,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái cơ hội bán',
        name: 'mbOpportunitySttList',
        inputProps: {
          title: 'Trạng thái',
          placeholder: 'Chọn...',
          options: STATUS_SALES_OPPORTUNITIES_OPTIONS,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái tiếp cận gần nhất',
        name: 'customerApproachStatus',
        inputProps: {
          title: 'Trạng thái',
          placeholder: 'Chọn...',
          options: customerApproachStatus,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã khách hàng',
        name: 'customerCode',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'cusName',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'cusPhone',
        inputProps: { placeholder: 'Nhập...', maxLength: 10 },
        blockingPattern: BLOCKING_NUMBER_PARTERN,
      },
    ];
    return formItems;
  }, [
    categoryList,
    campaignList,
    unselectedCategory,
    customerApproachStatus,
    isSeller,
    isSellerManager,
  ]);

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (unselectedCategory || !campaignList?.length) {
      form.resetFields(['campaignId']);
      form.resetFields(['customerGroupId']);
    }
  }, [unselectedCategory, form, campaignList]);

  return (
    <div className="search-oppportunites-wrapper">
      <OSearchBaseForm<TSalesOpportunitiesSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default SalesOpportunitiesSearch;
