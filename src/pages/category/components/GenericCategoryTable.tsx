import { OTable } from '@components/organisms';
import { EStatus, STATUS_OBJECT } from '@constants/masterData';
import type { CategoryDTO } from '@dtos';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { formatDate } from '@utils/dateHelper';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState, type FC, type Key } from 'react';
import { useProfile } from '@stores';

export interface GenericCategoryTableProps {
  dataSource: CategoryDTO[];
  pagination: IMPagination;
  loading?: boolean;
  sort?: { field: string; direction: string };
  onEdit?: (record: CategoryDTO) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onSort?: (field: string, direction: SortOrder) => void;
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
  const { isAdmin, isCampaignManager } = useProfile();

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
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={pagination}
      loading={loading}
      sortDirection={sort}
      onView={(id) => onView?.(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<CategoryDTO>;
        onSort?.(field as string, order as SortOrder);
      }}
      scroll={{ x: 1200 }}
    />
  );
};
