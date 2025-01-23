import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import ADMIN_URL_PATHS from '~admin/_shared/layout/constants/urlPaths';

const useMenuList = () => {
  const menuList = useMemo(() => {
    const menu: ItemType<MenuItemType>[] = [
      // {
      //   key: '1',
      //   icon: <i className="ri-route-fill" />,
      //   label: <Link to={ADMIN_URL_PATHS.HOME}>Home</Link>,
      // },
      // {
      //   key: '2',
      //   icon: <i className="ri-file-list-3-line" />,
      //   label: <Link to={ADMIN_URL_PATHS.EXAMPLE}>Example</Link>,
      // },
    ];

    return menu;
  }, []);

  return menuList;
};

export default useMenuList;
