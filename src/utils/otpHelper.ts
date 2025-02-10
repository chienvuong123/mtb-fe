interface IValueOtp {
  email?: string;
  username?: string;
  phoneNumber?: string;
}

const keyOtpValid = 'valid_otp';

export const saveOTPCheck = (values: IValueOtp) => {
  const expirationTime = Date.now() + 14 * 60 * 1000;

  localStorage.setItem(
    keyOtpValid,
    JSON.stringify({ value: values, expires: expirationTime }),
  );
};

export const getOTPCheck = () => {
  const storedCheck = localStorage.getItem(keyOtpValid);

  if (storedCheck) {
    const checkObj = JSON.parse(storedCheck);
    const currentTime = Date.now();

    if (currentTime < checkObj.expires) {
      return checkObj.value;
    }
    localStorage.removeItem(keyOtpValid);
    return false;
  }

  return false;
};

export const removeOTPCheck = () => {
  localStorage.removeItem(keyOtpValid);
};
