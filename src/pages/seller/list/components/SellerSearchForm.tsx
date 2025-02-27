import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import { CategoryType, type SellerSearchRequest } from '@dtos';
import { useProfile } from '@stores';
import {
  useCategoryOptionsListQuery,
  useQueryCampaignList,
  useQueryCategoryList,
} from '@hooks/queries';

interface ISellerSearchForm {
  initialValues?: SellerSearchRequest;
  onSearch: (values: SellerSearchRequest) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const SellerSearchForm: FC<ISellerSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const { isAdmin } = useProfile();

  const categoryId = useWatch(['category'], form);

  const { data: categoryList } = useQueryCategoryList(false, {
    label: 'combine',
    value: 'id',
  });
  const { data: campaignList } = useQueryCampaignList(
    {
      categoryId,
    },
    false,
    { label: 'combine', value: 'id' },
  );
  const { data: departmentList } = useCategoryOptionsListQuery(
    CategoryType.DEPARTMENT,
    { label: 'name', value: 'id' },
  );
  const { data: positionList } = useCategoryOptionsListQuery(
    CategoryType.POSITION,
    { label: 'name', value: 'id' },
  );
  const { data: branchList } = useCategoryOptionsListQuery(
    CategoryType.BRANCHES,
    { label: 'name', value: 'id' },
  );

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chi nhánh',
        name: 'branch',
        inputProps: {
          options: branchList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Phòng',
        name: 'department',
        inputProps: {
          options: departmentList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chức vụ',
        name: 'position',
        inputProps: {
          options: positionList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhân viên',
        name: 'code',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Tổng campaign tham gia',
        name: 'totalCampaign',
        inputProps: { placeholder: 'Nhập...', controls: true },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'category',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: categoryList,
          onChange: () => form.setFieldValue('campaignId', undefined),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'campaign',
        inputProps: {
          disabled: !categoryId,
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: categoryId ? campaignList : [],
        },
      },
    ];
    return formItems;
  }, [
    campaignList,
    categoryList,
    departmentList,
    positionList,
    branchList,
    categoryId,
    form,
  ]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<SellerSearchRequest>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={isAdmin ? onCreate : undefined}
      />
    </div>
  );
};

export default SellerSearchForm;
