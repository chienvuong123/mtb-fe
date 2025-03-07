import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import type { UserInfoOtpRequest } from '@dtos';
import {
  useVerifyInfoUserForgotPassword,
  useVerifyOtpForgotPasswor,
} from '@hooks/queries';
import useFormItems from '@hooks/useFormItems';
import { CONFIRM_PASSWORD, FORGOT_PASSWORD } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { getOTPCheck, saveOTPCheck } from '@utils/otpHelper';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { LayoutWrapper } from '../components';
import { FooterAuth } from '../components/footer';
import { FormContentAuth } from '../components/form-content';

import './index.scss';

const ERROR_ALLOW = 5;

const OTP = () => {
  const [errorAllowed, setErrorAllowed] = useState(ERROR_ALLOW);
  const [alert, setAlert] = useState('');
  const [form] = useForm();

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
          setErrorAllowed(ERROR_ALLOW);
          saveOTPCheck(valueValidOtp);
          setAlert(`Đã gửi lại OTP vào email đăng ký`);
        }
        throw Error('');
      },
    });
  }, [mutateVerifyInfoUser, valueValidOtp]);

  const handleVerifyOtp = (values: UserInfoOtpRequest) => {
    const data = {
      username: valueValidOtp.username,
      otp: values.otp,
    };

    mutateVerifyOtp(data, {
      onSuccess: (res) => {
        if (res.data) {
          saveOTPCheck({
            ...valueValidOtp,
            otp: values.otp,
          });
          navigate(CONFIRM_PASSWORD);
          return;
        }
        if (res.errorCode === 'AUTH0009') {
          setAlert('');
          handleResendOtp();
          return;
        }

        setErrorAllowed((prev) => {
          if (prev) return prev - 1;

          return 0;
        });
        throw Error('');
      },
      onError: () => {
        if (errorAllowed - 1) {
          setAlert(`Sai mã OTP, bạn còn ${errorAllowed - 1} lần`);
        } else {
          setAlert('');
          handleResendOtp();
        }
      },
    });
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
            <Link to={FORGOT_PASSWORD} className="dis-flex ai-center gap-6">
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
          typeAlert={errorAllowed === ERROR_ALLOW ? 'success' : 'error'}
          formContent={formContent}
          isLoading={isPending || isPendingResendOtp}
          onFinish={handleVerifyOtp}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default OTP;
