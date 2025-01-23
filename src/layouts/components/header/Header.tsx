import { Divider, Flex, Layout } from 'antd';
import useMenuList from '@layouts/hooks/useMenuList';
import HeaderNotify from './HeaderNotify';
import HeaderInfo from './HeaderInfo';

const Header = () => {
  const { dropdownList } = useMenuList();

  return (
    <Layout.Header className="bg-white h-75">
      <Flex justify="end" align="center" className="h-full">
        <HeaderNotify />

        <Divider type="vertical" className="h-40 mx-12" />

        <HeaderInfo itemsDropdown={dropdownList} />
      </Flex>
    </Layout.Header>
  );
};

export default Header;
