import useMenuList from '@layouts/hooks/useMenuList';
import { Layout, Menu } from 'antd';

const LayoutSider = () => {
  const menuList = useMenuList();

  return (
    <Layout.Sider trigger={null} collapsible width={256} className="h-screen">
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menuList.menu}
      />
    </Layout.Sider>
  );
};

export default LayoutSider;
