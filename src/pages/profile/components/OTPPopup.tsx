import { AButton, AInputOtp, AModal } from '@components/atoms';
import { Button, Flex, Typography, type ModalProps } from 'antd';
import { useEffect, useState, type FC } from 'react';

const OTPPopup: FC<
  ModalProps & {
    email: string;
    onSubmit: (otp: string) => void;
    onResendOtp: () => void;
  }
> = ({
  onCancel,
  okText = 'Tiếp tục',
  cancelText = 'Hủy',
  classNames,
  email,
  loading,
  onSubmit,
  onResendOtp,
  ...props
}) => {
  const [otpValue, setOtpValue] = useState('');

  useEffect(() => {
    if (!props.open) {
      setOtpValue('');
    }
  }, [props.open]);

  return (
    <AModal
      classNames={{ content: 'pa-32', ...classNames }}
      footer={
        <div>
          <Flex justify="center" align="center" gap={24}>
            <AButton
              className="w-180"
              variant="filled"
              color="geekblue"
              onClick={onCancel}
            >
              {cancelText}
            </AButton>
            <AButton
              className="w-180"
              color="purple"
              variant="solid"
              onClick={() => onSubmit(otpValue)}
              disabled={otpValue.length < 6 || loading}
            >
              {okText}
            </AButton>
          </Flex>
          <Typography.Text className="dis-block text-start mt-24">
            Chưa nhận được mail, vui lòng kiểm tra thư rác/spam hoặc <br />
            <Button
              type="link"
              className="red pa-0 w-fit h-fit dis-inline min-w-0"
              onClick={onResendOtp}
              disabled={loading}
            >
              Bấm vào đây!
            </Button>
          </Typography.Text>
        </div>
      }
      centered
      className="w-fit"
      closeIcon={null}
      {...props}
    >
      <div>
        <Typography.Title level={2}>Nhập OTP</Typography.Title>
        <Typography.Text className="fs-16 mt-10" style={{ color: '#5A5A5A' }}>
          Một mã OTP đã được gửi vào email: <br />
          <strong>{email}</strong>
        </Typography.Text>
        <Flex justify="center" className="mt-14 mb-20">
          <AInputOtp
            value={otpValue}
            onInput={(e) => {
              setOtpValue(e.join(''));
            }}
          />
        </Flex>
      </div>
    </AModal>
  );
};

export default OTPPopup;
