import { OTable } from '@components/organisms';
import type { CBaseTable } from '@types';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import { useState, type FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

const columns: ColumnType<GroupCustomerDTO>[] = [
  {
    title: 'Mã Category',
    dataIndex: 'categoryCode',
    minWidth: 104,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Category',
    dataIndex: 'nameCategory',
    minWidth: 213,
    showSorterTooltip: false,
  },
  {
    title: 'Mã Campaign',
    dataIndex: 'campaign',
    minWidth: 164,
    showSorterTooltip: false,
    render: (campaign) => campaign?.code || '',
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'nameCampaign',
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
      rowKey="id"
      columns={columns}
      data={dataSource}
      isShowDeleteBtn={false}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView?.(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<GroupCustomerDTO>;
        onSort?.(field as string, order as SortOrder);
      }}
      scroll={{ x: 1300 }}
    />
  );
};

export default GroupCustomerTable;
