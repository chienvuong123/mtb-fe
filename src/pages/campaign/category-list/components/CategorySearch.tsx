import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import type { TManageCategorySearchForm } from 'src/dtos/manage-category';

interface IManageCategorySearch {
  initialValues: TManageCategorySearchForm;
  onSearch: (values: TManageCategorySearchForm) => void;
  onClearAll: () => void;
  onCreate?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã',
    name: 'code',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên ',
    name: 'name',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày bắt đầu',
    name: 'startDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
    },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày kết thúc',
    name: 'endDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      placeholder: 'Chọn...',
      options: STATUS_CAMPAIGN_OPTIONS,
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Main Product ',
    name: 'mainProduct',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Sub Product ',
    name: 'subProduct',
    inputProps: {
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
      options: [
        { value: 1, label: 'Selection 1' },
        { value: 2, label: 'Selection 2' },
      ],
    },
  },
];

const CategorySearch: React.FC<IManageCategorySearch> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <OSearchBaseForm<TManageCategorySearchForm>
      items={items}
      form={form}
      onSearch={onSearch}
      onClearAll={onClearAll}
      onCreate={onCreate}
    />
  );
};

export default CategorySearch;
