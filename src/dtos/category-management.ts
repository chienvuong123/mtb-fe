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
  campaignManagerId: string;
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
