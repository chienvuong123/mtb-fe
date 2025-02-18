import { AAlert, AButton } from '@components/atoms';
import type { ChangePasswordRequest } from '@dtos';
import { useChangePassword } from '@hooks/queries';
import useFormItems from '@hooks/useFormItems';
import { HOME } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { Flex, Form, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FooterAuth } from '../components/footer';

import './index.scss';

const { Title } = Typography;

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  CONFIRM: 'Xác nhận',
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [form] = Form.useForm();
  const [alertText, setAlertText] = useState('');
  const [typeAlert, setTypeAlert] = useState<'success' | 'error' | 'warning'>(
    'error',
  );

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
        ],
      },
      {
        type: INPUT_TYPE.PASSWORD,
        label: 'Nhập lại mật khẩu mới',
        name: 'confirmNewPassword',
        inputProps: { placeholder: 'Nhập...', maxLength: 50 },
        colProps: { span: 24, className: 'fw-500' },
        dependencies: ['newPassword'],
        rules: [
          { required: true },
          { min: 8, message: 'Mật khẩu phải dài hơn 8 ký tự' },
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

  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  const handleCancel = () => {
    navigate(HOME);
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
          setTypeAlert('success');
          setAlertText('Thay đổi mật khẩu thành công');
          return;
        }
        setTypeAlert('error');
        setAlertText(response.errorDesc);
      },
    });
  };

  return (
    <div>
      <Flex align="center" justify="center" className="form-change-password">
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
  );
};

export default ChangePassword;
