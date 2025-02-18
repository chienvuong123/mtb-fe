import { OTable, type ITable, type TTableKey } from '@components/organisms';
import type { TMediaRecord } from '@pages/category/media-category/components/MediaTable';
import type { ColumnType } from 'antd/es/table';
import Title from 'antd/lib/typography/Title';
import React, { useMemo, type Key } from 'react';
import type { CampaignTargetDTO } from 'src/dtos/campaign-detail';

export type TCampaignTargetDetailTableRecord = TTableKey &
  Partial<CampaignTargetDTO>;

interface ICampaignTargetDetailTable {
  dataSource?: CampaignTargetDTO[];
  onEdit: ITable<TMediaRecord>['onEdit'];
  onDelete: (id: string) => void;
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
}) => {
  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

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
      <Title level={4} className="mb-24">
        Mục tiêu
      </Title>
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
