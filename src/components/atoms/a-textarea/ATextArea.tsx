import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import clsx from 'clsx';
import React from 'react';
import './ATextArea.scss';

interface IATextArea extends TextAreaProps {
  className?: string;
}

const ATextArea: React.FC<IATextArea> = ({ className, ...props }) => {
  const classAntd = clsx('a-textarea', className);

  return <Input.TextArea className={classAntd} {...props} />;
};

export default ATextArea;
