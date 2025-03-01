import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { OrderDTO } from '@dtos';
import { INPUT_TYPE } from '@types';
import type {
  DatePickerProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TimePickerProps,
} from 'antd';
import type { Rule } from 'antd/es/form';
import type { TextAreaProps } from 'antd/es/input';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { ColumnType } from 'antd/lib/table';
import type { Key } from 'react';
import type { GetRowKey } from 'antd/es/table/interface';
import type { IModalConfirm } from '../o-modal';

export type FixedType = 'left' | 'right' | boolean;

export type EditableCellInputProps =
  | {
      inputType?: INPUT_TYPE.TEXT;
      inputProps?: InputProps;
    }
  | {
      inputType?: INPUT_TYPE.NUMBER;
      inputProps?: InputNumberProps;
    }
  | {
      inputType?: INPUT_TYPE.SELECT;
      inputProps?: SelectProps;
    }
  | {
      inputType?: INPUT_TYPE.DATE_PICKER;
      inputProps?: DatePickerProps;
    }
  | {
      inputType?: INPUT_TYPE.TEXT_AREA;
      inputProps?: TextAreaProps;
    }
  | {
      inputType?: INPUT_TYPE.TIME_PICKER;
      inputProps?: TimePickerProps;
    };

export type EditableColumnType<T> = ColumnsType<T>[number] & {
  editable?: boolean;
  dataIndex: string;
  rules?: Rule[];
} & EditableCellInputProps;

export interface ITable<T> extends TableProps<T> {
  rowKey: keyof T;
  data: T[];
  selectedRowKeys?: string[];
  hideActions?: boolean;
  hideIndexColumn?: boolean;
  isShowDeleteBtn?: boolean;
  paginations?: IMPagination;
  columns: ColumnType<T>[];
  sortDirection?: OrderDTO;
  confirmProps?: IModalConfirm;
  isCheckboxHidden?: boolean;
  onEdit?: (record: T) => void;
  onDeleteRow?: (key: Key) => void;
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<string[]>>;
  onView?: (key: Key) => void;
  onCall?: (record: T) => void;
  tableRowKey?: GetRowKey<T>;
}
