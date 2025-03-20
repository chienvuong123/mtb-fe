import React, { useMemo, useState, type CSSProperties } from 'react';
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
  const [open, setOpen] = useState(false);

  const style = useMemo(() => {
    return {
      rotate: open ? '180deg' : '0deg',
      transition: 'rotate 0.2s',
    } as CSSProperties;
  }, [open]);

  return (
    <AntdSelect
      suffixIcon={
        size !== 'small' ? (
          <ArrowDown01Icon style={style} />
        ) : (
          <VectorIcon style={style} />
        )
      }
      className={classAntd}
      size={size}
      popupClassName={classPopup}
      allowClear={false}
      onDropdownVisibleChange={(opened) => setOpen(opened)}
      {...props}
    />
  );
};

export default ASelect;
