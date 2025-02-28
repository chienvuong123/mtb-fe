export interface CustomerCollectInfoDTO {
  saveDraft?: boolean;
  customerId: string;
  orderId: string;
  campaignId: string;
  customerName: string;
  dateOfBirth: string;
  genderCode: string;
  mobileNumber: string;
  typeOfIdCode: string;
  typeOfIdName: string;
  personalId: string;
  issueDate: string;
  jobCode: string;
  jobName: string;
  averageMonthlyIncome: number;
  incomeProofCode: string;
  incomeProofName: string;
  customerMaritalStatusCode: string;
  customerMaritalStatusName: string;
  numberOfChildren: number;
  residenceAddress: string;
  residenceProvinceCode: string;
  residenceProvinceName: string;
  residenceDistrictCode: string;
  residenceDistrictName: string;
  residenceWardCode: string;
  residenceWardName: string;
  currentAddress: string;
  currentProvinceCode: string;
  currentProvinceName: string;
  currentDistrictCode: string;
  currentDistrictName: string;
  currentWardCode: string;
  currentWardName: string;
  loanMoney: number;
  tenor: number;
  paymentMethod: string;
  assetCategoryCode: string;
  assetCategoryName: string;
  assetCompanyCode: string;
  assetCompanyName: string;
  assetModelCode: string;
  assetModelName: string;
  assetYear: number;
  assetInfoCode: string;
  assetInfoName: string;
  assetInfoValue: string;
  paperIssueDate: string;
  appDate: string;
  averageTransaction: number;
  countOfTransaction: number;
  averageCreditAmt: number;
  averageCreditMonth: number;
  averageDebitAmt: number;
  averageDebitMonth: number;
  averageCasa: number;
  averageSalary: number;
  countOfSalary: number;
  ekycLevel: string;
  branchOfPartner?: string;
  expireDate?: string;
}

export interface CustomerCollectFormDTO {
  // Basic Info (First Form)
  customerName: string;
  genderCode: string;
  dateOfBirth: string;
  mobileNumber: string;
  residenceProvinceCode: string;
  residenceDistrictCode: string;
  residenceWardCode: string;
  currentProvinceCode: string;
  currentDistrictCode: string;
  currentWardCode: string;
  appDate: string;
  countOfTransaction: string;
  ekycLevel: string;
  averageTransaction: string;
  averageCreditAmt: number;
  averageCreditMonth: string;
  averageDebitAmt: number;
  averageDebitMonth: string;
  averageCasa: number;
  averageSalary: number;
  countOfSalary: string;

  // Asset Info (Second Form)
  assetCategoryCode: string;
  assetCompanyCode: string;
  assetModelCode: string;
  assetYear: string;
  assetInfoCode: string;
  paperIssueDate: string;
  assetInfoValue: string;

  // Bank Info (Third Form)
  typeOfIdCode: string;
  personalId: string;
  issueDate: string;
  jobCode: string;
  averageMonthlyIncome: number;
  incomeProofCode: string;
  customerMaritalStatusCode: string;
  numberOfChildren: string;
  loanMoney: number;
  paymentMethod: string;
  tenor: string;
}

// export interface CustomerSearchRequest extends BaseSearchParams {
//   code?: string;
//   name?: string;
// }

// export type CustomerSearchResponse = BaseResponse<
//   BaseSearchResponse<CustomerCollectInfoDTO>
// >;
// export type CustomerViewResponse = BaseResponse<CustomerCollectInfoDTO>;
