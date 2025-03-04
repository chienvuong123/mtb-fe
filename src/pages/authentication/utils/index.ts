import { ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN } from '@constants/regex';

export const validatePassword = async (_: unknown, value: string) => {
  if (!ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN.test(value)) {
    return Promise.reject(new Error('Mật khẩu phải bao gồm chữ và số'));
  }
  if (!value.trim()) {
    return Promise.reject(new Error('Mật khẩu không được để trống'));
  }
  return Promise.resolve();
};
