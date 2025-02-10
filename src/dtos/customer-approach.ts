import type { ApproachPlanDTO } from './approach-plan';
import type { AttributeDTO } from './attribute';
import type { UserDTO } from './auth';
import type { CampaignDTO } from './campaign';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';
import type { CustomerDTO } from './customer';
import type { ScenarioDTO } from './scenario';

export enum EApproachStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  FINISHED = 'FINISHED',
}

export interface CustomerApproachResultDTO extends BaseEntity {
  attribute: AttributeDTO;
  value: string;
  note?: string;
}

export interface CustomerApproachDTO extends BaseEntity {
  scenario?: ScenarioDTO;
  approachPlan?: ApproachPlanDTO;
  campaign?: CampaignDTO;
  customer?: CustomerDTO;
  seller?: UserDTO;
  rating: number;
  status: EApproachStatus;
  note?: string;
  result?: CustomerApproachResultDTO[];
}

export interface CustomerApproachAddRequest
  extends Partial<CustomerApproachDTO> {
  reqNo: string;
}

export interface CustomerApproachEditRequest
  extends Partial<CustomerApproachDTO> {
  reqNo: string;
}

export interface CustomerApproachSearchRequest extends BaseSearchParams {
  code?: string;
  method?: string;
}

export type CustomerApproachSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerApproachDTO>
>;
export type CustomerApproachViewResponse = BaseResponse<CustomerApproachDTO>;
