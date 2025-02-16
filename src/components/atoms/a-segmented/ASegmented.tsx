import { Segmented, type SegmentedProps } from 'antd';
import clsx from 'clsx';
import React from 'react';
import './ASegmented.scss';

interface IASegmented extends SegmentedProps {
  className?: string;
}

const ASegmented: React.FC<IASegmented> = ({ className, ...props }) => {
  const classAntd = clsx('a-segmented', className);

  return <Segmented className={classAntd} {...props} />;
};

export default ASegmented;
