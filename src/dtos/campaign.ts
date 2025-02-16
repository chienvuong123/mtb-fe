import type { ApproachPlanDTO } from './approach-plan';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export interface CampaignDTO extends BaseEntity {
  code: string;
  name: string;
  approachPlans: ApproachPlanDTO[];
}

export interface CampaignSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CampaignSearchResponse = BaseResponse<
  BaseSearchResponse<CampaignDTO>
>;
export type CampaignViewResponse = BaseResponse<CampaignDTO>;
