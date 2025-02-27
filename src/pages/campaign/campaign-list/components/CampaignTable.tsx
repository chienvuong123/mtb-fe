import { ATag } from '@components/atoms';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { ESalesCampaign } from '@constants/masterData';
import type { OrderDTO } from '@dtos';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useState, type Key, type ReactNode } from 'react';
import type { CampaignDTO } from 'src/dtos/campaign';

export type TCampaignRecord = Partial<CampaignDTO>;

interface ICampaignTable {
  dataSource: TCampaignRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onCreate: ITable<TCampaignRecord>['onCreate'];
  onEdit: ITable<TCampaignRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const statusObject: Record<ESalesCampaign, ReactNode> = {
  [ESalesCampaign.DISBURSED]: <ATag color="green">Đang triển khai</ATag>,
  [ESalesCampaign.OPPORTUNITY_TO_SELL]: <ATag color="blue">Chưa bắt đầu</ATag>,
  [ESalesCampaign.CANCELED]: <ATag color="red">Kết thúc</ATag>,
};

const columns: ColumnType<TCampaignRecord>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: 'code',
    minWidth: 76,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'name',
    minWidth: 185,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Mã Category',
    dataIndex: 'categoryCode',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Category',
    dataIndex: 'categoryName',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 172,
    sorter: true,
    showSorterTooltip: false,
    render: (value: ESalesCampaign) => statusObject[value] ?? null,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDate',
    minWidth: 139,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endDate',
    minWidth: 139,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'KH tiếp cận',
    dataIndex: 'totalCustomerApproach',
    minWidth: 118,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'KH tham gia',
    dataIndex: 'totalCustomerParticipating',
    minWidth: 111,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignTable: React.FC<ICampaignTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onCreate,
  onEdit,
  onDelete,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TCampaignRecord>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCampaignRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default CampaignTable;
