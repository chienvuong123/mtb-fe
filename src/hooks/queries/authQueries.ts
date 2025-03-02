import { authApi } from '@apis';
import type {
  AuthRequest,
  AuthResponse,
  BaseResponse,
  ChangePasswordRequest,
  UserInfoOtpRequest,
} from '@dtos';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useLoginMutation = (
  options?: Partial<
    UseMutationOptions<BaseResponse<AuthResponse>, Error, AuthRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authApi.login(data),
    mutationKey: ['auth-login'],
    ...options,
  });
};

export const useLogoutMutation = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, AuthRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authApi.logout(data),
    mutationKey: ['auth-logout'],
    ...options,
  });
};

export const useVerifyInfoUserForgotPassword = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, UserInfoOtpRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: UserInfoOtpRequest) =>
      authApi.verifyInfoUserForgotPassword(data),
    mutationKey: ['auth-verify-info-user'],
    ...options,
  });
};

export const useVerifyOtpForgotPasswor = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, UserInfoOtpRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: UserInfoOtpRequest) =>
      authApi.verifyOtpForgotPassword(data),
    mutationKey: ['auth-verify-otp'],
    ...options,
  });
};

export const useVerifyTokenChangePassword = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, ChangePasswordRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      authApi.verifyInfoTokenChangePassword(data),
    mutationKey: ['auth-verify-token-change-pass'],
    ...options,
  });
};

export const useResetForgotPassword = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, UserInfoOtpRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: UserInfoOtpRequest) => authApi.resetForgotPassword(data),
    mutationKey: ['auth-reset-password'],
    ...options,
  });
};

export const useRequestChangePassword = (
  options?: Partial<UseMutationOptions<BaseResponse<boolean>, Error>>,
) => {
  return useMutation({
    mutationFn: () => authApi.requestChangePassword(),
    mutationKey: ['auth-request-change-password'],
    ...options,
  });
};

export const useChangePassword = (
  options?: Partial<
    UseMutationOptions<BaseResponse<boolean>, Error, ChangePasswordRequest>
  >,
) => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    mutationKey: ['auth-change-password'],
    ...options,
  });
};
