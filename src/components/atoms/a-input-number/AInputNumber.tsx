import { ArrowDown01Icon, ArrowUp01Icon } from '@assets/icons';
import { InputNumber, type InputNumberProps } from 'antd';
import clsx from 'clsx';
import type { FC } from 'react';

import './AInputNumber.scss';

const AInputNumber: FC<InputNumberProps> = ({
  className,
  controls,
  size = 'large',
  ...props
}) => {
  return (
    <InputNumber
      className={clsx('a-input-number w-full fs-14 ', className)}
      controls={
        controls
          ? {
              upIcon: <ArrowUp01Icon />,
              downIcon: <ArrowDown01Icon />,
            }
          : false
      }
      parser={(value) => {
        if (!value) return '';
        return value.replace(/[^0-9]/g, '');
      }}
      onKeyDown={(e) => {
        const regex = /^[0-9]+$/;
        const { key } = e;
        if (key.length === 1 && !regex.test(key)) {
          e.preventDefault();
        }
      }}
      size={size}
      {...props}
    />
  );
};

export default AInputNumber;
