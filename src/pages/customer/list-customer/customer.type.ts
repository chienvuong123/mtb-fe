import type { CustomerDTO } from '@dtos';
import type { Dayjs } from 'dayjs';

export type TCustomerForm = Partial<Omit<CustomerDTO, 'birthday'>> & {
  birthday?: Dayjs;
};
