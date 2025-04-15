import type { CategoryDTO } from '../category';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from '../common';

export interface GroupCustomerDTO extends BaseEntity {
  campaign: unknown;
  campaignId: string;
  nameCampaign: string;
  category: CategoryDTO;
  categoryId: string;
  nameCategory: string;
  customerQuantity: number;
  categoryCode: string;
  code: string;
  name: string;
}

export interface GroupCustomerSearchRequest extends BaseSearchParams {
  campaignId?: string;
  categoryId?: string;
  nameCampaign?: string;
  nameCategory?: string;
  code?: string;
  name?: string;
  custormerQuantity?: number;
}

export type GroupCustomerSearchResponse = BaseResponse<
  BaseSearchResponse<GroupCustomerDTO>
>;

export type GroupCustomerViewResponse = BaseResponse<GroupCustomerDTO>;
