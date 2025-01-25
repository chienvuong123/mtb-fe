import useFormItems from '@hooks/useFormItems';
import { LogoOpenIcon } from '@assets/icons';
import { Link } from 'react-router-dom';
import { INPUT_TYPE, type TFormItem } from '@types';
import { LayoutWrapper } from '../components';
import { FormContentAuth } from '../components/form-content';
import { FooterAuth } from '../components/footer';

import './index.scss';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.OTP,
    label: '',
    name: 'code',
    inputProps: {},
    colProps: { span: 24, className: 'fw-500' },
  },
];

const OTP = () => {
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [0, 16] },
  });

  return (
    <div className="otp-page">
      <LayoutWrapper>
        <LogoOpenIcon />

        <FormContentAuth
          title="Nhâp OTP"
          subTitle={
            <>
              Một mã OTP đã được gửi vào email: <br />
              <strong>dhiendt@gmail.com</strong>
            </>
          }
          textButton="Tiếp tục"
          textLink="Quay lại"
          subLink={
            <>
              Chưa nhận được mail.{' '}
              <Link to="/#" className="remind-link">
                Bấm vào đây!
              </Link>
            </>
          }
          formContent={formContent}
        />
      </LayoutWrapper>

      <FooterAuth />
    </div>
  );
};

export default OTP;
