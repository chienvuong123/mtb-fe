import type { EGender } from '@constants/masterData';
import type { UserDTO } from './auth';
import type { CampaignDTO } from './campaign';
import type { CategoryDTO } from './category';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';
import type { CustomerGroupDTO } from './customer-group';
import type { CustomerSegmentDTO } from './customer-segment';

export interface CustomerDTO extends BaseEntity {
  code: string;
  birthday: string;
  birthDay?: string; // date-time
  identityType?: string;
  identityNumber?: string;
  description: string;
  campaignId: string;
  campaignName: string;
  name: string; // matches ^[a-zA-Z0-9]+$
  phone?: string; // matches ^[0-9]{10}$
  email?: string; // [0, 50] characters
  gender?: EGender; // [0, 10] characters
  address?: string; // [0, 200] characters
  identityCard?: string; // [0, 20] characters, matches ^[0-9]+$
  categoryName?: string;
  branch?: string;
  cusGroup?: string;
  cusSegment?: string;
  job?: string;
  hobbies?: string;
  identification: string;
  categoryId?: string;
  category?: CategoryDTO;
  campaign?: CampaignDTO;
  group?: CustomerGroupDTO;
  segment?: CustomerSegmentDTO;
  seller?: UserDTO;
}

export interface CustomerSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerDTO>
>;
export type CustomerViewResponse = BaseResponse<CustomerDTO>;
