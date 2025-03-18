import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { useForm } from 'antd/lib/form/Form';
import {
  useCampaignDetailViewQuery,
  useCampaignScriptQuery,
} from '@hooks/queries';
import type { TCampaignDetailDTO, TId } from '@dtos';
import CampaignDetailSearch from './components/CampaignDetailSearch';
import CampaignDetailTable, {
  type TCampaignDetaillRecord,
} from './components/CampaignDetailTable';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Quay lại',
} as const;

const ManagerCampaignDetail: React.FC = () => {
  const { id: campaignId } = useParams<TId>();

  const navigate = useNavigate();
  const [form] = useForm();

  const { data: campaignDetailRes } = useCampaignDetailViewQuery({
    id: campaignId ?? '',
  });

  const { data: campaignScriptQuery } = useCampaignScriptQuery({
    id: campaignId ?? '',
  });

  const dataSourcesDetail: Partial<TCampaignDetailDTO> = useMemo(
    () => campaignDetailRes?.data ?? {},
    [campaignDetailRes],
  );

  const dataSourcesTarget: Partial<TCampaignDetailDTO> = useMemo(() => {
    const safeTargets = Array.isArray(campaignDetailRes?.data?.targets)
      ? [...campaignDetailRes.data.targets]
      : [];

    return {
      ...campaignDetailRes?.data,
      targets: safeTargets,
    };
  }, [campaignDetailRes]);

  const dataSources: TCampaignDetaillRecord[] = useMemo(() => {
    const safeData = Array.isArray(campaignScriptQuery?.data?.content)
      ? campaignScriptQuery.data.content
      : [];

    return safeData;
  }, [campaignScriptQuery]);

  const handleBack = () => {
    navigate(ROUTES.CAMPAIGN.LIST);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        Chi tiết Campaign
      </Title>
      <CampaignDetailSearch
        initialValues={dataSourcesDetail}
        isDisabled
        dataSource={dataSourcesTarget.targets}
        form={form}
      />
      <div className="mb-24" />
      <CampaignDetailTable dataSource={dataSources} />
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 px-4">
        <Flex justify="between" className="py-4 w-full px-6" gap="middle">
          <AButton
            onClick={handleBack}
            type="primary"
            variant="filled"
            data-testid="back-button"
          >
            {BUTTON_TEXT.BACK}
          </AButton>
        </Flex>
      </div>
    </div>
  );
};

export default ManagerCampaignDetail;
