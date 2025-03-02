import React, { useEffect, useState } from 'react';
import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import clsx from 'clsx';

import './Sider.scss';

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  LogoCollapsed,
  LogoOpenIcon,
} from '@assets/icons';
import { AButton } from '@components/atoms';
import AMenu from '@components/atoms/a-menu/AMenu';
import useMenuList from '@layouts/hooks/useMenuList';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirstPathname } from '@utils/stringHelper';
import { useLogoutMutation } from '@hooks/queries';
import { LOGIN } from '@routers/path';

const { Sider } = Layout;

const LSider: React.FC<LayoutProps> = ({ className, ...props }) => {
  const classAntd = clsx('l-slider', className);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [actualActive, setActualAction] = useState(false);

  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const isShowIcon = isCollapsed === actualActive;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: mutateLogout } = useLogoutMutation();

  const handleLogout = () => {
    mutateLogout(
      {
        refresh_token: localStorage.getItem('refresh_token') ?? '',
      },
      {
        onSuccess: () => {
          localStorage.clear();
          navigate(LOGIN);
        },
      },
    );
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLElement).classList.contains('btn-slider')) {
      return;
    }
    setIsCollapsed(false);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLElement).classList.contains('btn-slider')) {
      return;
    }
    setIsCollapsed(actualActive);
  };

  const handleItemOpen = () => {
    setIsCollapsed((prev) => !prev);
    setActualAction((prev) => !prev);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKey([key]);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    setSelectedKey([pathname]);
    setOpenKeys([getFirstPathname(pathname)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { menu, menuBottom } = useMenuList(handleLogout);
  return (
    <div className="pos-relative">
      {isShowIcon && (
        <AButton
          className="btn-slider rounded-8 border-gray-10 z-10"
          size="small"
          icon={
            isCollapsed ? (
              <ArrowRight01Icon className="h-16 w-16" />
            ) : (
              <ArrowLeft01Icon className="h-16 w-16" />
            )
          }
          onClick={handleItemOpen}
        />
      )}
      <Sider
        theme="light"
        collapsed={isCollapsed}
        className={classAntd}
        collapsedWidth={87}
        width={265}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="dis-flex flex-column jc-space-between h-full">
          <div>
            <div className="min-h-44">
              {isCollapsed ? <LogoCollapsed /> : <LogoOpenIcon />}
            </div>
            <AMenu
              selectedKeys={selectedKey}
              openKeys={openKeys}
              items={menu}
              mode="inline"
              className={clsx({ 'is-collapsed': isCollapsed })}
              onClick={handleMenuClick}
              onOpenChange={handleOpenChange}
            />
          </div>

          <div className="c-menu">
            <AMenu
              items={menuBottom}
              mode="inline"
              className="menu-not-active"
            />
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default LSider;
