import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { useQueryCampaignList, useQueryCategoryList } from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import type { TCampaignSearchForm } from 'src/dtos/campaign';

interface ICampaignSearch {
  initialValues: TCampaignSearchForm;
  onSearch: (values: TCampaignSearchForm) => void;
  onClearAll: () => void;
  onCreate?: () => void;
}

const CampaignSearch: React.FC<ICampaignSearch> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const { isAdmin, isCampaignManager } = useProfile();

  const { data: categoryList } = useQueryCategoryList();
  const { data: campaignList } = useQueryCampaignList();

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryCode',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: categoryList,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Campaign',
        name: 'codeCampaign',
        inputProps: {
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
          options: campaignList,
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
          minDate: dayjs(),
          onChange: (newValue) => setStartDate(newValue),
        },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày kết thúc',
        name: 'endDate',
        inputProps: {
          placeholder: 'Chọn ngày...',
          className: 'date-picker-campaign',
          minDate: startDate ? dayjs(startDate) : dayjs(),
        },
      },
    ];
    return formItems;
  }, [categoryList, campaignList, startDate]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
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
