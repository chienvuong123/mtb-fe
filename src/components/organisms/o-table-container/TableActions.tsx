import {
  FloppyDiskIcon,
  CancelCircle,
  EyeIcon,
  PenIcon,
  TrashIcon,
  PhoneIcon,
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
  onCall?: (record: T) => void;
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
  onCall,
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
      {Boolean(onCall) && (
        <AButton
          icon={<PhoneIcon className="action-btn-icon" />}
          type="link"
          className="w-22 action-btn"
          onClick={() => onCall?.(record)}
        />
      )}
      {Boolean(onView) && (
        <AButton
          icon={<EyeIcon className="action-btn-icon" />}
          type="link"
          className="w-22 action-btn"
          onClick={() => onView?.(record.key)}
        />
      )}
      {Boolean(onEdit) && (
        <AButton
          onClick={() => onEdit?.(record)}
          type="link"
          disabled={editingKey !== null}
          icon={<PenIcon className="action-btn-icon" />}
          className="w-22 action-btn"
        />
      )}
      {Boolean(onDelete) && (
        <AButton
          type="link"
          icon={<TrashIcon className="action-btn-icon" />}
          className="w-22 action-btn"
          onClick={() => onDelete?.(record.key)}
        />
      )}
    </Space>
  );
};

export default TableActions;
