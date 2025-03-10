import { OSearchBaseForm } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { useQueryCategoryList } from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { handleResetFields } from '@utils/formHelper';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import type { TCampaignSearchForm } from 'src/dtos/campaign';

const CampaignSearch: React.FC<CBaseSearch<TCampaignSearchForm>> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);
  const { isAdmin, isCampaignManager } = useProfile();

  const { data: categoryList } = useQueryCategoryList(true);

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryId',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: categoryList,
          onChange: () => handleResetFields(['codeCampaign'], form),
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã campaign',
        name: 'campaignCode',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 50,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên campaign',
        name: 'campaignName',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 50,
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
    ];
    return formItems;
  }, [categoryList, startDate, form, endDate]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate
          ? dayjs(initialValues.startDate, DATE_SLASH_FORMAT_DDMMYYYY)
          : null,
        endDate: initialValues.endDate
          ? dayjs(initialValues.endDate, DATE_SLASH_FORMAT_DDMMYYYY)
          : null,
      });
    }
  }, [initialValues, form]);

  return (
    <OSearchBaseForm<TCampaignSearchForm>
      items={items}
      form={form}
      onSearch={onSearch}
      onClearAll={onClearAll}
      onCreate={isAdmin || isCampaignManager ? onCreate : undefined}
    />
  );
};

export default CampaignSearch;
