import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
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
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/lib';
import type { Key } from 'react';

export type FixedType = 'left' | 'right' | boolean;

export type TTableKey = { key: Key };

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

export interface ITableForm<T> {
  data: T[];
  columns: EditableColumnType<T>[];
  form: FormInstance<T>;
  editingKey?: string | null;
  selectedRowKeys?: string[];
  hideActions?: boolean;
  hideIndexColumn?: boolean;
  isShowDeleteBtn?: boolean;
  paginations?: IMPagination;
  setEditingKey?: React.Dispatch<React.SetStateAction<string | null>>;
  onCreate?: () => void;
  onDeleteRow?: (key: Key) => void;
  onSubmitSave?: (values: T, data: T[]) => void;
  onCancelSave?: () => void;
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<string[]>>;
  onView?: (key: Key) => void;
}
