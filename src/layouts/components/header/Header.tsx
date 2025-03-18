import { OPopup } from '@components/organisms';
import { useLogoutMutation, useRequestChangePassword } from '@hooks/queries';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import { Divider, Flex, Layout, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '@assets/icons';
import { useQueryClient } from '@tanstack/react-query';
import HeaderInfo from './HeaderInfo';

const Header = () => {
  const navigate = useNavigate();

  const { mutate: mutateRequestChangePassword, isPending } =
    useRequestChangePassword();
  const { user } = useProfile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateLogout } = useLogoutMutation();

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

  const handleLogout = () => {
    mutateLogout(
      {
        refreshToken: localStorage.getItem('refresh_token') ?? '',
      },
      {
        onSuccess: () => {
          localStorage.clear();
          navigate(ROUTES.LOGIN);
          queryClient.clear();
        },
      },
    );
  };

  const dropdownList = [
    {
      label: 'Profile',
      key: 'profile',
      onClick: () => navigate(ROUTES.ACCOUNT_PROFILE),
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
