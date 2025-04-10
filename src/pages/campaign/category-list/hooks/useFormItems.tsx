import { INPUT_TYPE, type TFormItem } from '@types';
import { Dayjs } from 'dayjs';
import {
  EStatusCampaign,
  STATUS_CAMPAIGN_OPTIONS,
} from '@constants/masterData';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import type { FormInstance } from 'antd';
import { useCampaignFormHelper } from '@pages/campaign/hook';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import type { ICategoryInsertForm } from '../components/CategoryInsert';

interface ICategoryFormItemsProps
  extends Pick<ICategoryInsertForm, 'mode' | 'initialValues'> {
  isDisabled: boolean;
  form: FormInstance;
}

const useCategoryFormItems = ({
  isDisabled,
  form,
  mode,
  initialValues,
}: ICategoryFormItemsProps): TFormItem[] => {
  const { handleGenerateStatus, maxStartDate, minEndDate, minStartDate } =
    useCampaignFormHelper<Partial<ManagerCategoryDTO>>({
      form,
      initialValues,
      mode,
    });

  const { data: mainProductOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.PRODUCT,
  });
  const { data: customerOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMERS,
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
        disabled:
          isDisabled ||
          form.getFieldValue('status') === EStatusCampaign.INPROGRESS,
        minDate: minStartDate,
        maxDate: maxStartDate,
        onCalendarChange: (date) =>
          handleGenerateStatus({
            startDate: date as Dayjs,
            endDate: form.getFieldValue('endDate'),
          }),
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
        minDate: minEndDate,
        onCalendarChange: (date) =>
          handleGenerateStatus({
            startDate: form.getFieldValue('startDate'),
            endDate: date as Dayjs,
          }),
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Trạng thái',
      name: 'status',
      required: true,
      rules: [{ required: true }],
      inputProps: {
        suffixIcon: null,
        disabled: true,
        options: STATUS_CAMPAIGN_OPTIONS,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Danh mục khách hàng',
      name: 'customer',
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
        options: mainProductOptions,
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
