import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface GroupCustomerDTO extends BaseEntity {
  reqNo: string;
  campaignId: string;
  categoryId: string;
  groupId: string;
  nameCampaign: string;
  nameCategory: string;
  nameGroup: string;
  code: string;
  name: string;
}

export type GroupCustomerSearch = {
  page: {
    pageSize: number;
    pageNum: number;
  };
  order: {
    field: string;
    direction: string;
  };
  campaignId: string;
  categoryId: string;
  groupId: string;
  nameCampaign: string;
  nameCategory: string;
  nameGroup: string;
};

export type CMResponseGroupCustomerDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: GroupCustomerDTO[];
  total: number;
};

export type TGroupCustomerSearchForm = {
  campaignId: string;
  categoryId: string;
  groupId: string;
  nameCampaign: string;
  nameCategory: string;
  nameGroup: string;
};

export interface GroupCustomerSearchRequest extends BaseSearchParams {
  campaignId?: string;
  categoryId?: string;
  groupId?: string;
  nameCampaign?: string;
  nameCategory?: string;
  nameGroup?: string;
}

export type GroupCustomerSearchResponse = BaseResponse<
  BaseSearchResponse<GroupCustomerDTO>
>;

export type GroupCustomerViewResponse = BaseResponse<GroupCustomerDTO>;
