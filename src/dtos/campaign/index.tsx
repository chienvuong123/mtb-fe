import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface CampaignSearchRequest extends BaseSearchParams {
  categoryType?: string;
  code?: string;
  name?: string;
  categoryCode?: string;
  nameCategory?: string;
  codeCampaign?: string;
  nameCampaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface CampaignDTO extends BaseEntity {
  code: string;
  name: string;
  status: string;
  categoryTypeId: string;
  categoryCode?: string;
  startDate: string;
  endDate: string;
  totalCustomerApproach: number;
  totalCustomerParticipating: number;
}

export type TCampaignSearchForm = {
  categoryCode?: string;
  nameCategory?: string;
  codeCampaign?: string;
  nameCampaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

export type CampaignSearchResponse = BaseResponse<
  BaseSearchResponse<CampaignDTO>
>;
