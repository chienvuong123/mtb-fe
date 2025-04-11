import { OTable } from '@components/organisms';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/lib/table';
import { useState, type FC } from 'react';
import type { GroupCustomerDTO } from '@dtos';

const columns: ColumnType<GroupCustomerDTO>[] = [
  {
    title: 'Mã Category',
    dataIndex: ['campaign', 'categoryCampaign', 'code'],
    minWidth: 104,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Category',
    dataIndex: ['campaign', 'categoryCampaign', 'name'],
    minWidth: 213,
    showSorterTooltip: false,
  },
  {
    title: 'Mã Campaign',
    dataIndex: ['campaign', 'code'],
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: ['campaign', 'name'],
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Mã nhóm khách',
    dataIndex: 'code',
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Tên nhóm khách',
    dataIndex: 'name',
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Số lượng',
    dataIndex: 'customerQuantity',
    minWidth: 164,
    showSorterTooltip: false,
  },
];

const GroupCustomerTable: FC<CBaseTable<GroupCustomerDTO>> = ({
  dataSource,
  paginations,
  sortDirection,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <OTable<GroupCustomerDTO>
      isCheckboxHidden
      rowKey="id"
      columns={columns}
      data={dataSource}
      isShowDeleteBtn={false}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      scroll={{ x: 1300 }}
    />
  );
};

export default GroupCustomerTable;
