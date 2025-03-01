import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { CONTROL_ELEMENTS } from '@constants/masterData';
import type { ControlDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, type FC, type Key } from 'react';

export type TControlRecord = ControlDTO;

interface IControlTable {
  dataSource: TControlRecord[];
  pagination: IMPagination;
  onEdit: ITable<TControlRecord>['onEdit'];
  onDelete: (id: string) => void;
}

const columns: ColumnType<TControlRecord>[] = [
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
    dataIndex: 'controlType',
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

const ControlTable: FC<IControlTable> = ({
  dataSource,
  pagination,
  onEdit,
  onDelete,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TControlRecord>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={pagination}
    />
  );
};

export default ControlTable;
