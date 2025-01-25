import { ATag } from '@components/atoms';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { EStatus } from '@constants/masterData';
import type { ProductCategoryDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import { type FC, useState, type ReactNode, type Key } from 'react';

export type TProductRecord = TTableKey & ProductCategoryDTO;

interface IProductTable {
  dataSource: TProductRecord[];
  paginations: IMPagination;
  onCreate: ITable<TProductRecord>['onCreate'];
  onEdit: ITable<TProductRecord>['onEdit'];
  onDelete: (id: number) => void;
}

const statusObject: Record<EStatus, ReactNode> = {
  [EStatus.ACTIVE]: <ATag color="green">Đang hoạt động</ATag>,
  [EStatus.INACTIVE]: <ATag color="red">Không hoạt động</ATag>,
};

const columns: ColumnType<TProductRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    minWidth: 104,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    minWidth: 213,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 164,
    render: (value: EStatus) => statusObject[value] ?? null,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    minWidth: 164,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 164,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    minWidth: 164,
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 164,
  },
];

const ProductTable: FC<IProductTable> = ({
  dataSource,
  paginations,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete(key as number);
  };

  return (
    <OTable<TProductRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      showCreateBtn
      paginations={paginations}
    />
  );
};

export default ProductTable;
