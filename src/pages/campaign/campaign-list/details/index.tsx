import Title from 'antd/lib/typography/Title';
import { Divider, Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { useForm } from 'antd/lib/form/Form';
import { useCampaignDetailViewQuery } from '@hooks/queries';
import type { TCampaignDetailDTO, TId } from '@dtos';
import CampaignDetailSearch from './components/CampaignDetailSearch';
import { CampaignTargetDetailTable } from './components';
import CampaignApproachDetailTable from './components/CampaignApproachDetailTable';

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

  const dataSourcesDetail: Partial<TCampaignDetailDTO> = useMemo(
    () => campaignDetailRes?.data ?? {},
    [campaignDetailRes],
  );

  const campaignDetailData: Partial<TCampaignDetailDTO> = useMemo(
    () => ({
      ...campaignDetailRes?.data,
      targets: campaignDetailRes?.data?.targets || [],
      campaignScript: campaignDetailRes?.data?.campaignScript || [],
    }),
    [campaignDetailRes],
  );

  const handleBack = () => {
    navigate(ROUTES.CAMPAIGN.LIST);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        Chi tiết Campaign
      </Title>
      <Flex
        vertical
        className="no-resize border-2 rounded-8 border-gray-border bg-white"
      >
        <CampaignDetailSearch
          initialValues={dataSourcesDetail}
          isDisabled
          form={form}
        />
        <Divider className="border-t mx-40" />
        <CampaignTargetDetailTable
          dataSource={campaignDetailData.targets || []}
          hideAddButton
        />
      </Flex>
      <div className="mb-24" />
      <CampaignApproachDetailTable
        dataSource={campaignDetailData.campaignScript || []}
        hideAddButton
      />
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
