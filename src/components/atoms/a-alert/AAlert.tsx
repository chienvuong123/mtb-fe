import React from 'react';
import type { AlertProps } from 'antd';
import { Alert } from 'antd';
import { InfoIcon, TickCircle, WarningIcon } from '@assets/icons';

export interface IAAlert extends Omit<AlertProps, 'type'> {
  type?: 'success' | 'error' | 'warning';
}

const iconAlert = {
  success: <TickCircle />,
  error: <WarningIcon />,
  warning: <InfoIcon />,
};

const AAlert: React.FC<IAAlert> = ({ type = 'success', ...props }) => {
  return <Alert icon={iconAlert[type]} showIcon type={type} {...props} />;
};

export default AAlert;
