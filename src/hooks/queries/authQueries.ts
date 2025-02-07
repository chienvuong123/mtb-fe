import { authApi } from '@apis';
import type { AuthRequest, AuthResponse } from '@dtos';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useLoginMutation = (
  options?: Partial<UseMutationOptions<AuthResponse, Error, AuthRequest>>,
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authApi.login(data),
    mutationKey: ['auth-login'],
    ...options,
  });
};

export const useLogoutMutation = (
  options?: Partial<UseMutationOptions<AuthResponse, Error, AuthRequest>>,
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authApi.logout(data),
    mutationKey: ['auth-logout'],
    ...options,
  });
};
