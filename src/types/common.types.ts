import type { IMPagination } from '@components/molecules';
import type { OrderDTO } from '@dtos';
import type { SortOrder } from 'antd/es/table/interface';
import type { FormInstance } from 'antd';
import type { TFormType } from './formItem.types';

export interface CBaseForm<T, P = T> {
  mode?: TFormType;
  initialValues?: Partial<T> | null;
  onClose?: () => void;
  onSubmit: (values: T, form?: FormInstance<P>) => void;
}

export interface CBaseSearch<T, P = T> {
  initialValues?: Partial<T> | null;
  onSearch: (values: P) => void;
  onClearAll?: () => void;
  onCreate?: (values?: T) => void;
  onClose?: () => void;
}

export interface CBaseTable<T> {
  dataSource: T[];
  paginations?: IMPagination;
  sortDirection?: OrderDTO;
  onEdit?: (record: T) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onSort?: (field: string, direction: SortOrder) => void;
  onCall?: (record: T) => void;
  onList?: (id: string) => void;
}
