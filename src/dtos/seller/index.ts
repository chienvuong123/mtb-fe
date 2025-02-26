import type { ERole, EStatus } from '@constants/masterData';
import type { BaseEntity, BaseSearchParams } from '../common';
import type { CategoryType } from '../category';

export interface SellerSearchRequest extends BaseSearchParams {
  branch?: string;
  department?: string;
  position?: string;
  employeeCode?: string;
  email?: string;
  phone?: string;
  totalCampaign?: string;
  category?: string;
  campaign?: string;
}

interface SellerDetailDTO extends BaseEntity {
  categoryType: CategoryType | null;
  status: EStatus;
  name: string;
}

interface SellerUserDTO {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  username: string;
  fullName: string;
  email: string;
  status: EStatus;
  role: ERole;
  expertise: string;
  position: string;
  branch: string;
  department: string;
  phoneNum: string;
  lastName: string;
  employeeCode?: string;
  branchDtl: SellerDetailDTO;
  positionDtl: SellerDetailDTO;
  departmentDtl: SellerDetailDTO;
  expertiseDtl: SellerDetailDTO;
}

export type SellerDTO = {
  id: string;
  userId: string;
  name: string;
  status: EStatus;
  user: SellerUserDTO;
  totalCustomer: number;
  totalCampaign: number;
};

// seller details
export type SellerDetailsDTO = {
  code: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  department: string;
  position: string;
  totalCampaign: number;
  campaigns: [];
};

// assignment
export type SellerDistribution = {
  sellerId: string;
  customerQuantity: number;
  isLock: boolean;
};

export type AssignmentSellerRequestDTO = {
  totalQuantity: number;
  campaignId: string;
  dataSplitSellerDtos: SellerDistribution[];
};

export type AssignmentSellerSearchForm = {
  categoryId?: string;
  campaignId?: string;
  cusGroup?: string[];
};

export type AssignmentSellerItemDTO = {
  sellerName: string;
  sellerId: string;
  assignNumber: number;
  isLock: boolean;
  email: string;
};

export type AssignmentSellerResponseDTO = Omit<
  AssignmentSellerItemDTO,
  'email'
> & {
  isTop?: boolean;
};

export type AssignmentSellerAssignItemDTO = {
  customerNumber: number;
  sellerInformations: AssignmentSellerItemDTO[];
};
