import React from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd/lib';
import clsx from 'clsx';

import './AInputOtp.scss';

type TOTPProps = GetProps<typeof Input.OTP>;

const { OTP } = Input;

const InputOtp: React.FC<TOTPProps> = ({ className, ...props }) => {
  const classAntd = clsx('a-input-otp', className);

  return <OTP className={classAntd} {...props} />;
};

export default InputOtp;
