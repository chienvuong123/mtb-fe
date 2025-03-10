import type { EStatus } from '@constants/masterData';
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
  called: boolean;
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

export interface ApproachStepFormValue {
  attributes?: number | boolean | Array<number>;
  note?: string;
}

export interface ApproachFormData {
  status: string;
  approachStatus: string;
  rate?: number;
  note?: string;
  campaignScriptId?: string;
  called?: boolean;
  [key: string]: ApproachStepFormValue | string | number | boolean | undefined;
}

export interface ApproachScriptDTO extends BaseEntity {
  code: string;
  name: string;
  category: string;
  status: EStatus;
  description: string;
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
    called?: boolean;
  };
  approachResultStep: {
    id?: string;
    approachStepId: string;
    result: string;
    note: string;
  }[];
}
