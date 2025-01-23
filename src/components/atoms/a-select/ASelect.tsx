import React from 'react';
import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';
import { ArrowDown01Icon, VectorIcon } from '@assets/icons';
import clsx from 'clsx';

import './ASelect.scss';

interface IASelect extends SelectProps {
  className?: string;
}

const ASelect: React.FC<IASelect> = ({
  className,
  size,
  popupClassName,
  ...props
}) => {
  const classAntd = clsx('a-select w-full', className);
  const classPopup = clsx('a-select-popup', popupClassName);

  return (
    <AntdSelect
      suffixIcon={size !== 'small' ? <ArrowDown01Icon /> : <VectorIcon />}
      className={classAntd}
      size={size}
      popupClassName={classPopup}
      {...props}
    />
  );
};

export default ASelect;
