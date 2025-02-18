import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface CampaignTargetDTO extends BaseEntity {
  id: string;
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
  scrip: string;
  status: string;
  approach: string;
  note: string;
}

export interface CampaignScriptRequest extends BaseSearchParams {
  campaignId: string;
  createdDate?: string;
  page?: {
    pageNum: number;
    pageSize: number;
  };
  code?: string;
  name?: string;
}

export type CampaignDetailRequest = { id: string };

export type CampaignDetailResponse = TCampaignDetailDTO;

export type CampaignScriptResponse = BaseResponse<
  BaseSearchResponse<CampaignScriptDTO>
>;
