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

  const { menu, menuBottom } = useMenuList();

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
    let url = key;
    const search = menu.find((i) => i?.key && key.includes(i.key as string))
      ?.search as unknown as Record<string, string>;
    if (search) {
      url = `${url}?${new URLSearchParams(search).toString()}`;
    }

    navigate(url);
    setSelectedKey([key]);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    const rootPath = getFirstPathname(pathname);
    setSelectedKey([pathname, rootPath]);
    setOpenKeys([rootPath]);
  }, [pathname]);

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

          <div className="c-menu pos-sticky bottom-0 bg-white z-1000">
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
