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
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';

export type TCategoryTableRecord = Partial<ManagerCategoryDTO>;

interface ICategoryTable {
  dataSource: TCategoryTableRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onEdit: ITable<TCategoryTableRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TCategoryTableRecord>[] = [
  {
    title: 'Mã',
    dataIndex: 'code',
    minWidth: 76,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Category',
    dataIndex: 'name',
    minWidth: 199,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Main Product',
    dataIndex: 'mainProductName',
    minWidth: 156,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Sub Product',
    dataIndex: 'subProductName',
    minWidth: 200,
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
    title: 'KH tiếp cận',
    dataIndex: 'participatingCustomers',
    minWidth: 118,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'KH tham gia',
    dataIndex: 'totalCustomers',
    minWidth: 111,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CategoryTable: React.FC<ICategoryTable> = ({
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
    <OTable<TCategoryTableRecord>
      isCheckboxHidden
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCategoryTableRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default CategoryTable;
