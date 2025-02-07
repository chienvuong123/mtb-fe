import useFormItems from '@hooks/useFormItems';
import { LogoOpenIcon } from '@assets/icons';
import { INPUT_TYPE, type TFormItem } from '@types';
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
    name: 'new-password',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    colProps: { span: 24, className: 'fw-500' },
  },
];

const ConfirmPassword = () => {
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  return (
    <div className="confirm-page">
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Nhập mật khẩu mới"
          subTitle="Nhập mật khẩu"
          textButton="Tiếp tục"
          textLink="Quay lại"
          formContent={formContent}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default ConfirmPassword;
