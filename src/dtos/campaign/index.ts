import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface CampaignDTO extends BaseEntity {
  categoryCode: string;
  categoryName: string;
  campaignCode: string;
  campaignName: string;
  totalCustomerApproach: number;
  totalCustomerParticipating: number;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  reqNo: string;

  branches: string;
  campaignManagerId: string;
  categoryId: string;
  customerCatalog: string;
  note: string;
  supervisor: string;
}

export type CampaignSearchRequest = BaseSearchParams & Partial<CampaignDTO>;

export type CampaignSearchResponse = BaseResponse<
  BaseSearchResponse<CampaignDTO>
>;

export type ExampleViewResponse = BaseResponse<CampaignDTO>;
