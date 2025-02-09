import type { UserDTO, UserRequest, UserViewResponse } from '@dtos';
import { userApi } from '@apis';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useViewQuery: useUserViewQuery,
  useEditMutation: useUserEditMutation,
} = createBaseQueryHooks<UserDTO, UserRequest, UserViewResponse>(
  'user',
  userApi,
);
