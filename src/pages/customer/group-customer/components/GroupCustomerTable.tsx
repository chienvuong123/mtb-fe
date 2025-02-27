import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import type { OrderDTO } from '@dtos';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import { useState, type FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

export type TGroupCustomerRecord = Partial<GroupCustomerDTO>;

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
    dataIndex: 'campaignId',
    minWidth: 164,
    showSorterTooltip: false,
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
      rowKey="id"
      columns={columns}
      data={dataSource}
      isShowDeleteBtn={false}
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
      scroll={{ x: 1300 }}
    />
  );
};

export default GroupCustomerTable;
