import type { CustomerDTO } from '@dtos';
import type { Dayjs } from 'dayjs';

export type TCustomerForm = Partial<
  Omit<CustomerDTO, 'birthday' | 'hobbies'>
> & {
  birthday?: Dayjs;
  hobbies?: string[];
};

export type TCustomerSearchForm = Partial<Omit<CustomerDTO, 'cusGroup'>> & {
  cusGroup?: string[];
};
