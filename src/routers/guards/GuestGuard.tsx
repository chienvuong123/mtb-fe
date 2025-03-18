import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { useProfile } from '../../stores';

interface IGuestGuard {
  children: React.ReactNode;
}

const GuestGuard: React.FC<IGuestGuard> = ({ children }) => {
  const { isAuthenticated } = useProfile();

  if (isAuthenticated) return <Navigate to={ROUTES.HOME} />;

  return children;
};

export default GuestGuard;
