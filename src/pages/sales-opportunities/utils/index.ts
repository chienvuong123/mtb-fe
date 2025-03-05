import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';

export const convertInitValues = (
  initValues: SalesOpportunitiesDTO,
): Partial<SalesOpportunitiesDTO> => {
  const convertData = {
    key: initValues.id,
    orderId: initValues?.orderId,
    categoryCode: initValues?.customer?.categoryCampaign?.code,
    categoryName: initValues?.customer?.categoryCampaign?.name,
    campaignCode: initValues?.customer?.campaign?.code,
    campaignName: initValues?.customer?.campaign?.name,
    customerCode: initValues?.customer?.code,
    customerName: initValues?.customer?.name,
    customerPhone: initValues?.customer?.phone,
    customerEmail: initValues?.customer?.email,
    birthDate: initValues?.customer?.birthday,
    gender: initValues?.customer?.genderCategory?.name,
    profession: initValues?.customer?.jobCategory?.name,
    customerSegment: initValues?.customer?.customerSegment?.name,
    cusGroupName: initValues?.customer?.customerGroup?.name,
    branch: initValues?.customer?.branchCategory?.name,
    seller: initValues?.customer?.sellerEntity?.name,
    address: initValues?.customer?.address,
    identityCard: initValues?.customer?.identityCard,
    identnDocType: initValues?.customer?.identnDocTypeCategory?.name,
    status: initValues?.statusDtl?.name,
    limitAmount: initValues?.limitAmount,
    assetName: initValues?.assetNameDtl?.name,
    categoryAssetName: initValues?.categoryAssetDtl?.name,
    loanStatusDtl: initValues?.loanStatusDtl,
  } as Partial<SalesOpportunitiesDTO>;

  return convertData;
};
