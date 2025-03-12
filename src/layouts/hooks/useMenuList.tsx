import {
  FloppyDiskIcon,
  FolderManagementIcon,
  HelpCircleIcon,
  MarketingIcon,
  MuslimIcon,
  PieChartIcon,
  Setting02Icon,
  Target02Icon,
  UserSettingsIcon,
} from '@assets/icons';
import { Divider } from 'antd';
import {
  ACCOUNT_MANAGEMENT,
  CATEGORY,
  CUSTOMER,
  MANAGER_CAMPAIGN,
  MULTIMEDIA_WAREHOUSE,
  SALES_OPPORTUNITIES,
  SCENARIO,
  SELLER,
  SETTING,
} from '@routers/path';
import { Link } from 'react-router-dom';
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import { useProfile } from '@stores';

const useMenuList = () => {
  const { isSellerManager, isSeller, isAuthenticated } = useProfile();

  const menuList = useMemo(() => {
    if (!isAuthenticated) return { menu: [], menuBottom: [] };

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
        disabled: true,
      },
      {
        key: 'category',
        label: 'Quản lý chiến dịch',
        icon: <FolderManagementIcon />,
        children: [
          {
            key: `${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CAMPAIGN}`,
            label: 'Danh sách Campaign',
          },
          {
            key: `${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CATEGORY}`,
            label: 'Danh sách Category',
            disabled: isSeller,
          },
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
          // {
          //   key: `${SCENARIO.ROOT}/${SCENARIO.CREATE}`,
          //   label: 'Tạo kịch bản',
          //   disabled: isSeller || isSellerManager,
          // },
          // {
          //   key: `${SCENARIO.ROOT}/${SCENARIO.DETAIL}`,
          //   label: 'Chi tiết kịch bản',
          // },
        ],
      },
      {
        key: SELLER.ROOT,
        label: 'Quản lý Seller',
        icon: <MuslimIcon />,
        disabled: isSeller,
        children: [
          {
            key: `${SELLER.ROOT}/${SELLER.LIST}`,
            label: 'Danh sách Seller',
          },
          {
            key: `${SELLER.ROOT}/${SELLER.ASSIGNMENT}`,
            label: 'Phân công Seller',
          },
        ],
      },
      {
        key: MULTIMEDIA_WAREHOUSE,
        label: 'Kho đa phương tiện',
        icon: <FloppyDiskIcon />,
        disabled: isSellerManager || isSeller,
      },
      {
        key: ACCOUNT_MANAGEMENT,
        label: 'Quản lý tài khoản',
        icon: <UserSettingsIcon />,
        disabled: isSellerManager || isSeller,
      },
      {
        key: CATEGORY.ROOT,
        label: 'Quản lý danh mục',
        icon: <FolderManagementIcon />,
        disabled: isSellerManager || isSeller,
        children: [
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.PRODUCT_CATEGORY}`,
            label: 'Sản phẩm',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.MEDIA_CATEGORY}`,
            label: 'Loại đa phương tiện',
            disabled: isSeller,
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.POSITON_CATEGORY}`,
            label: 'Chức vụ',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.BRANCH_CATEGORY}`,
            label: 'Chi nhánh',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.HOBBY_CATEGORY}`,
            label: 'Sở thích',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.CUSTOMER_SEGMENT_CATEGORY}`,
            label: 'Phân khúc khách hàng',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.JOB_CATEGORY}`,
            label: 'Nghề nghiệp',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.CUSTOMER_GROUP_CATEGORY}`,
            label: 'Nhóm khách hàng',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.DEPARTMENT_CATEGORY}`,
            label: 'Phòng ban',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.EXPERSITE_CATEGORY}`,
            label: 'Chuyên môn',
          },
          {
            key: `${CATEGORY.ROOT}/${CATEGORY.CAMPAIGN_TYPE}`,
            label: 'Loại chiến dịch',
          },
        ],
      },
      {
        key: 'help',
        label: 'Trợ giúp',
        icon: <MarketingIcon />,
        disabled: true,
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
        disabled: isSeller || isSellerManager,
      },
      {
        key: `${SETTING.ROOT}/${SETTING.CONTROL}`,
        label: 'Cài đặt',
        icon: <Setting02Icon />,
        disabled: isSeller || isSellerManager,
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
        disabled: true,
      },
    ];

    const menuBottom = [
      {
        key: 'help',
        label: 'Trợ giúp',
        className: 'item-help',
        icon: <HelpCircleIcon />,
        disabled: true,
      },
    ];

    return { menu, menuBottom };
  }, [isSeller, isSellerManager, isAuthenticated]);

  return menuList;
};

export default useMenuList;
