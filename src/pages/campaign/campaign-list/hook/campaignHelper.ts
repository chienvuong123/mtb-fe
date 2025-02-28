import type { BaseResponse } from '@dtos';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { downloadFile } from '@utils/fileHelper';
import type { FormInstance, NotificationArgsProps } from 'antd';

const customerError = {
  CUS0003: 'code',
};

export const validateInsertCustomer = <T>(
  { errorCode, errorDesc }: BaseResponse<T>,
  setMsg: (props: NotificationArgsProps) => void,
  onSuccess: () => void,
  form?: FormInstance,
) => {
  if (errorCode === '0') {
    onSuccess();
    return;
  }
  const fieldError = customerError[errorCode as keyof typeof customerError];
  if (errorDesc !== 'SUCCESS') {
    form?.setFields([{ name: fieldError, errors: [errorDesc] }]);
    setMsg({ type: 'error', message: errorDesc });
    return;
  }
  setMsg({ type: 'error', message: 'Đã xảy ra lỗi!' });
};

export const downloadFileByGetMethod = async (
  promise: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<unknown, Error>>,
  fileName?: string,
  onError?: () => void,
) => {
  try {
    const { data: resData } = await promise();
    if (resData) downloadFile(resData as Blob, fileName);
  } catch {
    onError?.();
  }
};
