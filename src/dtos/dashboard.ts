import type { BaseEntity, BaseResponse, BaseSearchResponse } from './common';

export interface TStatisticsCampaignDTO extends BaseEntity {
  nameCampaign: string;
  campaignId: string;
  totalCustomer: number;
  totalCustomerApproached: string;
  totalCustomerUnreached: string;
  campaignName: string;
  customersNotContacted: number;
  customersInProgress: number;
  customersContactedSuccessfully: number;
  customersContactedUnsuccessfully: number;
  customersFailedToContact: number;
}

export interface IStatisticsCustomerOfDay {
  contactedCustomers: number;
  totalCampaign: number;
  totalCustomers: number;
}

export interface IStatisticsCustomerOfApproach {
  notContacted: number;
  inContact: number;
  successful: number;
  notSuccessfulYet: number;
  unSuccessful: number;
}

export interface IStatisticsCustomerCallStats {
  date: string;
  totalCustomerApproach: number;
  totalCalled: number;
  month: string;
  day: string;
  year: string;
}

export interface DashboardSearchRequest {
  startDate: string;
  endDate: string;
}

export type StatisticsCampaiResponse = BaseResponse<
  BaseSearchResponse<TStatisticsCampaignDTO>
>;

export type StatisticsCustomerOfDayResponse =
  BaseResponse<IStatisticsCustomerOfDay>;

export type StatisticsCustomerOfApproadResponse =
  BaseResponse<IStatisticsCustomerOfApproach>;

export type StatisticsCustomerCallStatsRespone = BaseResponse<
  IStatisticsCustomerCallStats[]
>;
