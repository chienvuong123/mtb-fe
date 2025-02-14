import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal/OModalConfirm';
import type { CustomerDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC, type Key } from 'react';

export type TCustomerRecord = TTableKey & Partial<CustomerDTO>;

interface IProductTable {
  dataSource: TCustomerRecord[];
  paginations: IMPagination;
  onEdit: ITable<TCustomerRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TCustomerRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 68,
    minWidth: 68,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Nhóm khách hàng',
    dataIndex: 'cusGroup',
    minWidth: 193,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phân khúc khách hàng',
    dataIndex: 'cusSegment',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Năm sinh',
    dataIndex: 'birthDay',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Seller',
    dataIndex: 'seller',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
];

const confirmProps: IModalConfirm = {
  title: 'Xoá khách hàng',
};

const CustomerListTable: FC<IProductTable> = ({
  dataSource,
  paginations,
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
    <OTable<TCustomerRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      onView={(id) => onView(id as string)}
      scroll={{ x: 1800 }}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCustomerRecord>;
        onSort(field as string, order as SortOrder);
      }}
      confirmProps={confirmProps}
    />
  );
};

export default CustomerListTable;
