import { Breadcrumb, Layout } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const LayoutContent = () => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const breadcrumbItems = pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const title = snippet.charAt(0).toUpperCase() + snippet.slice(1);

      return {
        title: <Link to={url}>{title}</Link>,
      };
    });

    return [{ title: <Link to="/">Trang chủ</Link> }, ...breadcrumbItems];
  };

  return (
    <Layout>
      <Layout.Content className="pb-40 px-40">
        <Breadcrumb items={getBreadcrumbItems()} className="my-4" />
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default LayoutContent;
