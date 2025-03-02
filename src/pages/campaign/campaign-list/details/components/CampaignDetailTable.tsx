import { OTable, type ITable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { TId } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import React, { useState } from 'react';
import type { CampaignScriptDTO } from 'src/dtos/campaign-detail';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCampaignDetaillRecord = Partial<CampaignScriptDTO>;

interface ICampaignDetailTable {
  dataSource: TCampaignDetaillRecord[];
  onEdit?: ITable<TCampaignDetaillRecord>['onEdit'];
  onShowApproachForm?: () => void;
}

const columns: ColumnType<TCampaignDetaillRecord>[] = [
  {
    title: 'Phương thức tiếp cận',
    dataIndex: 'approach',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    minWidth: 428,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Kịch bản tiếp theo',
    dataIndex: 'script',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignDetailTable: React.FC<ICampaignDetailTable> = ({
  dataSource,
  onEdit,
  onShowApproachForm,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { id: campaignId } = useParams<TId>();

  return (
    <div>
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Kế hoạch tiếp cận
        </Title>
        {!campaignId && (
          <AButton
            onClick={onShowApproachForm}
            type="primary"
            variant="filled"
            className="ml-auto"
          >
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<TCampaignDetaillRecord>
        rowKey="id"
        columns={columns}
        data={dataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CampaignDetailTable;
