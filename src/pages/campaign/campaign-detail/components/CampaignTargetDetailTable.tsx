import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { ColumnType } from 'antd/es/table';
import Title from 'antd/lib/typography/Title';
import React, { useMemo, type Key } from 'react';
import type { CampaignTargetDTO } from 'src/dtos/campaign-detail';
import { useParams } from 'react-router-dom';
import type { TId } from '@dtos';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCampaignTargetDetailTableRecord = TTableKey &
  Partial<CampaignTargetDTO>;

interface ICampaignTargetDetailTable {
  dataSource?: CampaignTargetDTO[];
  onEdit: ITable<TCampaignTargetDetailTableRecord>['onEdit'];
  onDelete: (id: string) => void;
  onShowTargetForm: () => void;
}

const columns: ColumnType<TCampaignTargetDetailTableRecord>[] = [
  {
    title: 'Mục tiêu',
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
  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  const { id: campaignId } = useParams<TId>();

  const mappedDataSource = useMemo(
    () =>
      dataSource?.map((item) => ({
        ...item,
        key: item.id as string,
      })) || [],
    [dataSource],
  );

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
        columns={columns}
        data={mappedDataSource}
        onEdit={onEdit}
        onDeleteRow={deleteRecord}
        isCheckboxHidden
      />
    </div>
  );
};

export default CampaignTargetDetailTable;
