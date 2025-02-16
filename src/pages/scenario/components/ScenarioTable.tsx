import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import type { ScenarioDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, type FC, type Key } from 'react';

export type TScenarioRecord = TTableKey & ScenarioDTO;

interface IScenarioTable {
  dataSource: TScenarioRecord[];
  pagination: IMPagination;
  onCreate: ITable<TScenarioRecord>['onCreate'];
  onEdit: ITable<TScenarioRecord>['onEdit'];
  onDelete: (id: string) => void;
}

const columns: ColumnType<TScenarioRecord>[] = [
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

const ScenarioTable: FC<IScenarioTable> = ({
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
    <OTable<TScenarioRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onCreate={onCreate}
      onDeleteRow={deleteRecord}
      onEdit={onEdit}
      setSelectedRowKeys={setSelectedRowKeys}
      showCreateBtn
      paginations={pagination}
    />
  );
};

export default ScenarioTable;
