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
  birthday?: string; // date-time
  description: string;
  campaignId: string;
  campaignName: string;
  name: string; // matches ^[a-zA-Z0-9]+$
  phone?: string; // matches ^[0-9]{10}$
  email?: string; // [0, 50] characters
  gender?: string;
  address?: string; // [0, 200] characters
  categoryName?: string;
  branch?: string;
  cusGroup?: string;
  cusSegment?: string;
  job?: string;
  identification: string;
  categoryId?: string;
  category?: CategoryDTO;
  campaign?: CampaignDTO;
  group?: CustomerGroupDTO;
  segment?: CustomerSegmentDTO;
  seller?: string;
  approachStatus?: string;
  numberOfCalls?: string;
  startNumberOfCalls?: string;
  endNumberOfCalls?: string;
  approachResultStatus?: string;

  identnDocType?: string;
  identnDocIssueDate?: string;
  identityCard?: string; // [0, 20] characters, matches ^[0-9]+$

  assetType?: string;
  custLoanAmount?: number;
  activeAppTime?: string;
  transationAverage?: number;
  transationTime?: number;
  crAmountAverage?: number;
  crAmountTime?: number;
  drAmountAverage?: number;
  drAmountTime?: number;
  casaAverage?: number;
  salaryAverage?: number;
  salaryTime?: number;
  levelKyc?: number;
  orderDate?: string;
  orderId?: string;

  genderCategory?: CategoryDTO;
  customerSegment?: CustomerSegmentDTO;
  jobCategory?: CategoryDTO;
  branchCategory?: CategoryDTO;
  sellerEntity?: UserDTO;
  categoryCampaign?: CategoryDTO;
  customerGroup?: CustomerGroupDTO;
  identnDocTypeCategory?: CategoryDTO;
  approachResult?: {
    id?: string;
    categoryStatus?: BaseEntity & {
      name?: string;
    };
  };
}

export interface CustomerSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerDTO>
>;
export type CustomerViewResponse = BaseResponse<CustomerDTO>;
