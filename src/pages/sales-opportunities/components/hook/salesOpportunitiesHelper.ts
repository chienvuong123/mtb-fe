import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';
import { formatDate } from '@utils/dateHelper';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';
import type { TSalesOpportunitiesRecord } from '../SalesOpportunitiesTable';

export const findCustomerLabelByValue = (value: string): string | null => {
  const foundOption = MOCK_CUSTOMER_OPTIONS.find(
    (option) => option.value === value,
  );
  return foundOption ? foundOption.label : null;
};

export const findCustomerLabelsByValues = (values: string[]): string => {
  return values
    .map(
      (value) =>
        MOCK_CUSTOMER_OPTIONS.find((option) => option.value === value)?.label,
    )
    .filter(Boolean)
    .join(', ');
};

const getCustomerHobbiesLabels = (value?: string | null): string => {
  if (!value) return '';

  const parsedValues: string[] = Array.isArray(value)
    ? value
    : JSON.parse(value);

  const labels = parsedValues.map(
    (val) =>
      MOCK_CUSTOMER_OPTIONS.find((option) => option.value === val)?.label ||
      val,
  );

  return labels.join(', ');
};

export const convertInitValues = (
  initValues: TSalesOpportunitiesRecord,
): Partial<SalesOpportunitiesDTO> => {
  const convertData = {
    key: initValues.id,
    orderId: initValues?.orderId,
    categoryCode: initValues?.categoryCode || initValues?.category?.code,
    categoryName: initValues?.categoryName || initValues?.category?.name,
    campaignCode: initValues?.campaignCode || initValues?.campaign?.code,
    campaignName: initValues?.campaignName || initValues?.campaign?.name,
    updatedDate: initValues?.updatedDate,
    customerCode: initValues?.customerCode || initValues?.customer?.code,
    customerName: initValues?.customerName || initValues?.customer?.name,
    customerPhone: initValues?.mobilePhone,
    customerEmail: initValues?.customerEmail || initValues.customer?.email,
    birthDate: formatDate(initValues?.birthDate ?? ''),
    gender: initValues?.genderCode,
    profession: findCustomerLabelByValue(initValues?.customer?.job ?? ''),
    customerSegment: findCustomerLabelByValue(
      initValues?.customerSegment ?? '',
    ),
    cusGroupName: initValues?.customerGroup?.name,
    branch: findCustomerLabelByValue(initValues?.customer?.branch ?? ''),
    seller: initValues?.customer?.seller,
    hobby: getCustomerHobbiesLabels(initValues?.customer?.hobbies),
    address: initValues?.customer?.address,
    identityCard: initValues?.customer?.identityCard,
    status: initValues?.status,
  } as Partial<SalesOpportunitiesDTO>;

  return convertData;
};
