import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import {
  FolderManagementIcon,
  HelpCircleIcon,
  LogoutIcon,
  MarketingIcon,
  MuslimIcon,
  PieChartIcon,
  Setting02Icon,
} from '@assets/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { CATEGORY } from '@routers/path';

const useMenuList = () => {
  const menuList = useMemo(() => {
    const menu: ItemType<MenuItemType>[] = [
      {
        key: 'main',
        className: 'item-category',
        label: (
          <>
            <Divider />
            <span className="w-full">MAIN</span>
          </>
        ),
      },
      {
        key: '/',
        label: 'Quản lý Category',
        icon: <PieChartIcon />,
      },
      {
        key: 'category',
        label: 'Quản lý Category',
        icon: <MuslimIcon />,
        children: [
          { key: 'category.1', label: 'DS khách hàng Campaign' },
          {
            key: 'category.2',
            label: 'Danh sách nhóm khách hàng theo Campaign',
          },
          { key: 'category.3', label: 'Tạo nhóm khách hàng' },
        ],
      },
      {
        key: CATEGORY.ROOT,
        label: 'Quản lý danh mục',
        icon: <FolderManagementIcon />,
        children: [
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.PRODUCT_CATEGORY}`,
            label: 'Danh mục Product',
          },
        ],
      },
      {
        key: 'help',
        label: 'Trợ giúp',
        icon: <MarketingIcon />,
      },
      {
        key: 'settings',
        className: 'item-category',
        label: (
          <>
            <Divider />
            <span>SETTINGS</span>
          </>
        ),
      },
      {
        key: 'setting.control',
        label: (
          <>
            Cài đặt
            <Link to="/setting/control" />
          </>
        ),
        icon: <Setting02Icon />,
      },
      {
        key: 'example',
        label: (
          <>
            Example
            <Link to="/example" />
          </>
        ),
        icon: <HelpCircleIcon />,
      },
    ];

    const menuBottom = [
      {
        key: 'help',
        label: 'Typography',
        className: 'item-help',
        icon: <HelpCircleIcon />,
      },
      {
        key: 'logout',
        label: 'Flex',
        className: 'item-logout',
        icon: <LogoutIcon />,
      },
    ];

    const dropdownList = [
      { label: 'Cài lại mật khẩu', key: 'reset-password' },
      { label: 'Quên mật khẩu', key: 'forgot-password' },
      { label: 'Đăng xuất', key: 'logout' },
    ];

    return { menu, menuBottom, dropdownList };
  }, []);

  return menuList;
};

export default useMenuList;
