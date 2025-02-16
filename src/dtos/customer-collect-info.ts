import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export interface CustomerCollectInfoDTO extends BaseEntity {
  fullName: string;
  gender: string;
  birthday: string;
  phone: string;
  address: string;
  loanAmount: number;
  appOpenTime: string;
  averageTransactions: number;
  averageTransactionAmount: number;
  averageCasaBalance: number;
  salaryViaMB: number;
  ekycLevel: number;

  assetType: string;
  manufacturer: string;
  productionLine: string;
  manufacturingYear: number;
  assetName: string;

  identityType: string;
  identityNumber: string;
  issueDate: string;
  job: string;
  monthlyIncome: number;
  incomeVerificationMethod: string;
  maritalStatus: string;
  dependents: string;
  currentAddress: string;
  loanDuration: number;
  principalRepaymentMethod: string;
  vehicleRegistrationDate: string;
}

export interface CustomerSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
}

export type CustomerSearchResponse = BaseResponse<
  BaseSearchResponse<CustomerCollectInfoDTO>
>;
export type CustomerViewResponse = BaseResponse<CustomerCollectInfoDTO>;
