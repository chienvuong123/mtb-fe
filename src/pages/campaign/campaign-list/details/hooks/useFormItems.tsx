import { INPUT_TYPE, type TFormItem } from '@types';
import {
  STATUS_CAMPAIGN_OPTIONS,
  EStatusCampaign,
  EStatus,
  ERole,
} from '@constants/masterData';
import {
  useAccountManagementSearchQuery,
  useCategoryOptionsListQuery,
  useQueryCategoryList,
} from '@hooks/queries';
import clsx from 'clsx';
import { CategoryType } from '@dtos';
import { useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO } from '@dtos';

interface ICampaignFormItemsProps {
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
  isNoEdit?: boolean;
  initialValues?: Partial<TCampaignDetailDTO>;
}

const useCampaignFormItems = ({
  isDisabled,
  onShowForm,
  form,
  isNoEdit,
  initialValues,
}: ICampaignFormItemsProps): TFormItem[] => {
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);

  useEffect(() => {
    if (!form) return;

    const today = dayjs().startOf('day');
    const start = startDate ? dayjs(startDate).startOf('day') : null;
    const end = endDate ? dayjs(endDate).startOf('day') : null;

    let status: EStatusCampaign | undefined;

    if (!start || !end) {
      status = undefined;
    } else if (today.isBefore(start)) {
      status = EStatusCampaign.PENDING;
    } else if (today.isAfter(end)) {
      status = EStatusCampaign.ENDED;
    } else {
      status = EStatusCampaign.INPROGRESS;
    }
    form.setFieldValue('status', status);
  }, [startDate, endDate, form]);

  const { data: categoryList } = useQueryCategoryList(true);
  const { data: branchesOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.BRANCHES,
  });
  const { data: accountManagementList } = useAccountManagementSearchQuery({
    page: { pageNum: 1, pageSize: 1000 }, // TODO: remove this
  });

  const personalInChargeOptions = useMemo(() => {
    return (
      accountManagementList?.data?.content
        ?.filter(
          (item) =>
            item.status === EStatus.ACTIVE && item.role !== ERole.SELLER,
        )
        ?.map((item) => ({
          label: `${item.username} - ${item.fullName}`,
          value: item.id,
        })) || []
    );
  }, [accountManagementList]);

  const isCreateMode = useMemo(() => {
    return !initialValues || Object.keys(initialValues).length === 0;
  }, [initialValues]);

  return useMemo(
    () =>
      [
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
            options: personalInChargeOptions,
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
            minDate: isCreateMode ? dayjs().startOf('day') : undefined,
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
            minDate: startDate ? dayjs(startDate) : undefined,
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
            className: clsx({ 'pointer-events-none': isDisabled || isNoEdit }),
            disabled: true,
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
      ] as TFormItem[],

    [
      isDisabled,
      onShowForm,
      categoryList,
      branchesOptions,
      personalInChargeOptions,
      startDate,
      endDate,
      isNoEdit,
      isCreateMode,
    ],
  );
};

export default useCampaignFormItems;
