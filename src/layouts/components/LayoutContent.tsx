import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const LayoutContent = () => {
  return (
    <Layout>
      <Layout.Content className="pb-40 px-40">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default LayoutContent;
