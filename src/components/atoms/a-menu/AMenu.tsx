import React from 'react';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import clsx from 'clsx';

import './AMenu.scss';

export interface IAMenu extends MenuProps {
  className?: string;
}

const AMenu: React.FC<IAMenu> = ({ className, ...props }) => {
  const classAntd = clsx('a-menu', className);

  return <AntdMenu className={classAntd} {...props} />;
};

export default AMenu;
