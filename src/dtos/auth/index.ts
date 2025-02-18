import type { CategoryType } from '../category';
import type { BaseEntity, BaseResponse, BaseSearchParams } from '../common';

export interface AuthVerifyDTO extends BaseEntity {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
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
  role: string;
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
}

export interface UserRequest extends BaseSearchParams {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export type UserViewResponse = BaseResponse<UserDTO>;

export interface AuthRequest {
  client_id?: string;
  client_secret?: string;
  username?: string;
  password?: string;
  refresh_token?: string;
  grant_type?: string;
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
}

export type AuthResponse = AuthVerifyDTO;
