/* eslint-disable react-hooks/exhaustive-deps */
import {
  FolderManagementIcon,
  HelpCircleIcon,
  HotPriceIcon,
  LogoutIcon,
  MarketingIcon,
  MuslimIcon,
  PieChartIcon,
  Setting02Icon,
  Target02Icon,
} from '@assets/icons';
import { Divider } from 'antd';
import {
  CATEGORY,
  ACCOUNT,
  CUSTOMER,
  MANAGER_CATEGORY,
  SCENARIO,
  SETTING,
} from '@routers/path';
import { Link, useNavigate } from 'react-router-dom';
import OPopup from '@components/organisms/o-popup/OPopup';
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useMemo, useState } from 'react';

const useMenuList = (onLogout?: () => void, onRequestChangePw?: () => void) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
          {
            key: `${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CAMPAIGN}`,
            label: 'DS khách hàng Campaign',
          },
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
          {
            key: `${CUSTOMER.ROOT}/customer-1234`,
            label: 'Chi tiết (CSKH)',
          },
        ],
      },
      {
        key: SCENARIO.ROOT,
        label: 'Quản lý kịch bản',
        icon: <Target02Icon />,
        children: [
          {
            key: `${SCENARIO.ROOT}/${SCENARIO.LIST}`,
            label: 'Danh sách kịch bản',
          },
          {
            key: `${SCENARIO.ROOT}/${SCENARIO.CREATE}`,
            label: 'Tạo kịch bản',
          },
          {
            key: `${SCENARIO.ROOT}/abcs-1234`,
            label: 'Chi tiết kịch bản',
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
        key: `${SETTING.ROOT}/${SETTING.CONTROL}`,
        label: 'Cài đặt',
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
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
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
      {
        label: 'Cài lại mật khẩu',
        key: 'reset-password',
        onClick: onRequestChangePw,
      },
    ];

    return { menu, menuBottom, dropdownList };
  }, []);

  return menuList;
};

export default useMenuList;
