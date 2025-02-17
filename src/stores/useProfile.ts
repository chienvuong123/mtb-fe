import { useUserInfoQuery } from '@hooks/queries';

const useProfile = () => {
  const { data: userInfo, isPending } = useUserInfoQuery();
  const token = localStorage.getItem('token') ?? '';
  const refreshToken = localStorage.getItem('refresh_token') ?? '';

  const userData = userInfo?.data;

  return {
    user: userData,
    isPending,
    isAuthenticated: token ?? !!userData?.id,
    refreshToken,
  };
};

export default useProfile;
