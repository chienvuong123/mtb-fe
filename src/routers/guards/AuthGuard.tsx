import React from 'react';
import { LOGIN } from '@routers/path';
import { Navigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useProfile } from '../../stores';

interface IAuthGuard {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const { isAuthenticated, isPending } = useProfile();

  if (isPending) return <Skeleton />;

  if (!isAuthenticated) return <Navigate to={LOGIN} replace />;

  return children;
};

export default AuthGuard;
