import { OTable } from '@components/organisms';
import { EStatus, STATUS_OBJECT } from '@constants/masterData';
import type { CategoryDTO } from '@dtos';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { formatDate } from '@utils/dateHelper';
import type { ColumnType } from 'antd/es/table';
import { useMemo, useState, type FC, type Key } from 'react';
import { useProfile } from '@stores';
import type { TBaseTableSort } from '@types';
import { useLocation } from 'react-router-dom';

export interface GenericCategoryTableProps {
  dataSource: CategoryDTO[];
  pagination: IMPagination;
  loading?: boolean;
  sort?: { field: string; direction: string };
  onEdit?: (record: CategoryDTO) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onSort?: (sort: TBaseTableSort) => void;
  formatDate?: (date: string) => string;
}

export const GenericCategoryTable: FC<GenericCategoryTableProps> = ({
  dataSource,
  pagination,
  loading,
  sort,
  onEdit,
  onDelete,
  onView,
  onSort,
  formatDate: formatDateFn = formatDate,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { hasPermission } = useProfile();

  const { pathname } = useLocation();
  const permission = hasPermission(pathname);

  const columns: ColumnType<CategoryDTO>[] = useMemo(
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
        title: 'Mã tích hợp',
        dataIndex: 'mbCode',
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
        render: (value: EStatus) => STATUS_OBJECT[value] ?? null,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        minWidth: 164,
        sorter: true,
        showSorterTooltip: false,
        render: (text) => formatDateFn(text),
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
        render: (text) => formatDateFn(text),
      },
      {
        title: 'Người cập nhật',
        dataIndex: 'updatedBy',
        minWidth: 164,
        sorter: true,
        showSorterTooltip: false,
      },
    ],
    [formatDateFn],
  );

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  return (
    <OTable<CategoryDTO>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={permission ? deleteRecord : undefined}
      onEdit={permission ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={pagination}
      loading={loading}
      sortDirection={sort}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      scroll={{ x: 1200 }}
    />
  );
};
