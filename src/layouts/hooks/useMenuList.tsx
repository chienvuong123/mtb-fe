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
import { ROUTES } from '@routers/path';
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useCallback, useMemo } from 'react';
import { useProfile } from '@stores';

const useMenuList = () => {
  const { isAuthenticated, hasPermission } = useProfile();

  const addPermissionCheck = useCallback(
    (items: ItemType<MenuItemType>[]) => {
      return items.map((item) => {
        if (!item) return item;

        if (
          typeof item.key === 'string' &&
          (item.key === 'main' ||
            item.key === 'settings' ||
            item.key.startsWith('divider'))
        ) {
          return item;
        }

        if ('children' in item && item.children) {
          const newItem = {
            ...item,
            disabled: !hasPermission(item.key as string),
          };
          newItem.children = addPermissionCheck(
            newItem.children as ItemType<MenuItemType>[],
          );
          return newItem;
        }

        if (typeof item.key === 'string') {
          return {
            ...item,
            disabled: !hasPermission(item.key),
          };
        }

        return item;
      });
    },
    [hasPermission],
  );

  const menuList = useMemo(() => {
    if (!isAuthenticated) return { menu: [], menuBottom: [] };

    const menuItems: ItemType<MenuItemType>[] = [
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
        key: ROUTES.DASHBOARD,
        label: 'Dashboard',
        icon: <PieChartIcon />,
      },
      {
        key: ROUTES.CAMPAIGN.ROOT,
        label: 'Quản lý chiến dịch',
        icon: <FolderManagementIcon />,
        children: [
          {
            key: ROUTES.CAMPAIGN.LIST,
            label: 'Danh sách Campaign',
          },
          {
            key: ROUTES.CAMPAIGN.CATEGORY.LIST,
            label: 'Danh sách Category',
          },
        ],
      },
      {
        key: ROUTES.CUSTOMER.ROOT,
        label: 'Quản lý khách hàng',
        icon: <MuslimIcon />,
        children: [
          {
            key: ROUTES.CUSTOMER.LIST,
            label: 'DS khách hàng Campaign',
          },
          {
            key: ROUTES.CUSTOMER.GROUP,
            label: 'Danh sách nhóm khách hàng theo Campaign',
          },
        ],
      },
      {
        key: ROUTES.SALES.OPPORTUNITIES,
        label: 'Quản lý cơ hội bán',
        icon: <MarketingIcon />,
      },
      {
        key: ROUTES.SCENARIO.ROOT,
        label: 'Quản lý kịch bản',
        icon: <Target02Icon />,
        children: [
          {
            key: ROUTES.SCENARIO.LIST,
            label: 'Danh sách kịch bản',
          },
        ],
      },
      {
        key: ROUTES.SELLER.ROOT,
        label: 'Quản lý Seller',
        icon: <MuslimIcon />,
        children: [
          {
            key: ROUTES.SELLER.LIST,
            label: 'Danh sách Seller',
          },
          {
            key: ROUTES.SELLER.ASSIGNMENT,
            label: 'Phân công Seller',
          },
        ],
      },
      {
        key: ROUTES.MULTIMEDIA_WAREHOUSE,
        label: 'Kho đa phương tiện',
        icon: <FloppyDiskIcon />,
      },
      {
        key: ROUTES.ACCOUNT.MANAGEMENT,
        label: 'Quản lý tài khoản',
        icon: <UserSettingsIcon />,
      },
      {
        key: ROUTES.CATEGORY.ROOT,
        label: 'Quản lý danh mục',
        icon: <FolderManagementIcon />,
        children: [
          {
            key: ROUTES.CATEGORY.PRODUCT,
            label: 'Sản phẩm',
          },
          {
            key: ROUTES.CATEGORY.MEDIA,
            label: 'Loại đa phương tiện',
          },
          {
            key: ROUTES.CATEGORY.POSITION,
            label: 'Chức vụ',
          },
          {
            key: ROUTES.CATEGORY.BRANCH,
            label: 'Chi nhánh',
          },
          {
            key: ROUTES.CATEGORY.DEPLOYMENT_METHOD,
            label: 'Phương thức triển khai',
          },
          {
            key: ROUTES.CATEGORY.CUSTOMER_SEGMENT,
            label: 'Phân khúc khách hàng',
          },
          {
            key: ROUTES.CATEGORY.UNIT_CALCULATION,
            label: 'Đơn vị tính',
          },
          {
            key: ROUTES.CATEGORY.CUSTOMER_TYPE,
            label: 'Loại khách hàng',
          },
          {
            key: ROUTES.CATEGORY.DEPARTMENT,
            label: 'Phòng ban',
          },
          {
            key: ROUTES.CATEGORY.EXPERTISE,
            label: 'Chuyên môn',
          },
          {
            key: ROUTES.CATEGORY.IDENTIFICATION_TYPE,
            label: 'Loại giấy tờ định danh',
          },
          {
            key: ROUTES.CATEGORY.APPROACH,
            label: 'Phương thức tiếp cận',
          },
          {
            key: ROUTES.CATEGORY.GENDER,
            label: 'Giới tính',
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
        key: ROUTES.SETTING.ROOT,
        label: 'Cài đặt',
        icon: <Setting02Icon />,
        children: [
          {
            key: ROUTES.SETTING.CONTROL,
            label: 'Danh mục control',
          },
        ],
      },
    ];

    const menu = addPermissionCheck(menuItems);

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
  }, [isAuthenticated, addPermissionCheck]);

  return menuList;
};

export default useMenuList;
