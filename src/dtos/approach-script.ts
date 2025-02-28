import type { BaseEntity, BaseSearchParams } from './common';

export interface ApproachResultDTO extends BaseEntity {
  customerId: string;
  campaignScriptId: string;
  result: string | null;
  status: string;
  rate: string;
  note: string;
  resultDetail: string;
  rateCampaign: string;
}

export interface ApproachResultStepDTO {
  id?: string;
  approachStepId: string;
  result: string;
  note: string;
}

export interface ApproachScriptAttributeDTO {
  id: string;
  attributeName: string;
  controlType: string;
  controlName: string;
  haveNote: boolean;
  description: string;
  content?: string | null;
  approachResultStep?: ApproachResultStepDTO;
}

export interface ApproachScriptDTO extends BaseEntity {
  code: string;
  name: string;
  category: string;
  status: string;
  desc: string;
  sellerName: string;
  campaignName: string;
  campaignScriptId: string;
  approachResult: ApproachResultDTO | null;
  approachStep: ApproachScriptAttributeDTO[];
}

export interface ApproachScriptSearchRequest extends BaseSearchParams {
  categoryCode?: string;
  categoryName?: string;
  code?: string;
  name?: string;
}

export interface ApproachResultCreateRequest {
  approachResult: {
    id?: string;
    customerId: string;
    campaignScriptId: string;
    status?: string;
    result?: string;
    rate?: string;
    note?: string;
    resultDetail?: string;
    rateCampaign?: string;
  };
  approachResultStep: {
    id?: string;
    approachStepId: string;
    result: string;
    note: string;
  }[];
}
