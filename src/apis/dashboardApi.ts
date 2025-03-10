import type {
  DashboardSearchRequest,
  StatisticsCampaiResponse,
  StatisticsCustomerCallStatsRespone,
  StatisticsCustomerOfApproadResponse,
  StatisticsCustomerOfDayResponse,
} from 'src/dtos/dashboard';
import { apiRequest } from './apiClient';

class DashboardApi {
  private endpoint: string;

  constructor() {
    this.endpoint = '/dashboard/v1.0';
  }

  async getStatisticsCampaign(params: DashboardSearchRequest) {
    return apiRequest<StatisticsCampaiResponse>({
      url: `${this.endpoint}/statistics-campaign`,
      method: 'GET',
      params,
    });
  }

  async getStatisticsCustomerOfDay() {
    return apiRequest<StatisticsCustomerOfDayResponse>({
      url: `${this.endpoint}/statistics-customer-of-day`,
      method: 'GET',
    });
  }

  async getStatisticsCustomerCallStats(params: DashboardSearchRequest) {
    return apiRequest<StatisticsCustomerCallStatsRespone>({
      url: `${this.endpoint}/statistics-customer-call-stats`,
      method: 'GET',
      params,
    });
  }

  async getStatisticsCustomerApproach(params: DashboardSearchRequest) {
    return apiRequest<StatisticsCustomerOfApproadResponse>({
      url: `${this.endpoint}/statistics-customer-approach`,
      method: 'GET',
      params,
    });
  }
}

export const dashboardApi = new DashboardApi();
