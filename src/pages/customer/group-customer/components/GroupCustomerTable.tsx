import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import type { OrderDTO } from '@dtos';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import { useState, type FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

export type TGroupCustomerRecord = TTableKey & Partial<GroupCustomerDTO>;

interface IGroupCustomerTable {
  dataSource: TGroupCustomerRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onCreate: ITable<TGroupCustomerRecord>['onCreate'];
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TGroupCustomerRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Mã Category',
    dataIndex: 'categoryId',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Category',
    dataIndex: 'nameCategory',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Mã Campaign',
    dataIndex: 'campaignId',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'nameCampaign',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Mã nhóm khách',
    dataIndex: 'groupId',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên nhóm khách',
    dataIndex: 'nameGroup',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số lượng',
    dataIndex: 'code',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
];

const GroupCustomerTable: FC<IGroupCustomerTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onCreate,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <OTable<TGroupCustomerRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TGroupCustomerRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default GroupCustomerTable;
