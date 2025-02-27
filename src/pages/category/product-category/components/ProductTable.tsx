import { ATag } from '@components/atoms';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import { EStatus } from '@constants/masterData';
import type { OrderDTO, ProductCategoryDTO } from '@dtos';
import { useProfile } from '@stores';
import { formatDate } from '@utils/dateHelper';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState, type FC, type Key, type ReactNode } from 'react';

export type TProductRecord = Partial<ProductCategoryDTO>;

interface IProductTable {
  dataSource: TProductRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onEdit: ITable<TProductRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const statusObject: Partial<Record<EStatus, ReactNode>> = {
  [EStatus.ACTIVE]: <ATag color="green">Đang hoạt động</ATag>,
  [EStatus.INACTIVE]: <ATag color="red">Không hoạt động</ATag>,
};

const ProductTable: FC<IProductTable> = ({
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

  const columns: ColumnType<TProductRecord>[] = useMemo(
    () => [
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
        render: (text) => formatDate(text),
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
        render: (text) => formatDate(text),
      },
      {
        title: 'Người cập nhật',
        dataIndex: 'updatedBy',
        minWidth: 164,
        sorter: true,
        showSorterTooltip: false,
      },
    ],
    [],
  );

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TProductRecord>
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
        const { field, order } = s as SorterResult<TProductRecord>;
        onSort(field as string, order as SortOrder);
      }}
      scroll={{ x: 1200 }}
    />
  );
};

export default ProductTable;
