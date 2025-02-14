import { ATag } from '@components/atoms';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal/OModalConfirm';
import { EStatus } from '@constants/masterData';
import type { ProductCategoryDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC, type ReactNode, type Key } from 'react';

export type TProductRecord = TTableKey & Partial<ProductCategoryDTO>;

interface IProductTable {
  dataSource: TProductRecord[];
  paginations: IMPagination;
  onEdit: ITable<TProductRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const statusObject: Partial<Record<EStatus, ReactNode>> = {
  [EStatus.ACTIVE]: <ATag color="green">Đang hoạt động</ATag>,
  [EStatus.INACTIVE]: <ATag color="red">Không hoạt động</ATag>,
};

const columns: ColumnType<TProductRecord>[] = [
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
    dataIndex: 'customerGroup',
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
    dataIndex: 'customerClass',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Năm sinh',
    dataIndex: 'birthday',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (value: EStatus) => statusObject[value] ?? null,
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
    <OTable<TProductRecord>
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
        const { field, order } = s as SorterResult<TProductRecord>;
        onSort(field as string, order as SortOrder);
      }}
      confirmProps={confirmProps}
    />
  );
};

export default CustomerListTable;
