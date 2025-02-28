/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext } from 'react';
import { notification, type NotificationArgsProps } from 'antd';
import { CloseIcon, InfoIcon, TickCircle, WarningIcon } from '@assets/icons';
import type { IconType } from 'antd/es/notification/interface';

const iconAlert: Record<IconType, React.ReactNode> = {
  success: <TickCircle />,
  error: <WarningIcon />,
  warning: <InfoIcon />,
  info: null,
};

const NotificationContext = createContext<
  (props: NotificationArgsProps) => void
>(() => {});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider
      value={(props) =>
        api.open({
          ...props,
          icon: props?.type ? iconAlert[props.type] : null,
          closeIcon: <CloseIcon />,
        })
      }
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
