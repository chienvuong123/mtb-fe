import React from 'react';
import { Tag, type TagProps } from 'antd';
import clsx from 'clsx';

interface IATag extends TagProps {
  className?: string;
}

const ATag: React.FC<IATag> = ({ className, children, ...props }) => {
  const classAntd = clsx('px-12 py-4 border-none', className);

  return (
    <Tag className={classAntd} {...props}>
      {children}
    </Tag>
  );
};

export default ATag;
