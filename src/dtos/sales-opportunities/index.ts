import type { CategoryDTO, CategoryType } from '../category';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';
import type { CustomerDTO } from '../customer';
import type { CampaignDTO } from '../campaign';
import type { CustomerGroupDTO } from '../customer-group';

export interface SalesOpportunitiesSearchRequest extends BaseSearchParams {
  categoryTypeCode?: CategoryType;
  code?: string;
  name?: string;
}

export interface SalesOpportunitiesDTO extends BaseEntity {
  orderId: string;
  customerId: string;
  customerCode: string;
  customerName: string;
  customerEmail: string;
  customerGroupName: string;
  customerGroupId: string;
  customerSegment: string;
  categoryCode: string;
  categoryName: string;
  campaignCode: string;
  genderCode: string;
  campaignName: string;
  birthDate: string;
  mobilePhone: string;
  customer: CustomerDTO;
  category: CategoryDTO;
  campaign: CampaignDTO;
  customerGroup: CustomerGroupDTO;
}

export type TSalesOpportunitiesSearchForm = {
  orderId?: string;
  categoryCode?: string;
  campaignCode?: string;
  customerGroupCode?: string;
  cusSegment?: string;
  customerCode?: string;
  cusName?: string;
  cusEmail?: string;
  cusPhone?: string;
  cusJob?: string;
  status?: string;
};

export type SalesOpportunitiesSearchResponse = BaseResponse<
  BaseSearchResponse<SalesOpportunitiesDTO>
>;
