import { ViewIcon } from '@assets/icons';
import { Input, type InputProps } from 'antd';
import React, { useCallback } from 'react';

const AInputPassword: React.FC<InputProps> = ({ ...props }) => {
  const iconRender = useCallback(
    (visible: boolean) => (visible ? <ViewIcon /> : <ViewIcon />),
    [],
  );

  return <Input.Password iconRender={iconRender} {...props} />;
};

export default AInputPassword;
