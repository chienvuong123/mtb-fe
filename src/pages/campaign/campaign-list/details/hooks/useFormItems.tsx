import { INPUT_TYPE, type TFormItem, type TFormType } from '@types';
import {
  EStatusCampaign,
  STATUS_CAMPAIGN_OPTIONS,
} from '@constants/masterData';
import {
  useCampaignManagerListQuery,
  useCategoryOptionsListQuery,
  useQueryCategoryList,
} from '@hooks/queries';
import { CategoryType } from '@dtos';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO } from '@dtos';
import { useCampaignFormHelper } from '@pages/campaign/hook';

interface ICampaignFormItemsProps {
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
  initialValues?: Partial<TCampaignDetailDTO>;
  mode: TFormType;
}

const useCampaignFormItems = ({
  isDisabled,
  onShowForm,
  form,
  initialValues,
  mode,
}: ICampaignFormItemsProps): TFormItem[] => {
  const { handleGenerateStatus, maxStartDate, minEndDate, minStartDate } =
    useCampaignFormHelper<Partial<TCampaignDetailDTO>>({
      form,
      initialValues,
      mode,
    });

  const { data: categoryList } = useQueryCategoryList(true);

  const { data: campaignManagementList } = useCampaignManagerListQuery(
    {
      page: { pageNum: 1, pageSize: 1000 }, // TODO: remove this
    },
    true,
  );
  const { data: deploymentOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.DEPLOYMENT_METHOD,
  });

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
            disabled: true,
          },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Tên Campaign',
          name: 'name',
          inputProps: {
            placeholder: 'Nhập...',
            maxLength: 100,
          },
          required: true,
          rules: [{ required: true }],
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
          label: 'Phụ trách triển khai',
          name: 'campaignManagerId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: campaignManagementList,
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
            className: 'date-picker-campaign',
            disabled:
              form?.getFieldValue('status') === EStatusCampaign.INPROGRESS,
            minDate: minStartDate,
            maxDate: maxStartDate,
            onCalendarChange: (date) =>
              handleGenerateStatus({
                startDate: date as Dayjs,
                endDate: form?.getFieldValue('endDate'),
              }),
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
            minDate: minEndDate,
            onCalendarChange: (date) =>
              handleGenerateStatus({
                startDate: form?.getFieldValue('startDate'),
                endDate: date as Dayjs,
              }),
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
            disabled: true,
          },
          required: true,
          rules: [{ required: true }],
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
          },
        },
      ] as TFormItem[],

    [
      isDisabled,
      onShowForm,
      categoryList,
      campaignManagementList,
      handleGenerateStatus,
      form,
      minStartDate,
      minEndDate,
      maxStartDate,
      deploymentOptions,
    ],
  );
};

export default useCampaignFormItems;
