import { OBaseForm } from '@components/organisms';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { CAMPAIGN_KEY } from '@hooks/queries';
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
    <div className="campaign form-wrapper">
      {form && (
        <OBaseForm<TCampaignDetailSearchForm>
          mutationKey={CAMPAIGN_KEY}
          items={items}
          form={form}
          cancelBtnProps={{ hidden: true }}
          saveBtnProps={{ hidden: true }}
          isViewMode={isDisabled}
        />
      )}
    </div>
  );
};

export default CampaignDetailSearch;
