import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import type { TManageCategorySearchForm } from '@dtos';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';

const CategorySearch: React.FC<CBaseSearch<TManageCategorySearchForm>> = ({
  onSearch,
  onClearAll,
  onCreate,
  initialValues,
}) => {
  const [form] = useForm();
  const startDate = Form.useWatch('startDate', form);
  const endDate = Form.useWatch('endDate', form);

  const { hasPermission } = useProfile();

  const { data: mainProductOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.PRODUCT,
  });

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã',
        name: 'code',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 20,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên ',
        name: 'name',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 100,
        },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày bắt đầu',
        name: 'startDate',
        inputProps: {
          placeholder: 'Chọn ngày...',
          className: 'date-picker-campaign',
          maxDate: endDate ? dayjs(endDate) : undefined,
        },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày kết thúc',
        name: 'endDate',
        inputProps: {
          placeholder: 'Chọn ngày...',
          className: 'date-picker-campaign',
          minDate: startDate,
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
        label: 'Sản phẩm chính ',
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
        label: 'Sản phẩm phụ ',
        name: 'subProduct',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: mainProductOptions,
        },
      },
    ];
    return formItems;
  }, [startDate, mainProductOptions, endDate]);

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjs(initialValues.startDate, DATE_SLASH_FORMAT_DDMMYYYY)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate, DATE_SLASH_FORMAT_DDMMYYYY)
          : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <OSearchBaseForm<TManageCategorySearchForm>
      items={items}
      form={form}
      onSearch={onSearch}
      onClearAll={onClearAll}
      onCreate={
        hasPermission(ROUTES.CAMPAIGN.CATEGORY.CREATE) ? onCreate : undefined
      }
    />
  );
};

export default CategorySearch;
