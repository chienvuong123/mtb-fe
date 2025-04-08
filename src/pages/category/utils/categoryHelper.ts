import { EResponseCode } from '@constants/responseCode';
import type { BaseResponse } from '@dtos';
import type { NotificationArgsProps } from 'antd';

export const validateInsertCategory = (
  { errorCode, errorDesc }: BaseResponse<boolean>,
  setMsg: (props: NotificationArgsProps) => void,
  onSuccess: () => void,
) => {
  if (errorCode === EResponseCode.SUCCESS) {
    onSuccess();
    return;
  }
  if (errorDesc) {
    setMsg({ type: 'error', message: errorDesc });
    return;
  }
  setMsg({ type: 'error', message: 'Đã xảy ra lỗi!' });
};

export const getTableIndex = (
  idx: number,
  currentPage: number = 1,
  pageSize: number = 10,
): number => {
  return (currentPage - 1) * pageSize + idx + 1;
};
