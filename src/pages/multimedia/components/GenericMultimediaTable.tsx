import { OTable } from '@components/organisms';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/es/table';
import { useMemo, useState, type FC, type Key } from 'react';
import type { MultimediaDTO } from '@dtos';
import { formatDate } from '@utils/dateHelper';

const MultimediaTable: FC<CBaseTable<MultimediaDTO> & { title: string }> = ({
  dataSource,
  paginations,
  sortDirection,
  title,
  onEdit,
  onDelete,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { isAdmin, isCampaignManager } = useProfile();

  const columns: ColumnType<MultimediaDTO>[] = useMemo(
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
        title: 'Mô tả',
        dataIndex: 'description',
        minWidth: 164,
        sorter: true,
        showSorterTooltip: false,
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
    onDelete?.(key as string);
  };

  return (
    <OTable<MultimediaDTO>
      rowKey="id"
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      scroll={{ x: 1200 }}
      confirmProps={{ title: `Xoá ${title}` }}
    />
  );
};

export default MultimediaTable;
