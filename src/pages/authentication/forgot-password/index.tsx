import { ArrowLeft01Icon, LogoOpenIcon } from '@assets/icons';
import useFormItems from '@hooks/useFormItems';
import { Link } from 'react-router-dom';
import { LOGIN } from '@routers/path';
import { INPUT_TYPE, type TFormItem } from '@types';
import { LayoutWrapper } from '../components';
import { FormContentAuth } from '../components/form-content';
import { FooterAuth } from '../components/footer';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên đăng nhập',
    name: 'code',
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
    inputProps: { placeholder: 'Nhập...', maxLength: 100, type: 'password' },
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
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  return (
    <div>
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Quên mật khẩu"
          subTitle="Nhập thông tin phía dưới để lấy lại mật khẩu"
          textButton="Tiếp tục"
          textLink={
            <Link to={LOGIN} className="dis-flex ai-center gap-6">
              <ArrowLeft01Icon className="w-16 h-16" />
              Quay lại
            </Link>
          }
          formContent={formContent}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default ForgotPassword;
