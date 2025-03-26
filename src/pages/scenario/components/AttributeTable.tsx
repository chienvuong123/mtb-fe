import { OTable, type ITable } from '@components/organisms';
import type { ApproachScriptAttributeDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import { type FC, type Key } from 'react';
import { useLocation } from 'react-router-dom';

interface IAttributeTable {
  dataSource: ApproachScriptAttributeDTO[];
  onEdit: ITable<ApproachScriptAttributeDTO>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const columns: ColumnType<ApproachScriptAttributeDTO>[] = [
  {
    title: 'Tên Attribute',
    dataIndex: 'attributeName',
    minWidth: 621,
    render: (text: string) =>
      text.length > 100 ? `${text.slice(0, 100)}...` : text,
  },
  {
    title: 'Control',
    dataIndex: 'controlName',
    minWidth: 621,
  },
];

const AttributeTable: FC<IAttributeTable> = ({
  dataSource,
  onEdit,
  onDelete,
  onView,
}) => {
  const location = useLocation();
  const isViewMode = location.pathname.includes('/detail/');

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<ApproachScriptAttributeDTO>
      rowKey="id"
      columns={columns}
      data={dataSource}
      onDeleteRow={isViewMode ? undefined : deleteRecord}
      onEdit={isViewMode ? undefined : onEdit}
      onView={(id) => onView?.(id as string)}
      isCheckboxHidden
      confirmProps={{
        title: 'Xóa attribute',
      }}
    />
  );
};

export default AttributeTable;
