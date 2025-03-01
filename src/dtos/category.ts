import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export enum CategoryType {
  PRODUCT = 'PRODUCT', // "Danh mục đa product"
  MEDIA = 'MEDIA', // "Danh mục đa phương tiện"
  POSITION = 'POSITION', // "Danh mục chức vụ"
  DEPARTMENT = 'DEPARTMENT', // "Danh mục phòng"
  BRANCHES = 'BRANCHES', // "Danh mục chi nhánh"
  EXPERTISE = 'EXPERTISE', // "Danh mục chuyên môn"
  HOBBY = 'HOBBY', // "Danh mục sở thích"
  JOB = 'JOB', // Danh mục nghề nghiệp
  MB_IDENTIFICATION = 'MB_IDENTIFICATION', // Danh mục định danh khách hàng
  CUSTOMER_SEGMENT = 'CUSTOMER_SEGMENT', // Danh mục phân khúc KH

  F88_IDENTIFICATION = 'F88_IDENTIFICATION', // "Danh mục giấy tờ định Danh F88"
  F88_JOB = 'F88_JOB', // "Danh mục nghề nghiệp F88"
  F88_PROOF = 'F88_PROOF', // "Danh mục chứng minh thu nhập F88"
  F88_MARITAL_STATUS = 'F88_MARITAL_STATUS', // "Danh Danh mục tình trạng hôn nhân F88"
  F88_DEBT_REPAYMENT_METHOD = 'F88_DEBT_REPAYMENT_METHOD', // "Danh mục phương thức trả nợ gốc F88"
  F88_GENDER = 'F88_GENDER', // "Danh mục giới tính"
  CUSTOMER_APPROACH_STATUS = 'CUSTOMER_APPROACH_STATUS', // "Danh mục trạng thái tiếp cận"
  CUSTOMER_APPROACH_RESULT = 'CUSTOMER_APPROACH_RESULT', // "Danh mục kết quả tiếp cận"
  CUSTOMER_APPROACH_DETAIL = 'CUSTOMER_APPROACH_DETAIL', // "Danh mục chi tiết tiếp cận"
  CUSTOMER = 'CUSTOMER ', // "Danh mục khách hàng"
  DEPLOYMENT_METHOD = 'DEPLOYMENT_METHOD', // "Phương thức triển khai"
  SUB_PRODUCT = 'SUB_PRODUCT', // "Sub Product"
}

export interface CategoryDTO extends BaseEntity {
  code: string;
  name: string;
  categoryTypeCode: CategoryType;
}

export interface CategorySearchRequest extends BaseSearchParams {
  categoryTypeCode?: CategoryType;
  code?: string;
  name?: string;
  status?: string;
}

export type CategorySearchResponse = BaseResponse<
  BaseSearchResponse<CategoryDTO>
>;

export type CategoryViewResponse = BaseResponse<CategoryDTO>;
