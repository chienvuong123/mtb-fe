import { OBaseForm } from '@components/organisms';
import React from 'react';
import type { FormInstance } from 'antd/lib';
import type { TCampaignDetailDTO, TCampaignDetailSearchForm } from '@dtos';
import { CAMPAIGN_KEY } from '@hooks/queries';
import type { TFormType } from '@types';
import { useCampaignFormItems } from '../hooks';

import '../../style.scss';

interface ICampaignDetailForm {
  initialValues?: Partial<TCampaignDetailDTO>;
  isDisabled: boolean;
  form?: FormInstance;
  mode: TFormType;
}

const CampaignDetailSearch: React.FC<ICampaignDetailForm> = ({
  initialValues,
  isDisabled,
  form,
  mode,
}) => {
  const items = useCampaignFormItems({
    mode,
    isDisabled,
    initialValues,
    form,
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
          isViewMode={isDisabled}
        />
      )}
    </div>
  );
};

export default CampaignDetailSearch;
