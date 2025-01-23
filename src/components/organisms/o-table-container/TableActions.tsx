import {
  FloppyDiskIcon,
  CancelCircle,
  EyeIcon,
  PenIcon,
  TrashIcon,
} from '@assets/icons';
import { AButton } from '@components/atoms';
import { Space, Popconfirm } from 'antd';

interface ITableActionsProps<T> {
  record: T;
  editable: boolean;
  onSave: (key: string) => void;
  onCancel: () => void;
  onEdit: (record: T) => void;
  onView?: (key: string) => void;
  onDelete: (key: string) => void;
  editingKey: string | null;
}

const TableActions = <T extends object & { key: string }>({
  record,
  editable,
  onSave,
  onCancel,
  onEdit,
  onView,
  onDelete,
  editingKey,
}: ITableActionsProps<T>) => {
  if (editable) {
    return (
      <Space>
        <AButton
          onClick={() => onSave(record.key)}
          type="link"
          icon={<FloppyDiskIcon />}
          className="w-24 action-btn"
        />
        <AButton
          onClick={onCancel}
          type="link"
          icon={<CancelCircle />}
          className="w-24 action-btn"
        />
      </Space>
    );
  }
  return (
    <Space>
      <AButton
        icon={<EyeIcon className="action-btn-icon" />}
        type="link"
        disabled={editingKey !== null}
        className="w-22 action-btn"
        onClick={() => onView?.(record.key)}
      />
      <AButton
        onClick={() => onEdit(record)}
        type="link"
        disabled={editingKey !== null}
        icon={<PenIcon className="action-btn-icon" />}
        className="w-22 action-btn"
      />
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => onDelete(record.key)}
      >
        <AButton
          type="link"
          icon={<TrashIcon className="action-btn-icon" />}
          className="w-22 action-btn"
        />
      </Popconfirm>
    </Space>
  );
};

export default TableActions;
