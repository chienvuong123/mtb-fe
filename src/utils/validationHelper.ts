import type { BaseResponse } from '@dtos';
import type { NotificationArgsProps } from 'antd';

export const validationHelper = <T>(
  { errorCode, errorDesc }: BaseResponse<T>,
  setMsg: (props: NotificationArgsProps) => void,
  onSuccess: () => void,
) => {
  if (errorCode === '0') {
    onSuccess();
    return;
  }

  setMsg({ type: 'error', message: errorDesc ?? 'Đã xảy ra lỗi!' });
};
