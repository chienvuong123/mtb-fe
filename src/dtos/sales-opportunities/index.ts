import type {
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface SalesOpportunitiesSearchRequest extends BaseSearchParams {
  categoryType?: string;
  code?: string;
  name?: string;
}

export interface SalesOpportunitiesDTO {
  id: string;
  name: string;
  code: string;
  OrderId: string;
  Segment: string;
  birthday: string;
  email: string;
  fullName: string;
  group: string;
  phone: number;
  status: string;
  codeCategory: string;
  nameCategory: string;
  codeCampaign: string;
  nameCampaign: string;
  updatedDate: string;
  codeCustomer: string;
  gender: string;
  profession: string;
  rank: string;
  hobby: string;
}

export type TSalesOpportunitiesSearchForm = {
  orderId: string;
  codeCategory: string;
  nameCategory: string;
  codeCampaign: string;
  nameCampaign: string;
  codeCustomer: string;
  fullName: string;
  email: string;
  phone: number;
  profession: string;
  rank: string;
  group: string;
  status: string;
};

export type SalesOpportunitiesSearchResponse = BaseResponse<
  BaseSearchResponse<SalesOpportunitiesDTO>
>;
