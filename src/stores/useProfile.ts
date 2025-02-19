import { ERole } from '@constants/masterData';
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
    isAdmin: userData?.role === ERole.ADMIN,
    isCampaignManager: userData?.role === ERole.CAMPAIGN_MANAGER,
    isSaleManager: userData?.role === ERole.SALE_LEADER,
    isSeller: userData?.role === ERole.SELLER,
  };
};

export default useProfile;
