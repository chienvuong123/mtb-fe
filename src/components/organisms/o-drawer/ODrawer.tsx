import { AAlert } from '@components/atoms';
import type { IAAlert } from '@components/atoms/a-alert/AAlert';
import type { TFormType } from '@types';
import { Drawer, type DrawerProps } from 'antd';
import {
  useMemo,
  type FC,
  useState,
  useEffect,
  type SetStateAction,
} from 'react';

import './index.scss';

export type TDrawerMsg = Pick<IAAlert, 'message' | 'type'>;

export interface IDrawer extends DrawerProps {
  usePrefixTitle?: boolean;
  mode?: TFormType;
  alertProps?: IAAlert & {
    duration?: number; // duration (ms)
    setMessage?: React.Dispatch<SetStateAction<TDrawerMsg>>;
  };
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
  alertProps,
  ...props
}) => {
  const getDrawerTitle = useMemo(() => {
    if (!usePrefixTitle || !mode) return title;
    return `${PREFIX_TITLE[mode]} ${title}`;
  }, [mode, usePrefixTitle, title]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!alertProps?.message) return;
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      alertProps?.setMessage?.({});
    }, alertProps?.duration ?? 3000);
  }, [alertProps]);

  return (
    <div>
      {visible && (
        <AAlert
          closable
          onClose={() => setVisible(false)}
          className={`drawer-alert alert-${alertProps?.type}`}
          {...alertProps}
        />
      )}
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
    </div>
  );
};

export default ODrawer;
