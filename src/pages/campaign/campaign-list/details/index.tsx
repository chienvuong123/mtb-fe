import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { useForm } from 'antd/lib/form/Form';
import { useCampaignDetailViewQuery } from '@hooks/queries';
import type { CampaignDTO, TCampaignDetailDTO, TId } from '@dtos';
import useUrlParams from '@hooks/useUrlParams';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { TBaseTableSort } from '@types';
import { CampaignDetailForm, CampaignTargetDetailTable } from './components';
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
  const { sort, setFilters } = useUrlParams<Partial<CampaignDTO>>();

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

  const handleSort = ({ direction, field }: TBaseTableSort) => {
    setFilters({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

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
        <CampaignDetailForm
          initialValues={dataSourcesDetail}
          isDisabled
          form={form}
          mode="view"
        />
        <CampaignTargetDetailTable
          dataSource={campaignDetailData.targets || []}
          hideAddButton
          onSort={handleSort}
          sortDirection={sort}
        />
      </Flex>
      <div className="mb-24" />
      <CampaignApproachDetailTable
        dataSource={campaignDetailData.campaignScript || []}
        hideAddButton
        onSort={handleSort}
        sortDirection={sort}
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
