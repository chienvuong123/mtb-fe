import type { ERole } from '@constants/masterData';
import type {
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
  UserDTO,
} from '@dtos';

export interface AccountManagementSearchRequest extends BaseSearchParams {
  employeeCode?: string;
  username?: string;
  fullName?: string;
  email?: string;
  status?: string;
  role?: ERole;
  position?: string;
  branch?: string;
  department?: string;
}

export type AccountManagementSearchResponse = BaseResponse<
  BaseSearchResponse<UserDTO>
>;

export type AccountManagementViewResponse = BaseResponse<UserDTO>;
