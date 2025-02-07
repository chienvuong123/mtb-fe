import { ATag } from '@components/atoms';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { EStatus, SORT_ORDER_FOR_CLIENT } from '@constants/masterData';
import type { OrderDTO, ProductCategoryDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC, type ReactNode, type Key, useMemo } from 'react';

export type TProductRecord = TTableKey & Partial<ProductCategoryDTO>;

interface IProductTable {
  dataSource: TProductRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onCreate: ITable<TProductRecord>['onCreate'];
  onEdit: ITable<TProductRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
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
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (value: EStatus) => statusObject[value] ?? null,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
];

const ProductTable: FC<IProductTable> = ({
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

  const transformColumns = useMemo(() => {
    if (sortDirection) {
      return columns.map((col) => {
        if (col.dataIndex === sortDirection.field && sortDirection.direction) {
          return {
            ...col,
            sortOrder: SORT_ORDER_FOR_CLIENT[sortDirection.direction] ?? null,
          };
        }
        return col;
      });
    }
    return columns;
  }, [sortDirection]);

  return (
    <OTable<TProductRecord>
      columns={transformColumns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      showCreateBtn
      paginations={paginations}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TProductRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default ProductTable;
