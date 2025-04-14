import { OPopup } from '@components/organisms';
import { Divider, Flex, Layout } from 'antd';
import { useState } from 'react';
import { LogoutIcon } from '@assets/icons';
import HeaderInfo from './HeaderInfo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRequestChangePw = () => {};

  const handleLogout = () => {};

  const dropdownList = [
    {
      label: 'Profile',
      key: 'profile',
    },
    {
      label: 'Đổi mật khẩu',
      key: 'reset-password',
      onClick: handleRequestChangePw,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      className: 'text-logout',
      icon: <LogoutIcon />,
      onClick: () => setIsOpen(true),
    },
  ];

  return (
    <Layout.Header className="bg-white h-75">
      <Flex justify="flex-end" align="center" className="h-full">
        {/* <HeaderNotify /> */}

        <Divider type="vertical" className="h-40 mx-12" />

        <HeaderInfo itemsDropdown={dropdownList} />
      </Flex>

      <div>
        <OPopup
          title="Đăng xuất"
          description="Bạn có chắc muốn đăng xuất?"
          cancelText="Huỷ"
          okText="Xác nhận"
          onOkModal={handleLogout}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <span />
        </OPopup>
        ;
      </div>
    </Layout.Header>
  );
};

export default Header;
