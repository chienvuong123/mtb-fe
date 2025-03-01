import type { BaseResponse } from '@dtos';
import type { NotificationArgsProps } from 'antd';

export const validationHelper = <T>(
  { errorCode }: BaseResponse<T>,
  setMsg: (props: NotificationArgsProps) => void,
  onSuccess: () => void,
) => {
  if (errorCode === '0') {
    onSuccess();
    return;
  }

  setMsg({ type: 'error', message: 'Đã xảy ra lỗi!' });
};
