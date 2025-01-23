/* eslint-disable no-template-curly-in-string */
import type { ConfigProviderProps } from 'antd/es/config-provider';

const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    string: {
      max: 'Please enter ${label} within ${max} characters.',
    },
  },
};

export default formConfig;
