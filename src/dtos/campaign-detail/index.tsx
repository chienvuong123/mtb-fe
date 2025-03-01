import type { BaseEntity, BaseSearchParams } from '../common';

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
