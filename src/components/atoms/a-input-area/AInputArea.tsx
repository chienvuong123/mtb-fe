import React from 'react';
import { Input, type GetProps } from 'antd';

import './AInputArea.scss';
import clsx from 'clsx';

const { TextArea } = Input;

const AInputArea: React.FC<GetProps<typeof TextArea>> = ({
  className,
  ...props
}) => {
  const classAntd = clsx('a-input-area', className);

  return <TextArea {...props} className={classAntd} />;
};

export default AInputArea;
