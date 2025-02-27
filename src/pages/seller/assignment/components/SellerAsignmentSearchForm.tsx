import { OSearchBaseForm } from '@components/organisms';
import type { AssignmentSellerSearchForm } from '@dtos';
import {
  useGroupCustomerOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
} from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/lib/form/Form';
import { useCallback, useEffect, useMemo, type FC } from 'react';

interface ISellerAssignmentForm {
  initialValues?: Partial<AssignmentSellerSearchForm> | null;
  onSearch: (value: AssignmentSellerSearchForm) => void;
  onClearAll: () => void;
}

const SellerAsignmentSearchForm: FC<ISellerAssignmentForm> = ({
  initialValues,
  onSearch,
  onClearAll,
}) => {
  const [form] = useForm();
  const categoryId = useWatch(['categoryId'], form);
  const campaignId = useWatch(['campaignId'], form);

  const { data: categoryList } = useQueryCategoryList(false, {
    label: 'combine',
    value: 'code',
  });
  const { data: campaignList } = useQueryCampaignList(
    { categoryCode: categoryId },
    false,
  );

  const { data: groupCustomerList } = useGroupCustomerOptionsListQuery(
    campaignId,
    { label: 'name', value: 'id' },
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  const onChange = useCallback(
    (dependentFields: string[]) => {
      form.setFieldsValue(
        dependentFields.reduce(
          (a, c) => Object.assign(a, { [c]: undefined }),
          {} as AssignmentSellerSearchForm,
        ),
      );
    },
    [form],
  );

  const handleClearAll = () => {
    form.resetFields();
    onClearAll();
  };

  const items: TFormItem[] = useMemo(
    () => [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryId',
        inputProps: {
          placeholder: 'Nhập...',
          options: categoryList,
          showSearch: true,
          filterOption: true,
          onChange: () => onChange(['campaignId', 'cusGroup']),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'campaignId',
        inputProps: {
          options: categoryId ? campaignList : [],
          disabled: !categoryId,
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          onChange: () => onChange(['cusGroup']),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nhóm khách hàng',
        name: 'cusGroup',
        inputProps: {
          disabled: !campaignId || !categoryId,
          options: campaignId && categoryId ? groupCustomerList : [],
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          mode: 'multiple',
        },
      },
    ],
    [
      campaignId,
      categoryId,
      campaignList,
      categoryList,
      groupCustomerList,
      onChange,
    ],
  );

  return (
    <div>
      <OSearchBaseForm<AssignmentSellerSearchForm>
        searchText="Chọn"
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default SellerAsignmentSearchForm;
