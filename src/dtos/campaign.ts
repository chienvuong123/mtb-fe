import type { ApproachPlanDTO } from './approach-plan';
import type { CategoryDTO } from './category';
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
  categoryId: string;
  categoryCampaign?: CategoryDTO;
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

export interface CampaignTargetDTO extends BaseEntity {
  campaignId: string;
  categoryId: string;
  name: string;
  value: string;
  unit: string;
}

export interface TCampaignDetailDTO extends BaseEntity {
  categoryCode?: string;
  categoryName: string;
  name: string;
  code: string;
  campaignManagerId: string;
  categoryId: string;
  startDate: string;
  endDate: string;
  supervisor: string;
  customerCatalog: string;
  note: string;
  branches: string;
  implementationMethod: string;
  scopeImplementation: string;
  targets?: CampaignTargetDTO[];
}

export type TCampaignDetailSearchForm = {
  categoryType?: string;
  codeCampaign?: string;
  nameCampaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  categoryCustomer?: string;
};

export interface CampaignScriptDTO extends BaseEntity {
  order: string;
  script: string;
  status: string;
  approach: string;
  note: string;
}

export interface CampaignScriptRequest extends Partial<BaseEntity> {
  id: string;
  code?: string;
  name?: string;
}

export interface CampaignListRequest extends BaseSearchParams {
  code?: string;
  name?: string;
  categoryCode?: string;
  categoryId?: string;
}
