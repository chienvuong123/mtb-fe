import { OSearchBaseForm } from '@components/organisms';
import { CategoryType } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useGroupCustomerOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
} from '@hooks/queries';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/es/form/Form';
import React, { useEffect, useMemo } from 'react';
import type { TSalesOpportunitiesSearchForm } from 'src/dtos/sales-opportunities';

const SalesOpportunitiesSearch: React.FC<
  CBaseSearch<TSalesOpportunitiesSearchForm>
> = ({ initialValues, onSearch, onClearAll }) => {
  const [form] = useForm();
  const categoryId = useWatch('categoryId', form);
  const campaignId = useWatch(['campaignId'], form);

  const unselectedCategory = !categoryId;
  const unselectedCampaign = !campaignId;

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: campaignList } = useQueryCampaignList({ categoryId }, false);
  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId ?? '',
  );
  const { data: customerApproachStatus } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_STATUS,
  );

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Order ID',
        name: 'orderId',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
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
      },
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
          mode: 'multiple',
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
        type: INPUT_TYPE.NUMBER,
        label: 'Số điện thoại',
        name: 'cusPhone',
        inputProps: {
          title: 'sdt',
          placeholder: 'Nhập...',
          maxLength: 10,
          className: 'input-custom',
        },
      },
    ];
    return formItems;
  }, [categoryList, campaignList, unselectedCategory, customerApproachStatus]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (unselectedCategory || !campaignList?.length) {
      form.resetFields(['campaignId']);
      form.resetFields(['customerGroupId']);
    }
  }, [unselectedCategory, form, campaignList]);

  useEffect(() => {
    if (unselectedCampaign || !groupCustomerList?.length) {
      form.resetFields(['customerGroupId']);
    }
  }, [unselectedCampaign, form, groupCustomerList]);

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
