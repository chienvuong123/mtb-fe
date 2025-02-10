/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { LOGIN } from '@routers/path';
import { Navigate } from 'react-router-dom';
import { getOTPCheck } from '@utils/otpHelper';

interface IVerifyGuard {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IVerifyGuard> = ({ children }) => {
  const valueValidOtp = getOTPCheck();

  if (!valueValidOtp) return <Navigate to={LOGIN} replace />;

  return children;
};

export default AuthGuard;
