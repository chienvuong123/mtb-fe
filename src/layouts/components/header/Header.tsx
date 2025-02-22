import { OPopup } from '@components/organisms';
import { useRequestChangePassword } from '@hooks/queries';
import { ACCOUNT } from '@routers/path';
import { useProfile } from '@stores';
import { Divider, Flex, Layout } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInfo from './HeaderInfo';
import HeaderNotify from './HeaderNotify';

const Header = () => {
  const navigate = useNavigate();

  const { mutate: mutateRequestChangePassword } = useRequestChangePassword();
  const { user } = useProfile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRequestChangePw = () => {
    mutateRequestChangePassword(undefined, {
      onSuccess: (res) => {
        if (res.data) {
          setIsPopupOpen(true);
        }
      },
    });
  };

  const dropdownList = [
    { label: 'Profile', key: 'profile', onClick: () => navigate(ACCOUNT) },
    {
      label: 'Đổi mật khẩu',
      key: 'reset-password',
      onClick: handleRequestChangePw,
    },
  ];

  return (
    <Layout.Header className="bg-white h-75">
      <Flex justify="end" align="center" className="h-full">
        <HeaderNotify />

        <Divider type="vertical" className="h-40 mx-12" />

        <HeaderInfo itemsDropdown={dropdownList} />
      </Flex>

      <OPopup
        title="Thông báo"
        description={
          <div style={{ textAlign: 'center' }}>
            Một đường dẫn đổi mật khẩu đã được gửi tới mail: <br />
            <strong>{user?.email}</strong>, vui lòng truy cập vào mail để tiếp
            tục.
          </div>
        }
        okText="Đóng"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onOkModal={() => setIsPopupOpen(false)}
      >
        <div />
      </OPopup>
    </Layout.Header>
  );
};

export default Header;
