import { Flex, Form, Typography } from 'antd';
import './index.scss';
import {
  CalendarFavorite,
  CustomerService,
  Location09Icon,
  LogoDisplay,
  LogoOpenIcon,
} from '@assets/icons';
import useFormItems from '@hooks/useFormItems';
import { AButton } from '@components/atoms';
import { INPUT_TYPE, type TFormItem } from '@types';

const { Title } = Typography;

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
    colProps: { span: 24, className: 'fw-500' },
  },
  {
    type: INPUT_TYPE.PASSWORD,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100, type: 'password' },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const LoginPage = () => {
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [14, 17] },
  });

  return (
    <div>
      <div className="page-login">
        <div className="container">
          <div>
            <LogoOpenIcon />
          </div>

          <Flex align="center" justify="space-between">
            <Flex vertical>
              <Form className="form-login" layout="vertical">
                <Title level={1}>Mừng bạn quay lại</Title>
                <span>Đăng nhập vào tài khoản MB Bank</span>
                {formContent}

                <AButton className="w-full" color="purple" variant="solid">
                  Đăng nhập
                </AButton>
              </Form>

              <span>Quên mật khẩu?</span>
            </Flex>

            <LogoDisplay className="my-4" />
          </Flex>
        </div>
      </div>

      <div className="footer-login">
        <Title level={2}>Liên hệ hỗ trợ</Title>

        <Flex justify="space-between">
          <Flex gap={12}>
            <CustomerService className="h-32 w-32" />
            <Flex vertical>
              <Title level={4}>Gặp tư vấn viên</Title>

              <span
                dangerouslySetInnerHTML={{
                  __html:
                    'Vui lòng gọi để được tư vấn <br />qua hotline 1900 545426',
                }}
              />
            </Flex>
          </Flex>

          <Flex gap={12}>
            <CalendarFavorite className="h-32 w-32" />
            <Flex vertical>
              <Title level={4}>Đặt lịch hẹn</Title>

              <span
                dangerouslySetInnerHTML={{
                  __html:
                    'Tư vấn trực tiếp với chúng tôi<br />tại chi nhánh khi đặt lịch hẹn',
                }}
              />
            </Flex>
          </Flex>

          <Flex gap={12}>
            <Location09Icon className="h-32 w-32" />
            <Flex vertical>
              <Title level={4}>Tìm chi nhánh/ATM</Title>

              <span
                dangerouslySetInnerHTML={{
                  __html: 'Mạng lưới điểm giao dịch tại<br />khu vực gần bạn',
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default LoginPage;
