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
  branch: string;
  branchCode: string;
  branchName: string;
  department: string;
  departmentCode: string;
  departmentName: string;
  supervisor: string;
  supervisorCode: string;
  supervisorName: string;
  mainProductCode: string;
  mainProductName: string;
  subProductCode: string;
  subProductName: string;
  customer: string;
  deploymentMethod: string;
  note: string;
  scope: string;
  status: string;
  totalCustomers: number;
  participatingCustomers: number;
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
