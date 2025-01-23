import { LayoutContent, LayoutSider } from '@layouts/components';
import { formConfig, themeConfig } from '@libs/antd';
import { ConfigProvider, Layout } from 'antd';

const AdminLayoutWrapper = () => {
  return (
    <ConfigProvider theme={themeConfig} form={formConfig}>
      <Layout>
        <LayoutSider />
        <LayoutContent />
      </Layout>
    </ConfigProvider>
  );
};
export default AdminLayoutWrapper;
