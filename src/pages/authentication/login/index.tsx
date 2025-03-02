import { LogoOpenIcon } from '@assets/icons';
import { INPUT_TYPE, type TFormItem } from '@types';
import useFormItems from '@hooks/useFormItems';
import { Link, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD, HOME } from '@routers/path';
import { useLoginMutation } from '@hooks/queries';
import { useState } from 'react';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';
import { LayoutWrapper } from '../components';

import './index.scss';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên đăng nhập',
    name: 'username',
    inputProps: {
      title: 'Tên đăng nhập',
      placeholder: 'Nhập...',
      maxLength: 50,
    },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.PASSWORD,
    label: 'Mật khẩu',
    name: 'password',
    inputProps: { placeholder: 'Nhập...', maxLength: 50, type: 'password' },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const LoginPage = () => {
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const { mutate: mutateLogin, isPending } = useLoginMutation();
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const handleLogin = (values: { username: string; password: string }) => {
    mutateLogin(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess(value) {
          localStorage.setItem('token', value.data.accessToken);
          localStorage.setItem('refresh_token', value.data.refreshToken);
          navigate(HOME);
        },
        onError() {
          setAlert('Thông tin đăng nhập không đúng');
        },
      },
    );
  };

  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Mừng bạn quay lại"
          subTitle="Đăng nhập vào tài khoản MB Bank"
          textButton="Đăng nhập"
          alertText={alert}
          isLoading={isPending}
          textLink={<Link to={FORGOT_PASSWORD}>Quên mật khẩu?</Link>}
          formContent={formContent}
          onFinish={handleLogin}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default LoginPage;
