import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';
import type { ScenarioDTO } from './scenario';

export interface ApproachPlanDTO extends BaseEntity {
  code: string;
  method: string;
  scenario?: ScenarioDTO;
  campaignId?: string;
}
export interface ApproachPlanSearchRequest extends BaseSearchParams {
  code?: string;
  method?: string;
}

export type ApproachPlanSearchResponse = BaseResponse<
  BaseSearchResponse<ApproachPlanDTO>
>;
export type ApproachPlanViewResponse = BaseResponse<ApproachPlanDTO>;
