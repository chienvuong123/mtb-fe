import type { CustomerDTO } from '@dtos';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { downloadFile } from '@utils/fileHelper';

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
    identnDocType,
    startNumberOfCalls,
    endNumberOfCalls,
    approachResultStatus,
    levelKyc,
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
        startNumberOfCalls,
        endNumberOfCalls,
        approachResultStatus,
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
        identnDocType,
        levelKyc,
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
