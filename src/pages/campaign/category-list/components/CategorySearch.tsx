import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import type { TManageCategorySearchForm } from 'src/dtos/manage-category';

interface IManageCategorySearch {
  onSearch: (values: TManageCategorySearchForm) => void;
  onClearAll: () => void;
  onCreate?: () => void;
}

const CategorySearch: React.FC<IManageCategorySearch> = ({
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const startDate = Form.useWatch('startDate', form);

  useEffect(() => {
    if (!startDate && form.getFieldValue('endDate')) {
      form.setFieldValue('endDate', null);
    }
  }, [startDate, form]);

  const { data: mainProductOptions } = useCategoryOptionsListQuery(
    CategoryType.PRODUCT,
  );
  const { data: subProductOptions } = useCategoryOptionsListQuery(
    CategoryType.SUB_PRODUCT,
  );

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã',
        name: 'code',
        inputProps: {
          placeholder: 'Nhập...',
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên ',
        name: 'name',
        inputProps: {
          placeholder: 'Nhập...',
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
          minDate: startDate ? dayjs(startDate) : dayjs(),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: {
          placeholder: 'Chọn...',
          options: STATUS_CAMPAIGN_OPTIONS,
          allowClear: true,
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
          options: mainProductOptions,
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
          options: subProductOptions,
        },
      },
    ];
    return formItems;
  }, [startDate, subProductOptions, mainProductOptions]);

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
