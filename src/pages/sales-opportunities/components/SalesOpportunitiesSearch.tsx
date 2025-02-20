import { OSearchBaseForm } from '@components/organisms';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useMemo } from 'react';
import type { TSalesOpportunitiesSearchForm } from 'src/dtos/sales-opportunities';

interface ISalesOpportunitiesSearch {
  initialValues?: TSalesOpportunitiesSearchForm;
  onSearch: (values: TSalesOpportunitiesSearchForm) => void;
  onClearAll?: () => void;
}

const SalesOpportunitiesSearch: React.FC<ISalesOpportunitiesSearch> = ({
  initialValues,
  onSearch,
  onClearAll,
}) => {
  const [form] = useForm();

  const { data: categoryList } = useQueryCategoryList();
  const { data: campaignList } = useQueryCampaignList();

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
        name: 'codeCategory',
        inputProps: {
          placeholder: 'Chọn...',
          maxLength: 100,
          disabled: true,
          options: categoryList,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'codeCampaign',
        inputProps: {
          placeholder: 'Chọn...',
          maxLength: 100,
          disabled: true,
          options: campaignList,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã khách hàng',
        name: 'codeCustomer',
        inputProps: { title: 'Mã', placeholder: 'Chọn...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'fullName',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { title: 'Email', placeholder: 'Nhập...', maxLength: 30 },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: {
          title: 'sdt',
          placeholder: 'Nhập...',
          maxLength: 10,
          className: 'input-custom',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nghề nghiệp',
        name: 'profession',
        inputProps: { title: 'Nghề nghiệp', placeholder: 'Chọn...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Hạng khách hàng',
        name: 'rank',
        inputProps: { title: 'Hạng khách hàng', placeholder: 'Chọn...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nhóm khách hàng',
        name: 'group',
        inputProps: { title: 'Nhóm khách hàng', placeholder: 'Chọn...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: { title: 'Trạng thái', placeholder: 'Chọn...' },
      },
    ];
    return formItems;
  }, [categoryList, campaignList]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

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
