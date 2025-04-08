import type { ERole } from '@constants/masterData';
import type { CategoryDTO, CategoryType } from '../category';
import type { BaseEntity, BaseResponse, BaseSearchParams } from '../common';

export interface AuthVerifyDTO extends BaseEntity {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
}

export interface AuthOtpDTO extends BaseEntity {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface AuthOtpRequest extends BaseSearchParams {
  categoryTypeCode?: CategoryType;
  code?: string;
  name?: string;
}

export interface UserDTO extends BaseEntity {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  username: string;
  role?: ERole;
  status: string;
  firstName: string;
  fullName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  department: string;
  position: string;
  branch: string;
  expertise: string;
  name?: string;
  employeeCode: string;
  positionDtl: CategoryDTO;
  departmentDtl: CategoryDTO;
  branchDtl: CategoryDTO;
  otp?: string;

  startDate?: string;
  endDate?: string;
  saleManager?: string;
  memberMb?: boolean;
}

export interface UserRequest extends BaseSearchParams {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export type UserViewResponse = BaseResponse<UserDTO>;

export interface AuthRequest {
  username?: string;
  password?: string;
  refreshToken?: string;
}

export interface UserInfoOtpRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
  newPassword?: string;
  otp?: string;
}

export interface ChangePasswordRequest {
  newPassword?: string;
  confirmNewPassword?: string;
  token?: string;
}

export interface AccountRequest extends BaseSearchParams {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: ERole;
  position?: string;
  branch?: string;
  department?: string;
}

export type AuthResponse = AuthVerifyDTO;
