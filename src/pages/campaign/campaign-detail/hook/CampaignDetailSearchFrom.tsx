import { INPUT_TYPE, type TFormItem } from '@types';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';
import { useQueryCategoryList } from '@hooks/queries';

interface ICampaignFormItemsProps {
  isDisabled: boolean;
  onShowForm: () => void;
}

export const useCampaignFormItems = ({
  isDisabled,
  onShowForm,
}: ICampaignFormItemsProps): TFormItem[] => {
  const { data: categoryList } = useQueryCategoryList(true);

  return [
    {
      type: INPUT_TYPE.SELECT,
      label: 'Category',
      name: 'categoryName',
      onAddClick: isDisabled ? undefined : onShowForm,
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        disabled: isDisabled,
        filterOption: true,
        options: categoryList,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã Campaign',
      name: 'codeCampaign',
      inputProps: {
        placeholder: 'Chọn...',
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên Campaign',
      name: 'nameCampaign',
      inputProps: {
        placeholder: 'Chọn...',
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày bắt đầu',
      name: 'startDate',
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: 'date-picker-campaign',
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày kết thúc',
      name: 'endDate',
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: 'date-picker-campaign',
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Chi nhánh triển khai',
      name: 'branches',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Loại chiến dịch',
      name: 'campaignType',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
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
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Phương thức triển khai',
      name: 'implementationMethod',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Phụ trách triển khai',
      name: 'supervisor',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
      },
    },
    {
      type: INPUT_TYPE.SELECT,
      label: 'Danh mục khách hàng',
      name: 'customerCatalog',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
      },
    },
    { type: INPUT_TYPE.BLANK },
    { type: INPUT_TYPE.BLANK },
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
        showCount: {
          formatter: ({ count, maxLength }) => (
            <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
              ({count}/{maxLength})
            </span>
          ),
        },
        className: 'w-full no-resize',
      },
    },
    {
      type: INPUT_TYPE.TEXT_AREA,
      label: 'Phạm vi triển khai',
      name: 'scopeImplementation',
      colProps: {
        span: 12,
      },
      inputProps: {
        placeholder: 'Nhập...',
        maxLength: 1000,
        disabled: isDisabled,
        showCount: {
          formatter: ({ count, maxLength }) => (
            <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
              ({count}/{maxLength})
            </span>
          ),
        },
        className: 'w-full no-resize',
      },
    },
  ];
};
