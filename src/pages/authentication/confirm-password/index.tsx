/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import { useResetForgotPassword } from '@hooks/queries';
import useFormItems from '@hooks/useFormItems';
import { LOGIN, OTP } from '@routers/path';
import { getOTPCheck } from '@utils/otpHelper';
import { Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INPUT_TYPE, type TFormItem } from '@types';
import { LayoutWrapper } from '../components';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';

import './index.scss';

const ConfirmPassword = () => {
  const [form] = Form.useForm();

  const [alert, setAlert] = useState('');
  const [isReset, setIsReset] = useState(false);

  const items: TFormItem[] = useMemo(() => {
    return [
      {
        type: INPUT_TYPE.PASSWORD,
        label: 'Mật khẩu mới',
        name: 'password',
        inputProps: { placeholder: 'Nhập...', maxLength: 50 },
        colProps: { span: 24, className: 'fw-500' },
        rules: [
          { required: true },
          { min: 8, message: 'Mật khẩu phải dài hơn 8 ký tự' },
        ],
      },
      {
        type: INPUT_TYPE.PASSWORD,
        label: 'Nhập lại mật khẩu mới',
        name: 'newPassword',
        inputProps: { placeholder: 'Nhập...', maxLength: 50 },
        colProps: { span: 24, className: 'fw-500' },
        dependencies: ['password'],
        rules: [
          { required: true },
          { min: 8, message: 'Mật khẩu phải dài hơn 8 ký tự' },
          {
            validator: async (_: unknown, value: string) => {
              if (!value || form.getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Mật khẩu không khớp, vui lòng nhập lại'),
              );
            },
          },
        ],
      },
    ];
  }, []);

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
          form={form}
          requiredMark="optional"
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
