/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { LOGIN } from '@routers/path';
import { Navigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useUserViewQuery } from '@hooks/queries';
import { useUserStore } from '../../stores';

interface IAuthGuard {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const { isAuthenticated, setUser } = useUserStore();

  const { data: userInfo, isPending } = useUserViewQuery({ id: '1' });

  useEffect(() => {
    setUser(userInfo?.data ?? null);
  }, [userInfo]);

  if (isPending) return <Skeleton />;

  if (!isAuthenticated) return <Navigate to={LOGIN} replace />;

  return children;
};

export default AuthGuard;
