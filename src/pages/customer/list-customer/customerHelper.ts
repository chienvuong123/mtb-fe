import type { TDrawerMsg } from '@components/organisms';
import type { BaseResponse, CustomerDTO } from '@dtos';
import type { FormInstance } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

const customerError = {
  CUS0003: 'code',
};

export const destructCustomerData = (
  {
    id,
    campaignId,
    code,
    name,
    phone,
    email,
    birthDay: birthday,
    gender,
    address,
    identityCard,
    seller,
    categoryId,
    branch,
    cusGroup,
    cusSegment,
    job,
    categoryName,
    campaignName,
    hobbies,
    identification,
  }: Partial<CustomerDTO>,
  isSearch?: boolean,
) => {
  const birthDay = birthday;
  return isSearch
    ? {
        categoryId,
        categoryName,
        campaignId,
        campaignName,
        id,
        name,
        email,
        cusSegment,
        phone,
        job,
        cusGroup,
      }
    : {
        id,
        campaignId,
        code,
        name,
        phone,
        email,
        birthDay,
        gender,
        address,
        identityCard,
        seller,
        categoryId,
        branch,
        cusGroup,
        cusSegment,
        job,
        categoryName,
        campaignName,
        hobbies,
        identification,
      };
};

export const validateInsertCustomer = (
  { errorCode, errorDesc }: BaseResponse<boolean>,
  form: FormInstance,
  setMsg: Dispatch<SetStateAction<TDrawerMsg>>,
  callback: () => void,
) => {
  if (errorCode === '0') {
    callback();
    return;
  }
  const fieldError = customerError[errorCode as keyof typeof customerError];
  if (fieldError) {
    form.setFields([{ name: fieldError, errors: [errorDesc] }]);
    setMsg({ type: 'error', message: errorDesc });
    return;
  }
  setMsg({ type: 'error', message: 'Đã xảy ra lỗi!' });
};
