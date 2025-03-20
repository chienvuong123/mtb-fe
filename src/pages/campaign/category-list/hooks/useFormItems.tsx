import { INPUT_TYPE, type TFormItem } from '@types';
import dayjs from 'dayjs';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { useEffect } from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd';

interface ICategoryFormItemsProps {
  isDisabled: boolean;
  form: FormInstance;
}

const useCategoryFormItems = ({
  isDisabled,
  form,
}: ICategoryFormItemsProps): TFormItem[] => {
  const startDate = Form.useWatch('startDate', form);
  const endDate = Form.useWatch('endDate', form);

  useEffect(() => {
    if (!startDate && form.getFieldValue('endDate')) {
      form.setFieldValue('endDate', null);
    }
  }, [startDate, form]);

  const { data: mainProductOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.PRODUCT,
  });
  const { data: customerOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER,
  });
  const { data: subProductOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.SUB_PRODUCT,
  });
  const { data: deploymentOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.DEPLOYMENT_METHOD,
  });

  return [
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã',
      name: 'code',
      inputProps: {
        placeholder: 'Nhập...',
        disabled: true,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên',
      name: 'name',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Nhập...',
        disabled: isDisabled,
        maxLength: 100,
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày bắt đầu',
      name: 'startDate',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: 'date-picker-campaign',
        disabled: isDisabled,
        maxDate: endDate ? dayjs(endDate) : undefined,
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày kết thúc',
      name: 'endDate',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: 'date-picker-campaign',
        disabled: isDisabled,
        minDate: startDate ? dayjs(startDate) : dayjs(),
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Trạng thái',
      name: 'status',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: STATUS_CAMPAIGN_OPTIONS,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Phương thức triển khai',
      name: 'deploymentMethod',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: deploymentOptions,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Danh mục khách hàng',
      name: 'customer',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: customerOptions,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Sản phẩm chính',
      name: 'mainProduct',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: mainProductOptions,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Sản phẩm phụ',
      name: 'subProduct',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: subProductOptions,
      },
    },
    {
      type: INPUT_TYPE.TEXT_AREA,
      label: 'Ghi chú',
      name: 'note',
      colProps: {
        span: 12,
      },
      inputProps: {
        placeholder: 'Nhập...',
        maxLength: 1000,
        disabled: isDisabled,
        className: 'w-full no-resize',
      },
    },
    {
      type: INPUT_TYPE.TEXT_AREA,
      label: 'Phạm vi triển khai',
      name: 'scope',
      colProps: {
        span: 12,
      },
      inputProps: {
        placeholder: 'Nhập...',
        maxLength: 1000,
        disabled: isDisabled,
        className: 'w-full no-resize',
      },
    },
  ];
};

export default useCategoryFormItems;
