import { LogoOpenIcon } from '@assets/icons';
import { INPUT_TYPE, type TFormItem } from '@types';
import useFormItems from '@hooks/useFormItems';
import { Link } from 'react-router-dom';
import { FORGOT_PASSWORD } from '@routers/path';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';
import { LayoutWrapper } from '../components';

import './index.scss';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên đăng nhập',
    name: 'code',
    inputProps: {
      title: 'Tên đăng nhập',
      placeholder: 'Nhập...',
      maxLength: 20,
    },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.PASSWORD,
    label: 'Mật khẩu',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100, type: 'password' },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const LoginPage = () => {
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Mừng bạn quay lại"
          subTitle="Đăng nhập vào tài khoản MB Bank"
          textButton="Đăng nhập"
          textLink={<Link to={FORGOT_PASSWORD}>Quên mật khẩu?</Link>}
          formContent={formContent}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default LoginPage;
