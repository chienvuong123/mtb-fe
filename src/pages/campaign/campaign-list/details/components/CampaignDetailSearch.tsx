import { OFormDetail } from '@components/organisms';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { useCampaignFormItems } from '../hooks';

interface ICampaignDetailSearch {
  initialValues?: Partial<TCampaignDetailDTO>;
  isDisabled: boolean;
  form?: FormInstance;
}

const CampaignDetailSearch: React.FC<ICampaignDetailSearch> = ({
  initialValues,
  isDisabled,
  form,
}) => {
  const items = useCampaignFormItems({
    isDisabled,
  });

  useEffect(() => {
    if (initialValues && form) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjs(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate)
          : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <div>
      {form && (
        <OFormDetail<TCampaignDetailSearchForm> items={items} form={form} />
      )}
    </div>
  );
};

export default CampaignDetailSearch;
