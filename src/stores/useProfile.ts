import { ERole } from '@constants/masterData';
import { permissionMatrix } from '@constants/permissionMatrix';
import { useUserInfoQuery } from '@hooks/queries';
import { useCallback } from 'react';

const useProfile = () => {
  const { data: userInfo, isPending, refetch } = useUserInfoQuery();
  const token = localStorage.getItem('token') ?? '';
  const refreshToken = localStorage.getItem('refresh_token') ?? '';
  const userData = userInfo?.data;

  const hasPermission = useCallback(
    (key: string) => {
      return permissionMatrix?.[key]?.[userData?.role as ERole] || false;
    },
    [userData?.role],
  );
  return {
    user: userData,
    isPending,
    isAuthenticated: token ?? !!userData?.id,
    refreshToken,
    isAdmin: userData?.role === ERole.ADMIN,
    isCampaignManager: userData?.role === ERole.CAMPAIGN_MANAGER,
    isSellerManager: userData?.role === ERole.SELLER_MANAGER,
    isSeller: userData?.role === ERole.SELLER,
    isReporter: userData?.role === ERole.REPORTER,
    hasPermission,
    refetch,
  };
};

export default useProfile;
