import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import { EStatus, STATUS_OBJECT } from '@constants/masterData';
import type { ApproachScriptDTO, OrderDTO } from '@dtos';
import { useProfile } from '@stores';
import { formatDate } from '@utils/dateHelper';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import { useState, type FC, type Key } from 'react';

export type TScenarioRecord = ApproachScriptDTO;

interface IScenarioTable {
  dataSource: TScenarioRecord[];
  sortDirection?: OrderDTO;
  pagination: IMPagination;
  onEdit: ITable<TScenarioRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

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
    dataIndex: 'name',
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

const ScenarioTable: FC<IScenarioTable> = ({
  dataSource,
  pagination,
  sortDirection,
  onEdit,
  onDelete,
  onSort,
  onView,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { isAdmin, isCampaignManager, isSaleManager } = useProfile();

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TScenarioRecord>
      isCheckboxHidden
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={
        isAdmin || isCampaignManager || isSaleManager ? deleteRecord : undefined
      }
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      sortDirection={sortDirection}
      paginations={pagination}
      onView={(id) => onView(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TScenarioRecord>;
        onSort(field as string, order as SortOrder);
      }}
    />
  );
};

export default ScenarioTable;
