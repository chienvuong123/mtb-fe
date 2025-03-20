import { INPUT_TYPE, type TFormItem } from '@types';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import {
  useCategoryOptionsListQuery,
  useQueryCategoryList,
} from '@hooks/queries';
import clsx from 'clsx';
import { CategoryType } from '@dtos';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import type { FormInstance } from 'antd/lib';

interface ICampaignFormItemsProps {
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
}

const useCampaignFormItems = ({
  isDisabled,
  onShowForm,
  form,
}: ICampaignFormItemsProps): TFormItem[] => {
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: branchesOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.BRANCHES,
  });
  const { data: deploymentOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.DEPLOYMENT_METHOD,
  });

  return useMemo(
    () => [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryId',
        surfixButton: isDisabled ? undefined : { onClick: onShowForm },
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          className: clsx({ 'pointer-events-none': isDisabled }),
          filterOption: true,
          options: categoryList,
        },
        required: true,
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã Campaign',
        name: 'code',
        inputProps: {
          placeholder: 'Nhập...',
          className: clsx({ 'pointer-events-none': isDisabled }),
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Campaign',
        name: 'name',
        inputProps: {
          placeholder: 'Nhập...',
          className: clsx({ 'pointer-events-none': isDisabled }),
          maxLength: 100,
        },
        required: true,
        rules: [{ required: true }],
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
          options: branchesOptions,
        },
        required: true,
        rules: [{ required: true }],
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
          options: deploymentOptions,
        },
        required: true,
        rules: [{ required: true }],
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
          maxDate: endDate ? dayjs(endDate) : undefined,
        },
        required: true,
        rules: [{ required: true }],
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
          minDate: startDate,
        },
        required: true,
        rules: [{ required: true }],
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
        required: true,
        rules: [{ required: true }],
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
          className: clsx({
            'pointer-events-none w-full no-resize': isDisabled,
          }),
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
          className: clsx({
            'pointer-events-none w-full no-resize': isDisabled,
          }),
        },
      },
    ],
    [
      isDisabled,
      onShowForm,
      categoryList,
      branchesOptions,
      deploymentOptions,
      startDate,
      endDate,
    ],
  );
};

export default useCampaignFormItems;
