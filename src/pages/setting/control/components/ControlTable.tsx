import { OTable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { CONTROL_ELEMENTS } from '@constants/masterData';
import type { ControlDTO } from '@dtos';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { type FC } from 'react';

const columns: ColumnType<ControlDTO>[] = [
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
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Control',
    dataIndex: 'type',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    render: (controlType: keyof typeof CONTROL_ELEMENTS) => (
      <div className="pointer-events-none">
        {CONTROL_ELEMENTS[controlType] ?? controlType}
      </div>
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    sorter: true,
    showSorterTooltip: false,
    render: (date: string) => dayjs(date).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 120,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    sorter: true,
    showSorterTooltip: false,
    render: (date: string) => dayjs(date).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 120,
    sorter: true,
    showSorterTooltip: false,
  },
];

const ControlTable: FC<CBaseTable<ControlDTO>> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onView,
  onDelete,
  onSort,
}) => {
  return (
    <OTable<ControlDTO>
      rowKey="id"
      columns={columns}
      data={dataSource}
      onDeleteRow={(key) => onDelete?.(key as string)}
      onEdit={onEdit}
      onView={(key) => onView?.(key as string)}
      paginations={paginations}
      sortDirection={sortDirection}
      onSort={onSort}
      isCheckboxHidden
    />
  );
};

export default ControlTable;
