/* eslint-disable react-hooks/exhaustive-deps */
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import {
  FolderManagementIcon,
  HelpCircleIcon,
  HotPriceIcon,
  LogoutIcon,
  MuslimIcon,
  PieChartIcon,
  Setting02Icon,
} from '@assets/icons';
import { Divider } from 'antd';
import { CATEGORY, ACCOUNT, CUSTOMER } from '@routers/path';
import { Link, useNavigate } from 'react-router-dom';
import OPopup from '@components/organisms/o-popup/OPopup';

const useMenuList = (onLogout?: () => void) => {
  const navigate = useNavigate();
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
        label: 'Dashboard',
        icon: <PieChartIcon />,
      },
      {
        key: 'report',
        label: 'Báo cáo',
        icon: <HotPriceIcon />,
      },
      {
        key: 'category',
        label: 'Quản lý Category',
        icon: <FolderManagementIcon />,
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
        key: CUSTOMER.ROOT,
        label: 'Quản lý khách hàng',
        icon: <MuslimIcon />,
        children: [
          {
            key: `${CUSTOMER.ROOT}/${CUSTOMER.CUSTOMER_CAMPAIGN_LIST}`,
            label: 'DS khách hàng Campaign',
          },
          {
            key: `${CUSTOMER.ROOT}/${CUSTOMER.CUSTOMER_GROUP_CAMPAIGN_LIST}`,
            label: 'Danh sách nhóm khách hàng theo Campaign',
          },
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
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.MEDIA_CATEGORY}`,
            label: 'Loại đa phương tiện',
          },
        ],
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
        label: 'Trợ giúp',
        className: 'item-help',
        icon: <HelpCircleIcon />,
      },
      {
        key: 'logout',
        label: (
          <OPopup
            title="Đăng xuất"
            description="Bạn có chắc muốn đăng xuất?"
            cancelText="Huỷ"
            okText="Xác nhận"
            onOkModal={onLogout}
          >
            <span>Đăng xuất</span>
          </OPopup>
        ),
        className: 'item-logout',
        icon: <LogoutIcon />,
      },
    ];

    const dropdownList = [
      { label: 'Profile', key: 'profile', onClick: () => navigate(ACCOUNT) },
      { label: 'Cài lại mật khẩu', key: 'reset-password' },
      { label: 'Quên mật khẩu', key: 'forgot-password' },
    ];

    return { menu, menuBottom, dropdownList };
  }, []);

  return menuList;
};

export default useMenuList;
