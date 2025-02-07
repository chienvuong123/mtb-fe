import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores';

export interface RoleBasedGuardProps {
  accessibleRoles: string[];
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({ accessibleRoles }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (accessibleRoles.length && !accessibleRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
};

export default RoleBasedGuard;
