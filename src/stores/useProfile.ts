import { ERole } from '@constants/masterData';
import { useUserInfoQuery } from '@hooks/queries';
import { LOGIN } from '@routers/path';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProfile = () => {
  const navigate = useNavigate();

  const { data: userInfo, isPending } = useUserInfoQuery();
  const token = localStorage.getItem('token') ?? '';
  const refreshToken = localStorage.getItem('refresh_token') ?? '';
  const userData = userInfo?.data;

  useEffect(() => {
    if (!token) {
      navigate(LOGIN);
    }
  }, [navigate, token]);

  return {
    user: userData,
    isPending,
    isAuthenticated: token ?? !!userData?.id,
    refreshToken,
    isAdmin: userData?.role === ERole.ADMIN,
    isCampaignManager: userData?.role === ERole.CAMPAIGN_MANAGER,
    isSellerManager: userData?.role === ERole.SELLER_MANAGER,
    isSeller: userData?.role === ERole.SELLER,
  };
};

export default useProfile;
