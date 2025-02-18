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
  F88_IDENTIFICATION = 'F88_IDENTIFICATION', // "Danh mục giấy tờ định Danh F88"
  F88_JOB = 'F88_JOB', // "Danh mục nghề nghiệp F88"
  F88_PROOF = 'F88_PROOF', // "Danh mục chứng minh thu nhập F88"
  F88_MARITAL_STATUS = 'F88_MARITAL_STATUS', // "Danh Danh mục tình trạng hôn nhân F88"
  F88_DEBT_REPAYMENT_METHOD = 'F88_DEBT_REPAYMENT_METHOD', // "Danh mục phương thức trả nợ gốc F88"
  F88_GENDER = 'F88_GENDER', // "Danh mục giới tính"
  SERVICE = 'SERVICE',
  CAMPAIGN = 'CAMPAIGN',
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
