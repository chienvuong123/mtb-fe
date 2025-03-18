/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ROUTES } from '@routers/path';
import { Navigate } from 'react-router-dom';
import { getOTPCheck } from '@utils/otpHelper';

interface IVerifyGuard {
  children: React.ReactNode;
}

const VerifyGuard: React.FC<IVerifyGuard> = ({ children }) => {
  const valueValidOtp = getOTPCheck();

  if (!valueValidOtp) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
};

export default VerifyGuard;
