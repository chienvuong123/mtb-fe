import {
  FloppyDiskIcon,
  CancelCircle,
  EyeIcon,
  PenIcon,
  TrashIcon,
} from '@assets/icons';
import { AButton } from '@components/atoms';
import { Space } from 'antd';
import type { Key } from 'react';
import type { TTableKey } from '.';

interface ITableActionsProps<T> {
  record: T;
  editable: boolean;
  onSave?: (key: Key) => void;
  onCancel?: () => void;
  onEdit?: (record: T) => void;
  onView?: (key: Key) => void;
  onDelete?: (key: Key) => void;
  editingKey?: string | null;
}

const TableActions = <T extends TTableKey>({
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
          onClick={() => onSave?.(record.key)}
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
        onClick={() => onEdit?.(record)}
        type="link"
        disabled={editingKey !== null}
        icon={<PenIcon className="action-btn-icon" />}
        className="w-22 action-btn"
      />
      <AButton
        type="link"
        icon={<TrashIcon className="action-btn-icon" />}
        className="w-22 action-btn"
        onClick={() => onDelete?.(record.key)}
      />
    </Space>
  );
};

export default TableActions;
