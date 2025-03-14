import {
  ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN,
  ACCEPTING_EMAIL_PATTERN,
  ACCEPTING_PHONE_NUMBER_PATTERN,
  ACCEPTING_TEXT_AND_NO_CHARACTER_PATTERN,
} from '@constants/regex';

export const validatePassword = async (_: unknown, value: string) => {
  if (!ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN.test(value)) {
    return Promise.reject(new Error('Mật khẩu phải bao gồm chữ và số'));
  }
  if (!value.trim()) {
    return Promise.reject(new Error('Mật khẩu không được để trống'));
  }
  return Promise.resolve();
};

export const validatePhoneNumber = async (_: unknown, value: string) => {
  if (!ACCEPTING_PHONE_NUMBER_PATTERN.test(value)) {
    return Promise.reject(new Error('Số điện thoại không hợp lệ'));
  }
  return Promise.resolve();
};

export const validateTextAndNoCharacter = async (_: unknown, value: string) => {
  if (!ACCEPTING_TEXT_AND_NO_CHARACTER_PATTERN.test(value)) {
    return Promise.reject(new Error('Không được nhập ký tự đặc biệt'));
  }
  return Promise.resolve();
};

export const validateEmail = async (_: unknown, value: string) => {
  if (!ACCEPTING_EMAIL_PATTERN.test(value)) {
    return Promise.reject(new Error('Email không hợp lệ'));
  }
  return Promise.resolve();
};
