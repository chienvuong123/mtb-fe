import type { TDrawerMsg } from '@components/organisms';
import type { BaseResponse } from '@dtos';
import type { Dispatch, SetStateAction } from 'react';

export const validateInsertCategory = (
  { errorCode, errorDesc }: BaseResponse<boolean>,
  setMsg: Dispatch<SetStateAction<TDrawerMsg>>,
  onSuccess: () => void,
) => {
  if (errorCode === '0') {
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
