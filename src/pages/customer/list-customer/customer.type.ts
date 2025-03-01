import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { ITable } from '@components/organisms';
import type { CustomerDTO } from '@dtos';
import type { TFormType } from '@types';
import type { FormInstance } from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { Dayjs } from 'dayjs';

export type TCustomerForm = Partial<
  Omit<CustomerDTO, 'birthday' | 'hobbies' | 'identnDocType'>
> & {
  birthday?: Dayjs;
  hobbies?: string[];
  identnDocType?: string[];
};

export type TCustomerSearchForm = Partial<
  Omit<CustomerDTO, 'cusSegment' | 'cusGroup' | 'job'>
> & {
  cusSegment?: string[];
  cusGroup?: string[];
  job?: string[];
};

export interface ICustomerForm {
  mode: TFormType;
  initialValues?: Partial<CustomerDTO> | null;
  onClose: () => void;
  onSubmit: (values: Partial<CustomerDTO>, form: FormInstance) => void;
}

export type TCustomerRecord = Partial<CustomerDTO>;

export interface ICustomerTable {
  dataSource: TCustomerRecord[];
  paginations: IMPagination;
  onEdit: ITable<TCustomerRecord>['onEdit'];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onCall: (record: TCustomerRecord) => void;
  onSort: (field: string, direction: SortOrder) => void;
}
