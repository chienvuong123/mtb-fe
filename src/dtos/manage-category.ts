import type { ApproachPlanDTO } from './approach-plan';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export type TManageCategorySearchForm = {
  code?: string;
  name?: string;
  mainProduct?: string;
  subProduct?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

export interface ManagerCategoryDTO extends BaseEntity {
  code: string;
  name: string;
  approachPlans: ApproachPlanDTO[];
  categoryTypeId?: string;
  startDate?: string;
  endDate?: string;
  mainProduct: string;
  subProduct: string;
}

export interface ManageCategorySearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
  status?: string;
  categoryCode?: string;
  categoryType?: string;
}

export type ManageCategorySearchResponse = BaseResponse<
  BaseSearchResponse<ManagerCategoryDTO>
>;
