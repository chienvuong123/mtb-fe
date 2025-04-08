import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import type { UserInfoOtpRequest } from '@dtos';
import {
  useVerifyInfoUserForgotPassword,
  useVerifyOtpForgotPasswor,
} from '@hooks/queries';
import { useFormItems } from '@hooks';
import { ROUTES } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { getOTPCheck, saveOTPCheck } from '@utils/otpHelper';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'antd/es/form/Form';
import { LayoutWrapper } from '../components';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';

import './index.scss';

const OTP = () => {
  const [alert, setAlert] = useState('');
  const [form] = useForm();
  const otpValue = useWatch('otp', form);

  const navigate = useNavigate();
  const valueValidOtp = getOTPCheck();

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.OTP,
        label: '',
        name: 'otp',
        inputProps: {
          type: 'number',
          onInput: (value) => {
            form.setFieldValue('otp', value.join(''));
          },
        },
        colProps: { span: 24, className: 'fw-500' },
        rules: [
          {
            required: true,
          },
        ],
      },
    ];
    return formItems;
  }, [form]);

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const { mutate: mutateVerifyOtp, isPending } = useVerifyOtpForgotPasswor();
  const { mutate: mutateVerifyInfoUser, isPending: isPendingResendOtp } =
    useVerifyInfoUserForgotPassword();

  const handleResendOtp = useCallback(() => {
    mutateVerifyInfoUser(valueValidOtp, {
      onSuccess: (res) => {
        if (res.data) {
          saveOTPCheck(valueValidOtp);
          setAlert(`Đã gửi lại OTP vào email đăng ký`);
        }
        throw Error('');
      },
    });
  }, [mutateVerifyInfoUser, valueValidOtp]);

  const handleVerifyOtp = (values: UserInfoOtpRequest) => {
    mutateVerifyOtp(
      {
        username: valueValidOtp.username,
        otp: values.otp,
      },
      {
        onSuccess: ({ data, errorCode, errorDesc }) => {
          if (data) {
            saveOTPCheck({
              ...valueValidOtp,
              otp: values.otp,
            });
            navigate(ROUTES.CONFIRM_PASSWORD);
            return;
          }
          if (errorCode === 'AUTH0009') {
            setAlert('');
            handleResendOtp();
            return;
          }

          if (errorCode === 'AUTH00015' || errorCode === 'AUTH00014') {
            setAlert(errorDesc);
          }
          throw Error('');
        },
      },
    );
  };

  return (
    <div className="otp-page">
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          form={form}
          title="Nhập OTP"
          subTitle={
            <>
              Một mã OTP đã được gửi vào email: <br />
              <strong>{valueValidOtp.email}</strong>
            </>
          }
          textButton="Tiếp tục"
          textLink={
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="dis-flex ai-center gap-6"
            >
              <ArrowLeft01Icon className="w-16 h-16" />
              Quay lại
            </Link>
          }
          subLink={
            <>
              Chưa nhận được mail.
              <span
                className="remind-link cursor-pointer"
                onClick={handleResendOtp}
              >
                Gửi lại!
              </span>
            </>
          }
          alertText={alert}
          typeAlert="error"
          formContent={formContent}
          isLoading={isPending || isPendingResendOtp}
          onFinish={handleVerifyOtp}
          disabledSubmit={!otpValue || otpValue?.length < 6}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default OTP;
