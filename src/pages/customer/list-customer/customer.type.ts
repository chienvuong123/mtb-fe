import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { ITable, TTableKey } from '@components/organisms';
import type { CustomerDTO } from '@dtos';
import type { TFormType } from '@types';
import type { FormInstance } from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { Dayjs } from 'dayjs';

export type TCustomerForm = Partial<
  Omit<CustomerDTO, 'birthday' | 'hobbies' | 'identification'>
> & {
  birthday?: Dayjs;
  hobbies?: string[];
  identification?: string[];
};

export interface ICustomerForm {
  mode: TFormType;
  initialValues?: Partial<CustomerDTO> | null;
  onClose: () => void;
  onSubmit: (values: Partial<CustomerDTO>, form: FormInstance) => void;
}

export type TCustomerRecord = TTableKey & Partial<CustomerDTO>;

export interface ICustomerTable {
  dataSource: TCustomerRecord[];
  paginations: IMPagination;
  onEdit: ITable<TCustomerRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}
