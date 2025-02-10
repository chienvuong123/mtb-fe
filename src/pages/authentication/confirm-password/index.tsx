/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFormItems from '@hooks/useFormItems';
import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useResetForgotPassword } from '@hooks/queries';
import { getOTPCheck } from '@utils/otpHelper';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, OTP } from '@routers/path';
import { LayoutWrapper } from '../components';
import { FormContentAuth } from '../components/form-content';
import { FooterAuth } from '../components/footer';

import './index.scss';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.PASSWORD,
    label: 'Mật khẩu mới',
    name: 'password',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.PASSWORD,
    label: 'Nhập lại mật khẩu mới',
    name: 'newPassword',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const ConfirmPassword = () => {
  const [alert, setAlert] = useState('');
  const [isReset, setIsReset] = useState(false);

  const navigate = useNavigate();
  const valueValidOtp = getOTPCheck();
  const { mutate: mutateResetForgotPassword, isPending } =
    useResetForgotPassword();

  const handleResetForgotPassword = (values: {
    password: string;
    newPassword: string;
  }) => {
    if (values.password !== values.newPassword) {
      setAlert('Mật khẩu không khớp, vui lòng nhập lại');
      return;
    }

    const data = {
      username: valueValidOtp.username,
      otp: valueValidOtp.otp,
      newPassword: values.newPassword,
    };

    mutateResetForgotPassword(data, {
      onSuccess: (res) => {
        if (res.data) {
          setAlert('Thay đổi mật khẩu thành công');
          setIsReset(true);
        }
      },
    });
  };

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  useEffect(() => {
    if (!isReset) return;

    setTimeout(() => {
      navigate(LOGIN);
    }, 3000);
  }, [isReset]);

  return (
    <div className="confirm-page">
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Nhập mật khẩu mới"
          subTitle="Nhập mật khẩu"
          textButton="Tiếp tục"
          textLink={
            <Link to={OTP} className="dis-flex ai-center gap-6">
              <ArrowLeft01Icon className="w-16 h-16" />
              Quay lại
            </Link>
          }
          alertText={alert}
          typeAlert={isReset ? 'success' : 'error'}
          formContent={formContent}
          isLoading={isPending}
          onFinish={handleResetForgotPassword}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default ConfirmPassword;
