export const validatePassword = async (_: unknown, value: string) => {
  if (!value.trim()) {
    return Promise.reject(new Error('Mật khẩu không được để trống'));
  }
  if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
    return Promise.reject(new Error('Mật khẩu phải bao gồm chữ và số'));
  }
  return Promise.resolve();
};
