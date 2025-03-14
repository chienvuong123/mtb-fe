import { OFormDetail } from '@components/organisms';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { useCampaignFormItems } from '../../details/hooks';

interface ICampaignInsertForm {
  initialValues?: Partial<TCampaignDetailDTO>;
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
}

const CampaignInsertForm: React.FC<ICampaignInsertForm> = ({
  initialValues,
  isDisabled,
  onShowForm,
  form,
}) => {
  const items = useCampaignFormItems({
    isDisabled,
    onShowForm: onShowForm || (() => {}),
    form,
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

export default CampaignInsertForm;
