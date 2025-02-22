import { ArrowLeftBlue, LogoDisplay, LogoOpenIcon } from '@assets/icons';
import { LOGIN } from '@routers/path';
import { useNavigate } from 'react-router-dom';
import { LayoutWrapper } from '../components';
import { FooterAuth } from '../components/footer';

import './index.scss';

const ExpriedLinkChangePassword = () => {
  const navigate = useNavigate();
  const handleRedirectLogin = () => {
    navigate(LOGIN);
  };
  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />
        <div className="expried-link-content">
          <div className="left-content">
            <div className="text-expried-wrapper">
              <div className="title">Đường dẫn đã hết hạn</div>
              <div className="sub-title">
                Đường dẫn đã hết hạn, vui lòng đăng nhập lại
              </div>
            </div>

            <div className="text-login" onClick={handleRedirectLogin}>
              <ArrowLeftBlue />
              <div>Đăng nhập</div>
            </div>
          </div>
          <LogoDisplay className="my-4 pb-75" />
        </div>
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default ExpriedLinkChangePassword;
