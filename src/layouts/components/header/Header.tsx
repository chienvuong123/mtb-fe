import { useRequestChangePassword } from '@hooks/queries';
import useMenuList from '@layouts/hooks/useMenuList';
import { Divider, Flex, Layout } from 'antd';
import HeaderInfo from './HeaderInfo';
import HeaderNotify from './HeaderNotify';

const Header = () => {
  const { mutate: mutateRequestChangePassword } = useRequestChangePassword();

  const handleRequestChangePw = () => {
    console.log('cp');
    mutateRequestChangePassword(undefined, {
      onSuccess: (data) => {
        console.log(data, 'success');
      },
    });
  };
  const { dropdownList } = useMenuList(undefined, handleRequestChangePw);

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
