import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type TTableKey } from '@components/organisms';
import type { OrderDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import React, { useState } from 'react';
import type { TCampaignDetailDTO } from 'src/dtos/campaign-detail';

export type TCampaignDetaillRecord = TTableKey & Partial<TCampaignDetailDTO>;

interface ICampaignDetailTable {
  dataSource: TCampaignDetaillRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TCampaignDetaillRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Loại chiến dịch',
    dataIndex: 'typeCampaign',
    minWidth: 238,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phương thức tiếp cận',
    dataIndex: 'name',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'categoryCode',
    minWidth: 428,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Kịch bản tiếp theo',
    dataIndex: 'categoryCode',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignDetailTable: React.FC<ICampaignDetailTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <OTable<TCampaignDetaillRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCampaignDetaillRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default CampaignDetailTable;
