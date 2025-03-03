import { Layout } from 'antd';
import { LayoutContent, LayoutHeader, LayoutSider } from './components';
import './index.scss';

const LayoutWrapper = () => {
  return (
    <Layout className="min-h-screen">
      <LayoutSider />
      <Layout>
        <LayoutHeader />
        <LayoutContent />
      </Layout>
    </Layout>
  );
};
export default LayoutWrapper;
