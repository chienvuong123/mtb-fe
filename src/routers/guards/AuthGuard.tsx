import React, { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useProfile } from '@stores';
import { permissionMatrix } from '@constants/permissionMatrix';
import { ERole } from '@constants/masterData';
import { ROUTES } from '@routers/path';

interface AuthGuardProps {
  children?: React.ReactNode;
}
const specialRouteRegex = /(\/detail\/|\/preview\/)/;

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isPending } = useProfile();
  const location = useLocation();
  const currentPath = location.pathname;

  const hasPermission = useMemo(() => {
    const userRole = user?.role as ERole;

    // Check permission by current path
    if (permissionMatrix[currentPath]?.[userRole]) {
      return true;
    }

    // Handle URL with actual ID -> dynamic path with parameter
    // For example: /campaign/detail/CMP002 needs to compare with /campaign/detail/:id
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length >= 2) {
      // Create pattern URL with :id
      const dynamicPattern = `/${pathSegments.slice(0, -1).join('/')}/:id`;

      // Check permission with key has pattern :id
      if (permissionMatrix[dynamicPattern]?.[userRole]) {
        return true;
      }
    }

    // Check permission on root and special routes
    return Object.keys(permissionMatrix).some((route) => {
      const isNotRootAndSpecial =
        route !== '/' && specialRouteRegex.test(currentPath);
      return (
        isNotRootAndSpecial &&
        currentPath.startsWith(route) &&
        permissionMatrix[route]?.[userRole]
      );
    });
  }, [currentPath, user?.role]);

  if (isPending) return <Skeleton />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/404" replace />;
  }

  return children ?? <Outlet />;
};

export default AuthGuard;
