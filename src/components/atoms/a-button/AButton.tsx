import React from 'react';
import { Button, type ButtonProps } from 'antd';
import clsx from 'clsx';

import './AButton.scss';

const AButton: React.FC<ButtonProps> = ({
  children,
  size,
  className,
  icon,
  ...props
}) => {
  const classAntd = clsx('a-button', className, {
    'min-w-115': !icon && !size,
  });

  return (
    <Button className={classAntd} size={size} icon={icon} {...props}>
      {children}
    </Button>
  );
};

export default AButton;
