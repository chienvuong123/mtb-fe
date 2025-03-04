import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EStatusCampaign, STATUS_CAMPAIGN_OBJECT } from '@constants/masterData';
import type { OrderDTO } from '@dtos';
import { useProfile } from '@stores';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useState, type Key } from 'react';
import type { CampaignDTO } from 'src/dtos/campaign';

export type TCampaignRecord = Partial<CampaignDTO>;

interface ICampaignTable {
  dataSource: TCampaignRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onEdit: ITable<TCampaignRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

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
    ellipsis: true,
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
    render: (value: EStatusCampaign) => STATUS_CAMPAIGN_OBJECT[value] ?? null,
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
    title: 'Khách hàng tiếp cận',
    dataIndex: 'totalCustomerApproach',
    minWidth: 118,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Khách hàng tham gia',
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
  onEdit,
  onDelete,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { isAdmin, isCampaignManager } = useProfile();

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TCampaignRecord>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      scroll={{ x: 1575 }}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCampaignRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default CampaignTable;
