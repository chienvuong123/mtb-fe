import React from 'react';
import { Dropdown, type DropDownProps, type MenuProps } from 'antd';
import clsx from 'clsx';

import './ADropdown.scss';

export interface IADropdown extends DropDownProps {
  items: MenuProps['items'];
}

const ADropdown: React.FC<IADropdown> = ({
  items,
  className,
  overlayClassName,
  children,
  ...props
}) => {
  const classAntd = clsx('a-dropdown', className);
  const classOverlay = clsx('a-overlay-dropdown', overlayClassName);

  return (
    <Dropdown
      menu={{ items }}
      className={classAntd}
      {...props}
      overlayClassName={classOverlay}
    >
      {children}
    </Dropdown>
  );
};

export default ADropdown;
