import { OTable, type ITable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { ColumnType } from 'antd/es/table';
import Title from 'antd/lib/typography/Title';
import React, { useState, type Key } from 'react';
import { useParams } from 'react-router-dom';
import type { CampaignTargetDTO, TId } from '@dtos';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCampaignTargetDetailTableRecord = Partial<CampaignTargetDTO>;

interface ICampaignTargetDetailTable {
  dataSource: CampaignTargetDTO[];
  onEdit: ITable<TCampaignTargetDetailTableRecord>['onEdit'];
  onDelete?: (id: string) => void;
  onShowTargetForm?: () => void;
}

const columns: ColumnType<TCampaignTargetDetailTableRecord>[] = [
  {
    title: 'Tên mục tiêu',
    dataIndex: 'name',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Giá trị mục tiêu',
    dataIndex: 'value',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignTargetDetailTable: React.FC<ICampaignTargetDetailTable> = ({
  dataSource,
  onDelete,
  onEdit,
  onShowTargetForm,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const deleteRecord = (key: Key) => {
    if (onDelete) {
      onDelete(key as string);
    }
  };

  const { id: campaignId } = useParams<TId>();

  return (
    <div className="px-40 py-28">
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Mục tiêu
        </Title>
        {!campaignId && (
          <AButton
            onClick={onShowTargetForm}
            type="primary"
            variant="filled"
            className="ml-auto"
          >
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<TCampaignTargetDetailTableRecord>
        rowKey="id"
        columns={columns}
        data={dataSource}
        onEdit={onEdit}
        onDeleteRow={deleteRecord}
        isCheckboxHidden={!!campaignId}
        hideActions={!!campaignId}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        scroll={{ x: 1575, y: undefined }}
      />
    </div>
  );
};

export default CampaignTargetDetailTable;
