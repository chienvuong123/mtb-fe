import { OPopup } from '@components/organisms';
import { useRequestChangePassword } from '@hooks/queries';
import { ACCOUNT } from '@routers/path';
import { useProfile } from '@stores';
import { Divider, Flex, Layout, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInfo from './HeaderInfo';
import HeaderNotify from './HeaderNotify';

const Header = () => {
  const navigate = useNavigate();

  const { mutate: mutateRequestChangePassword, isPending } =
    useRequestChangePassword();
  const { user } = useProfile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(true);

  const handleRequestChangePw = () => {
    mutateRequestChangePassword(undefined, {
      onSuccess: (res) => {
        setIsPopupOpen(true);
        if (res.data) {
          setIsRequestSuccess(true);
          return;
        }
        setIsRequestSuccess(false);
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
      <Flex justify="flex-end" align="center" className="h-full">
        <HeaderNotify />

        <Divider type="vertical" className="h-40 mx-12" />

        <HeaderInfo itemsDropdown={dropdownList} />
      </Flex>

      <div>
        {isPending ? (
          <div className="dis-flex jc-center ai-center mt-56">
            <Spin size="large" />
          </div>
        ) : (
          <OPopup
            title="Thông báo"
            description={
              isRequestSuccess ? (
                <div style={{ textAlign: 'center' }}>
                  Một đường dẫn đổi mật khẩu đã được gửi tới mail: <br />
                  <strong>{user?.email}</strong>, vui lòng truy cập vào mail để
                  tiếp tục.
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  Đường dẫn đổi mật khẩu đã được gửi, bạn vui lòng <br />
                  kiểm tra hộp thư/Spam và làm theo hướng dẫn.
                </div>
              )
            }
            okText="Đóng"
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onOkModal={() => setIsPopupOpen(false)}
          >
            <div />
          </OPopup>
        )}
      </div>
    </Layout.Header>
  );
};

export default Header;
