import {
  FolderManagementIcon,
  HelpCircleIcon,
  MarketingIcon,
  PieChartIcon,
} from '@assets/icons';
import { Divider } from 'antd';
import { ROUTES } from '@routers/path';
import {
  type MenuItemGroupType,
  type MenuItemType,
  type SubMenuType,
} from 'antd/es/menu/interface';
import { useMemo } from 'react';
import type { PageParams, SortParams } from '@dtos';

type TypeWithSearch<T> = T & { search?: PageParams & SortParams };

type MenuItemTypeWithSearch = TypeWithSearch<MenuItemType>;
type MenuDividerTypeWithSearch = TypeWithSearch<MenuItemType>;
type SubMenuTypeWithSearch = TypeWithSearch<SubMenuType> & {
  children?: MenuItemTypeWithSearch[];
};
type MenuItemGroupTypeWithSearch = TypeWithSearch<MenuItemGroupType>;

type TItemType<T extends MenuItemTypeWithSearch = MenuItemTypeWithSearch> =
  | T
  | SubMenuTypeWithSearch
  | MenuItemGroupTypeWithSearch
  | MenuDividerTypeWithSearch
  | null;

export type TMenuItem = TItemType<MenuItemTypeWithSearch>;

const useMenuList = () => {
  const menuList = useMemo(() => {
    const menuItems: TMenuItem[] = [
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
        key: ROUTES.CATEGORY.ROOT,
        label: 'Quản lý danh mục',
        icon: <FolderManagementIcon />,
        search: {
          current: 1,
          direction: 'desc',
          field: 'createdDate',
          pageSize: 10,
        },
        children: [
          {
            key: ROUTES.CATEGORY.PRODUCT,
            label: 'Sản phẩm',
          },
          {
            key: ROUTES.CATEGORY.CUSTOMER_SEGMENT,
            label: 'Phân khúc khách hàng',
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
    ];

    const menu = menuItems;

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
  }, []);

  return menuList;
};

export default useMenuList;
