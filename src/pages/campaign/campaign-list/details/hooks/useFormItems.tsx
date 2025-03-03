import { INPUT_TYPE, type TFormItem } from '@types';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';
import { useQueryCategoryList } from '@hooks/queries';
import clsx from 'clsx';

interface ICampaignFormItemsProps {
  isDisabled: boolean;
  onShowForm: () => void;
}

const useCampaignFormItems = ({
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
        className: clsx({ 'pointer-events-none': isDisabled }),
        filterOption: true,
        options: categoryList,
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã Campaign',
      name: 'code',
      inputProps: {
        placeholder: 'Chọn...',
        className: clsx({ 'pointer-events-none': isDisabled }),
      },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên Campaign',
      name: 'name',
      inputProps: {
        placeholder: 'Chọn...',
        className: clsx({ 'pointer-events-none': isDisabled }),
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày bắt đầu',
      name: 'startDate',
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: clsx('date-picker-campaign', {
          'pointer-events-none': isDisabled,
        }),
      },
    },
    {
      type: INPUT_TYPE.DATE_PICKER,
      label: 'Ngày kết thúc',
      name: 'endDate',
      inputProps: {
        placeholder: 'Chọn ngày...',
        className: clsx('date-picker-campaign', {
          'pointer-events-none': isDisabled,
        }),
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
        className: clsx({ 'pointer-events-none': isDisabled }),
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
        className: clsx({ 'pointer-events-none': isDisabled }),
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
        className: clsx({ 'pointer-events-none': isDisabled }),
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
        className: clsx({ 'pointer-events-none w-full no-resize': isDisabled }),
        showCount: {
          formatter: ({ count, maxLength }) => (
            <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
              ({count}/{maxLength})
            </span>
          ),
        },
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
        className: clsx({ 'pointer-events-none w-full no-resize': isDisabled }),
        showCount: {
          formatter: ({ count, maxLength }) => (
            <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
              ({count}/{maxLength})
            </span>
          ),
        },
      },
    },
  ];
};

export default useCampaignFormItems;
