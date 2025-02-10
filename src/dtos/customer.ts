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
  name: string;
  phone: string;
  email: string;
  gender: string | EGender;
  job: string;
  birthday: string;
  address: string;
  identityType?: string;
  identityNumber?: string;
  hobby: string;
  branch: string;
  description: string;
  categoryId?: string;
  category?: CategoryDTO;
  campaign?: CampaignDTO;
  group?: CustomerGroupDTO;
  segment?: CustomerSegmentDTO;
  seller?: UserDTO;
}

export interface CustomerAddRequest extends Partial<CustomerDTO> {
  reqNo: string;
}

export interface CustomerEditRequest extends Partial<CustomerDTO> {
  reqNo: string;
}

export interface CustomerSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerDTO>
>;
export type CustomerViewResponse = BaseResponse<CustomerDTO>;
