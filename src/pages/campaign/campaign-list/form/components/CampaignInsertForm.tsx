import { OBaseForm } from '@components/organisms';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { CAMPAIGN_KEY } from '@hooks/queries';
import { useCampaignFormItems } from '../../details/hooks';
import '../../index.scss';

interface ICampaignInsertForm {
  initialValues?: Partial<TCampaignDetailDTO>;
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
  isNoEdit?: boolean;
}

const CampaignInsertForm: React.FC<ICampaignInsertForm> = ({
  initialValues,
  isDisabled,
  onShowForm,
  form,
  isNoEdit,
}) => {
  const items = useCampaignFormItems({
    isDisabled,
    onShowForm: onShowForm || (() => {}),
    form,
    isNoEdit,
    initialValues,
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
        />
      )}
    </div>
  );
};

export default CampaignInsertForm;
