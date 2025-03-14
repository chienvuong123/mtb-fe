import { OTable } from '@components/organisms';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
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
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    minWidth: 150,
  },
  {
    title: 'Control',
    dataIndex: 'type',
    minWidth: 150,
    render: (controlType: keyof typeof CONTROL_ELEMENTS) => (
      <div className="pointer-events-none">
        {CONTROL_ELEMENTS[controlType] ?? controlType}
      </div>
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    render: (date: string) => dayjs(date).format(DATE_SLASH_FORMAT),
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 120,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    render: (date: string) => dayjs(date).format(DATE_SLASH_FORMAT),
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 120,
  },
];

const ControlTable: FC<CBaseTable<ControlDTO>> = ({
  dataSource,
  paginations,
  onEdit,
  onView,
  onDelete,
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
      isCheckboxHidden
    />
  );
};

export default ControlTable;
