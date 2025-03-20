import React from 'react';
import { Input, type GetProps } from 'antd';

import './AInputArea.scss';
import clsx from 'clsx';

const { TextArea } = Input;

const countFormatter = ({
  count,
  maxLength,
}: {
  count: number;
  maxLength?: number;
}) => (
  <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
    ({count}/{maxLength})
  </span>
);

const AInputArea: React.FC<GetProps<typeof TextArea>> = ({
  className,
  ...props
}) => {
  const classAntd = clsx('a-input-area', className);

  return (
    <TextArea
      showCount={{
        formatter: countFormatter,
      }}
      {...props}
      className={classAntd}
    />
  );
};

export default AInputArea;
