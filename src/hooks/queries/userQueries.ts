import type { UserDTO, UserRequest, UserViewResponse } from '@dtos';
import { userApi } from '@apis';
import { useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const { useEditMutation: useUserEditMutation } = createBaseQueryHooks<
  UserDTO,
  UserRequest,
  UserViewResponse
>('user', userApi);

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user', 'info'],
    queryFn: () => userApi.getUserInfo(),
  });
};
