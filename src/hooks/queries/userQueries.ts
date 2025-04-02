import type { UserDTO, UserRequest, UserViewResponse } from '@dtos';
import { userApi } from '@apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const USER_KEY = 'user';

export const { useEditMutation: useUserEditMutation } = createBaseQueryHooks<
  UserDTO,
  UserRequest,
  UserViewResponse
>(USER_KEY, userApi);

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user', 'info'],
    queryFn: () => userApi.getUserInfo(),
    enabled: !!localStorage.getItem('token'),
  });
};

export const useUserSendOtpUpdateEmailMutation = () => {
  return useMutation({
    mutationKey: [USER_KEY, 'send-otp-update-email'],
    mutationFn: (data: UserDTO) => userApi.sendOtpUpdateEmail(data),
  });
};

export const useUserVerifyOtpUpdateEmailMutation = () => {
  return useMutation({
    mutationKey: [USER_KEY, 'verify-otp-update-email'],
    mutationFn: (otp: string) => userApi.verifyOtpUpdateEmail(otp),
  });
};
