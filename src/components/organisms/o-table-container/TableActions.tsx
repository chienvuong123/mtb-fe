import {
  FloppyDiskIcon,
  CancelCircle,
  EyeIcon,
  PenIcon,
  TrashIcon,
  PhoneIcon,
  UserCheckIcon,
} from '@assets/icons';
import { AButton } from '@components/atoms';
import { Space } from 'antd';
import type { Key } from 'react';

interface ITableActionsProps<T> {
  record: T;
  editable: boolean;
  editingKey?: string | null;
  rowKey: keyof T;
  onSave?: (key: Key) => void;
  onCancel?: () => void;
  onEdit?: (record: T) => void;
  onView?: (key: Key) => void;
  onDelete?: (key: Key) => void;
  onCall?: (record: T) => void;
  onList?: (key: Key) => void;
}

const TableActions = <T extends object>({
  record,
  editable,
  rowKey,
  editingKey,
  onSave,
  onCancel,
  onEdit,
  onView,
  onDelete,
  onCall,
  onList,
}: ITableActionsProps<T>) => {
  if (editable) {
    return (
      <Space>
        <AButton
          onClick={() => onSave?.(record[rowKey] as Key)}
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
      {Boolean(onList) && (
        <AButton
          icon={<UserCheckIcon className="action-btn-icon" />}
          type="link"
          className="w-22 action-btn"
          onClick={() => onList?.(record[rowKey] as Key)}
        />
      )}
      {Boolean(onView) && (
        <AButton
          icon={<EyeIcon className="action-btn-icon" />}
          type="link"
          className="w-22 action-btn"
          onClick={() => onView?.(record[rowKey] as Key)}
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
          onClick={() => onDelete?.(record[rowKey] as Key)}
        />
      )}
    </Space>
  );
};

export default TableActions;
