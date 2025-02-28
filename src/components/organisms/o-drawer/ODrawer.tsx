import type { TFormType } from '@types';
import { Drawer, type DrawerProps } from 'antd';
import { useMemo, type FC } from 'react';

import './index.scss';

export interface IDrawer extends DrawerProps {
  usePrefixTitle?: boolean;
  mode?: TFormType;
}

const PREFIX_TITLE: Record<TFormType, string> = {
  add: 'Tạo mới',
  edit: 'Chỉnh sửa',
  view: 'Chi tiết',
};

const ODrawer: FC<IDrawer> = ({
  children,
  usePrefixTitle,
  title,
  mode,
  maskClosable = false,
  classNames,
  ...props
}) => {
  const getDrawerTitle = useMemo(() => {
    if (!usePrefixTitle || !mode) return title;
    return `${PREFIX_TITLE[mode]} ${title}`;
  }, [mode, usePrefixTitle, title]);

  return (
    <Drawer
      title={getDrawerTitle}
      maskClosable={maskClosable}
      classNames={{
        body: 'pa-0',
        header: 'py-22 px-40 fs-16 fw-500',
        ...classNames,
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default ODrawer;
