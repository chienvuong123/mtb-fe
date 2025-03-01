import type { CustomerDTO } from '@dtos';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { downloadFile } from '@utils/fileHelper';
import type { TCustomerSearchForm } from './customer.type';

export const parseCustomerObj = ({
  cusSegment,
  cusGroup,
  job,
  ...values
}: Partial<CustomerDTO>) => {
  return {
    cusSegment: cusSegment?.split(','),
    cusGroup: cusGroup?.split(','),
    job: job?.split(','),
    ...values,
  };
};

export const stringifyCustomerObj = ({
  cusSegment,
  cusGroup,
  job,
  ...values
}: Partial<TCustomerSearchForm>) => {
  return {
    cusSegment: cusSegment?.join(','),
    cusGroup: cusGroup?.join(','),
    job: job?.join(','),
    ...values,
  };
};

export const destructCustomerData = (
  {
    id,
    campaignId,
    code,
    name,
    phone,
    email,
    birthday,
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
    identnDocType,
  }: Partial<CustomerDTO>,
  isSearch?: boolean,
) => {
  return isSearch
    ? {
        code,
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
        birthday,
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
        identnDocType,
      };
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
