/* eslint-disable no-template-curly-in-string */
import type { ConfigProviderProps } from 'antd/es/config-provider';

const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    required: 'Trường này là bắt buộc',
    string: {
      max: 'Please enter ${label} within ${max} characters.',
    },
  },
};
export default formConfig;
