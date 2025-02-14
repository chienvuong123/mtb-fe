import type { BaseResponse, CustomerDTO } from '@dtos';
import type { FormInstance } from 'antd';

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
        hobbies: JSON.stringify(hobbies),
        identification: JSON.stringify(identification),
      };
};

export const validateInsertCustomer = (
  { errorCode, errorDesc }: BaseResponse<boolean>,
  form: FormInstance,
  callback: () => void,
) => {
  if (errorCode === '0') {
    callback();
    return;
  }
  const fieldError = customerError[errorCode as keyof typeof customerError];
  if (fieldError) {
    form.setFields([{ name: fieldError, errors: [errorDesc] }]);
  }
};
