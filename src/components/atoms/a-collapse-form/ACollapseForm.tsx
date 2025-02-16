import { Collapse, type CollapseProps } from 'antd';
import clsx from 'clsx';
import React from 'react';
import './ACollapseForm.scss';

interface IACollapseForm extends CollapseProps {
  className?: string;
}

const ACollapseForm: React.FC<IACollapseForm> = ({ className, ...props }) => {
  const classAntd = clsx('a-collapse-form', className);

  return <Collapse className={classAntd} {...props} />;
};

export default ACollapseForm;
