import { Collapse, type CollapseProps } from 'antd';
import clsx from 'clsx';
import React from 'react';
import './ACollapse.scss';

interface IACollapse extends CollapseProps {
  className?: string;
}

const ACollapse: React.FC<IACollapse> = ({ className, ...props }) => {
  const classAntd = clsx('', className);

  return <Collapse className={classAntd} {...props} />;
};

export default ACollapse;
