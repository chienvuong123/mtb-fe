import type { EGender } from '@constants/masterData';
import type { BaseSearchParams } from '../common';

export type CustomerDTO = {
  createdDate?: string; // date-time
  createdBy?: string;
  updatedDate?: string; // date-time
  updatedBy?: string;
  reqNo?: string; // [0, 50] characters
  id?: string;
  campaignId: string;
  campaignName: string;
  code: string;
  name: string; // matches ^[a-zA-Z0-9]+$
  phone?: string; // matches ^[0-9]{10}$
  email?: string; // [0, 50] characters
  birthDay?: string; // date-time
  gender?: EGender; // [0, 10] characters
  address?: string; // [0, 200] characters
  identityCard?: string; // [0, 20] characters, matches ^[0-9]+$
  seller: string;
  categoryId?: string;
  categoryName?: string;
  branch?: string;
  cusGroup?: string;
  cusSegment?: string;
  job?: string;
  hobbies?: string;
  identification: string;
};

export type CustomerSearchRequest = BaseSearchParams & Partial<CustomerDTO>;
