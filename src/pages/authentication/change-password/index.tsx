import { AAlert, AButton } from '@components/atoms';
import type { ChangePasswordRequest } from '@dtos';
import {
  useChangePassword,
  useVerifyTokenChangePassword,
} from '@hooks/queries';
import useFormItems from '@hooks/useFormItems';
import { EXPRIED_CHANGE_PASSWORD, HOME, LOGIN } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { Flex, Form, Spin, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FooterAuth } from '../components/footer';

import './index.scss';

type TInValidate = {
  typeAlertValue?: 'success' | 'error' | 'warning';
  alertTextValue: string;
  pathRedirect?: string;
  isRedirect?: boolean;
};

const { Title } = Typography;

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  CONFIRM: 'Xác nhận',
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const token = searchParams.get('token') ?? '';
  const [form] = Form.useForm();
  const [alertText, setAlertText] = useState('');
  const [typeAlert, setTypeAlert] = useState<'success' | 'error' | 'warning'>(
    'error',
  );

  const validateNoWhitespace = async (_: unknown, value: string) => {
    if (/\s/.test(value)) {
      return Promise.reject(
        new Error('Mật khẩu phải bao gồm chữ, số hoặc ký tự'),
      );
    }
    return Promise.resolve();
  };

  const items: TFormItem[] = useMemo(() => {
    return [
      {
        type: INPUT_TYPE.PASSWORD,
        label: 'Mật khẩu mới',
        name: 'newPassword',
        inputProps: {
          title: 'Tên đăng nhập',
          placeholder: 'Nhập...',
          maxLength: 50,
        },
        colProps: { span: 24, className: 'fw-500' },
        rules: [
          { required: true },
          { min: 8, message: 'Mật khẩu phải dài hơn 8 ký tự' },
          {
            validator: validateNoWhitespace,
          },
        ],
      },
      {
        type: INPUT_TYPE.PASSWORD,
        label: 'Nhập lại mật khẩu mới',
        name: 'confirmNewPassword',
        inputProps: { placeholder: 'Nhập...', maxLength: 50 },
        colProps: { span: 24, className: 'fw-500' },
        dependencies: ['newPassword'],
        validateTrigger: 'onBlur',
        rules: [
          { required: true },
          { min: 8, message: 'Mật khẩu phải dài hơn 8 ký tự' },
          { validator: validateNoWhitespace },
          {
            validator: async (_: unknown, value: string) => {
              if (!value || form.getFieldValue('newPassword') === value) {
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
  }, [form]);

  const { mutate: mutationChangePassword, isPending } = useChangePassword();

  const { mutate: mutationVerifyTokenChangePassword } =
    useVerifyTokenChangePassword();

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const handleCancel = () => {
    navigate(HOME);
  };

  const handleInValidate = ({
    alertTextValue,
    pathRedirect = HOME,
    typeAlertValue = 'success',
    isRedirect = true,
  }: TInValidate) => {
    setTypeAlert(typeAlertValue);
    setAlertText(alertTextValue);
    if (isRedirect) {
      setTimeout(() => {
        navigate(pathRedirect);
      }, 2000);
    }
  };

  const handleVerifyInfoUser = (values: ChangePasswordRequest) => {
    form.validateFields();
    if (!values.confirmNewPassword || !values.newPassword) return;
    if (values.newPassword !== values.confirmNewPassword) {
      setTypeAlert('error');
      setAlertText('Mật khẩu không khớp, vui lòng nhập lại');
      return;
    }
    if (values.newPassword.length < 8 || values.confirmNewPassword.length < 8) {
      setTypeAlert('error');
      setAlertText('Mật khẩu không khớp, vui lòng nhập lại');
      return;
    }
    const result = {
      newPassword: values.newPassword,
      token,
    };
    mutationChangePassword(result, {
      onSuccess: (response) => {
        if (response.data) {
          handleInValidate({
            alertTextValue: 'Thay đổi mật khẩu thành công',
          });
          return;
        }
        if (response.errorCode === 'AUTH0006') {
          handleInValidate({
            typeAlertValue: 'error',
            alertTextValue: response.errorDesc,
            isRedirect: false,
          });
          return;
        }
        handleInValidate({
          typeAlertValue: 'error',
          alertTextValue: response.errorDesc,
          pathRedirect: LOGIN,
        });
      },
    });
  };

  useEffect(() => {
    if (!token) {
      navigate(LOGIN);
      return;
    }

    mutationVerifyTokenChangePassword(
      { token },
      {
        onSuccess: (res) => {
          setIsChecking(false);
          if (!res.data) {
            navigate(EXPRIED_CHANGE_PASSWORD);
          }
        },
      },
    );
  }, [token, mutationVerifyTokenChangePassword, navigate]);

  return (
    <div>
      {isChecking ? (
        <div className="dis-flex jc-center ai-center mt-56">
          <Spin size="large" spinning />
        </div>
      ) : (
        <div>
          <Flex
            align="center"
            justify="center"
            className="form-change-password"
          >
            <Flex vertical>
              <Form
                className="form-container"
                layout="vertical"
                requiredMark="optional"
                form={form}
                onFinish={handleVerifyInfoUser}
              >
                <div>
                  <Title level={2} className="mb-10">
                    Nhập mật khẩu mới
                  </Title>
                  <p className="sub-title">Nhập mật khẩu</p>
                </div>

                {alertText && (
                  <AAlert
                    type={typeAlert ?? 'error'}
                    className="mt-16"
                    message={alertText}
                  />
                )}

                <div className="my-24 form-content">{formContent}</div>

                <div className="group-button">
                  <AButton
                    className="cancel-button w-182"
                    variant="filled"
                    type="primary"
                    onClick={handleCancel}
                  >
                    {BUTTON_TEXT.CANCEL}
                  </AButton>
                  <AButton
                    className="confirm-button w-182"
                    variant="filled"
                    type="primary"
                    htmlType="submit"
                    loading={isPending}
                  >
                    {BUTTON_TEXT.CONFIRM}
                  </AButton>
                </div>
              </Form>
            </Flex>
          </Flex>
          <FooterAuth />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
