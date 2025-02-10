import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import useFormItems from '@hooks/useFormItems';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, OTP } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useVerifyInfoUserForgotPassword } from '@hooks/queries';
import type { UserInfoOtpRequest } from '@dtos';
import { useState } from 'react';
import { saveOTPCheck } from '@utils/otpHelper';
import { LayoutWrapper } from '../components';
import { FormContentAuth } from '../components/form-content';
import { FooterAuth } from '../components/footer';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên đăng nhập',
    name: 'username',
    inputProps: {
      title: 'Tên đăng nhập',
      placeholder: 'Nhập...',
      maxLength: 20,
    },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'email',
    inputProps: { placeholder: 'Nhập...', maxLength: 100, type: 'email' },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Số điện thoại',
    name: 'phoneNumber',
    inputProps: { placeholder: 'Nhập...', maxLength: 100, type: 'number' },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState('');
  const { mutate: mutateVerifyInfoUser, isPending } =
    useVerifyInfoUserForgotPassword();

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const handleVerifyInfoUser = (values: UserInfoOtpRequest) => {
    setAlert('');
    const data = {
      email: values.email,
      username: values.username,
      phoneNumber: values.phoneNumber,
    };

    mutateVerifyInfoUser(data, {
      onSuccess: (res) => {
        if (res.data) {
          navigate(OTP);
          saveOTPCheck(data);
        }
        throw Error('');
      },
      onError: () => {
        setAlert('Tài khoản hoặc email không tồn tại');
      },
    });
  };

  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Quên mật khẩu"
          subTitle="Nhập thông tin phía dưới để lấy lại mật khẩu"
          textButton="Tiếp tục"
          alertText={alert}
          textLink={
            <Link to={LOGIN} className="dis-flex ai-center gap-6">
              <ArrowLeft01Icon className="w-16 h-16" />
              Quay lại
            </Link>
          }
          formContent={formContent}
          isLoading={isPending}
          onFinish={handleVerifyInfoUser}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default ForgotPassword;
