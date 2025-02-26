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
  CUSTOMER,
  MANAGER_CATEGORY,
  SALES_OPPORTUNITIES,
  SCENARIO,
  SELLER,
  SETTING,
} from '@routers/path';
import { Link } from 'react-router-dom';
import OPopup from '@components/organisms/o-popup/OPopup';
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useMemo, useState } from 'react';

const useMenuList = (onLogout?: () => void) => {
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
            label: 'Danh sách Campaign',
          },
          {
            key: `${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CATEGORY}`,
            label: 'Danh sách Category',
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
        key: SALES_OPPORTUNITIES,
        label: 'Quản lý cơ hội bán',
        icon: <MarketingIcon />,
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
        key: SELLER.ROOT,
        label: 'Quản lý Seller',
        icon: <MuslimIcon />,
        children: [
          {
            key: SELLER.ROOT,
            label: 'Danh sách Seller',
          },
          {
            key: `${SELLER.ROOT}/${SELLER.ASSIGNMENT}`,
            label: 'Phân công Seller',
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

    return { menu, menuBottom };
  }, []);

  return menuList;
};

export default useMenuList;
