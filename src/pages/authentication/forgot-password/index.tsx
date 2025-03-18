import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import type { UserInfoOtpRequest } from '@dtos';
import { useVerifyInfoUserForgotPassword } from '@hooks/queries';
import { useFormItems } from '@hooks';
import { ROUTES } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { saveOTPCheck } from '@utils/otpHelper';
import { Form } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutWrapper } from '../components';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';

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
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Email',
    name: 'email',
    inputProps: { placeholder: 'Nhập...', maxLength: 50, type: 'email' },
    colProps: { span: 24, className: 'fw-500' },
    rules: [
      { required: true },
      { type: 'email', message: 'Định dạng email không hợp lệ' },
    ],
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Số điện thoại',
    name: 'phoneNumber',
    inputProps: {
      placeholder: 'Nhập...',
      maxLength: 10,
      type: 'number',
      onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      },
    },
    colProps: { span: 24, className: 'fw-500' },
    rules: [{ required: true }],
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [alert, setAlert] = useState('');
  const { mutate: mutateVerifyInfoUser, isPending } =
    useVerifyInfoUserForgotPassword();

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const handleVerifyInfoUser = (values: UserInfoOtpRequest) => {
    form.validateFields();
    setAlert('');
    const data = {
      email: values.email,
      username: values.username,
      phoneNumber: values.phoneNumber,
    };

    mutateVerifyInfoUser(data, {
      onSuccess: (res) => {
        if (res.data) {
          navigate(ROUTES.OTP);
          saveOTPCheck(data);
          return;
        }
        setAlert(res.errorDesc);
      },
    });
  };

  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          requiredMark="optional"
          form={form}
          title="Quên mật khẩu"
          subTitle="Nhập thông tin phía dưới để lấy lại mật khẩu"
          textButton="Tiếp tục"
          alertText={alert}
          textLink={
            <Link to={ROUTES.LOGIN} className="dis-flex ai-center gap-6">
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
