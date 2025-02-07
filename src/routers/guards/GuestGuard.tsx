import React from 'react';
import { Navigate } from 'react-router-dom';
import { HOME } from '@routers/path';
import { useUserStore } from '../../stores';

interface IGuestGuard {
  children: React.ReactNode;
}

const GuestGuard: React.FC<IGuestGuard> = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) return <Navigate to={HOME} />;

  return children;
};

export default GuestGuard;
