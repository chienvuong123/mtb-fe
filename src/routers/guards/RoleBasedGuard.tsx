import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../../stores';

export interface RoleBasedGuardProps {
  accessibleRoles: string[];
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({ accessibleRoles }) => {
  const { user, isAuthenticated } = useProfile();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (
    accessibleRoles.length &&
    user?.role &&
    !accessibleRoles.includes(user.role)
  ) {
    return <Navigate to="/404" replace />;
  }
  return <Outlet />;
};

export default RoleBasedGuard;
