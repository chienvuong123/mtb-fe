/* eslint-disable no-template-curly-in-string */
import { MessageError } from '@constants/message';
import type { ConfigProviderProps } from 'antd/es/config-provider';

const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    required: MessageError.FIELD_REQUIRE,
    string: {
      max: 'Please enter ${label} within ${max} characters.',
    },
  },
};
export default formConfig;
