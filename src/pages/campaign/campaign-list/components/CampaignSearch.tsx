import { OSearchBaseForm } from '@components/organisms';
import { STATUS_CAMPAIGN_OPTIONS } from '@constants/masterData';
import { useQueryCategoryList } from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type TFormItem } from '@types';
import { handleResetFields } from '@utils/formHelper';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
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
  const startDate = useWatch('startDate', form);
  const { isAdmin, isCampaignManager } = useProfile();

  const { data: categoryList } = useQueryCategoryList(true);

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
          onChange: () => handleResetFields(['codeCampaign'], form),
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Campaign',
        name: 'campaignCode',
        inputProps: {
          placeholder: 'Nhập...',
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Campaign',
        name: 'campaignName',
        inputProps: {
          placeholder: 'Nhập...',
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
  }, [categoryList, startDate, form]);

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
