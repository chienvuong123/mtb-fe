import { INPUT_TYPE, type TFormItem } from '@types';
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
import { useProfile } from '@stores';
import { parseCustomerObj } from '../customerHelper';
import type { TCustomerSearchForm } from '../customer.type';

interface ICustomerSearchForm {
  initialValues: Partial<CustomerDTO>;
  onSearch: (values: TCustomerSearchForm) => void;
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
  const { isAdmin, isCampaignManager } = useProfile();

  const categoryId = useWatch(['categoryId'], form);
  const campaignId = useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList(false, {
    label: 'combine',
    value: 'code',
  });
  const { data: campaignList } = useQueryCampaignList({
    categoryCode: categoryId,
  });
  const { data: customerSegmentList } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_SEGMENT,
  );
  const { data: jobList } = useCategoryOptionsListQuery(CategoryType.JOB);
  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId ?? '',
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
            options: campaignList,
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
            options: customerSegmentList,
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
            options: jobList,
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
            options: groupCustomerList,
          },
        },
      ] as TFormItem[],
    [
      categoryList,
      campaignList,
      customerSegmentList,
      jobList,
      groupCustomerList,
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
            ? () => onCreate(form.getFieldsValue())
            : undefined
        }
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
};

export default CustomerSearchForm;
