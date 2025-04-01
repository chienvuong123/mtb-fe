import { OBaseForm } from '@components/organisms';
import React from 'react';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { CAMPAIGN_KEY } from '@hooks/queries';
import type { TFormType } from '@types';
import { useCampaignFormItems } from '../../details/hooks';
import '../../style.scss';

interface ICampaignInsertForm {
  initialValues?: Partial<TCampaignDetailDTO>;
  isDisabled: boolean;
  onShowForm?: () => void;
  form?: FormInstance;
  mode: TFormType;
}

const CampaignInsertForm: React.FC<ICampaignInsertForm> = ({
  initialValues,
  isDisabled,
  onShowForm,
  form,
  mode,
}) => {
  const items = useCampaignFormItems({
    isDisabled,
    onShowForm,
    form,
    initialValues,
    mode,
  });

  return (
    <div className="campaign">
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
