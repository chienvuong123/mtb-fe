import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { CONTROL_ELEMENTS } from '@constants/masterData';
import type { ControlDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, type FC, type Key } from 'react';

export type TControlRecord = TTableKey & ControlDTO;

interface IControlTable {
  dataSource: TControlRecord[];
  pagination: IMPagination;
  onCreate: ITable<TControlRecord>['onCreate'];
  onEdit: ITable<TControlRecord>['onEdit'];
  onDelete: (id: string) => void;
}

const columns: ColumnType<TControlRecord>[] = [
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
  onCreate,
  onEdit,
  onDelete,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TControlRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={pagination}
    />
  );
};

export default ControlTable;
