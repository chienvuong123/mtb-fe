import { OTable } from '@components/organisms';
import { EStatus, STATUS_OBJECT } from '@constants/masterData';
import type { ApproachScriptDTO } from '@dtos';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import { formatDate } from '@utils/dateHelper';
import type { ColumnType } from 'antd/es/table';
import { useState, type FC, type Key } from 'react';

export type TScenarioRecord = ApproachScriptDTO;

const columns: ColumnType<TScenarioRecord>[] = [
  {
    title: 'Mã kịch bản',
    dataIndex: 'code',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên kịch bản',
    dataIndex: 'name',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    render: (value: EStatus) => STATUS_OBJECT[value] ?? null,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 120,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    render: (date: string) => formatDate(date),
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 120,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    render: (date: string) => formatDate(date),
    sorter: true,
    showSorterTooltip: false,
  },
];

const ScenarioTable: FC<CBaseTable<ApproachScriptDTO>> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onDelete,
  onSort,
  onView,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { hasPermission } = useProfile();

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  return (
    <OTable<TScenarioRecord>
      isCheckboxHidden
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={
        hasPermission(ROUTES.SCENARIO.DELETE) ? deleteRecord : undefined
      }
      onEdit={hasPermission(ROUTES.SCENARIO.EDIT) ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      sortDirection={sortDirection}
      paginations={paginations}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      confirmProps={{ title: 'Xoá kịch bản' }}
    />
  );
};

export default ScenarioTable;
