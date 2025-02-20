import type { BaseEntity, BaseSearchParams } from './common';

export interface CategoryScriptDTO extends BaseEntity {
  order: string;
  scrip: string;
  status: string;
  approach: string;
  note: string;
}

export interface CategoryTargetDTO extends BaseEntity {
  campaignId: string;
  categoryId: string;
  name: string;
  value: string;
  unit: string;
}

export interface TCategoryDetailDTO extends BaseEntity {
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
  targets?: CategoryTargetDTO[];
}

export type TCategoryDetailSearchForm = {
  categoryType?: string;
  codeCampaign?: string;
  nameCampaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  categoryCustomer?: string;
};

export interface CategoryScriptRequest extends BaseSearchParams {
  campaignId: string;
  createdDate?: string;
  code?: string;
  name?: string;
}
