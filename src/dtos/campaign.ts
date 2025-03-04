import type { ApproachPlanDTO } from './approach-plan';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export type TCampaignSearchForm = {
  categoryCode?: string;
  nameCategory?: string;
  codeCampaign?: string;
  nameCampaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

export interface CampaignDTO extends BaseEntity {
  code: string;
  name: string;
  approachPlans: ApproachPlanDTO[];
  categoryTypeId?: string;
  startDate?: string;
  endDate?: string;
  categoryCode?: string;
  campaignCode?: string;
}

export interface CampaignSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
  status?: string;
  campaignCode?: string;
  categoryType?: string;
  categoryCode?: string;
  categoryId?: string;
}

export type CampaignSearchResponse = BaseResponse<
  BaseSearchResponse<CampaignDTO>
>;
export type CampaignViewResponse = BaseResponse<CampaignDTO>;
