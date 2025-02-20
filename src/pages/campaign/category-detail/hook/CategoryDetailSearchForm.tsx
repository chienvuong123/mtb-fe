import { INPUT_TYPE, type TFormItem } from '@types';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';

interface ICategoryFormItemsProps {
  isDisabled: boolean;
}

export const useCategoryFormItems = ({
  isDisabled,
}: ICategoryFormItemsProps): TFormItem[] => {
  return [
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã',
      name: 'code',
      inputProps: {
        placeholder: 'Nhập...',
        disabled: isDisabled,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên',
      name: 'name',
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
      label: 'Main Product',
      name: 'mainProduct',
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
      label: 'Sub Product',
      name: 'subProduct',
      inputProps: {
        placeholder: 'Chọn...',
        showSearch: true,
        filterOption: true,
        disabled: isDisabled,
        options: MOCK_CUSTOMER_OPTIONS,
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
