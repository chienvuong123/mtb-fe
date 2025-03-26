import { dashboardApi } from '@apis';
import { useQuery } from '@tanstack/react-query';
import type {
  DashboardSearchRequest,
  StatisticsCampaiResponse,
  StatisticsCustomerCallStatsRespone,
  StatisticsCustomerOfApproadResponse,
  StatisticsCustomerOfDayResponse,
} from 'src/dtos/dashboard';

export const DASHBOARD_KEY = 'dashboard-list';

export const useStatisticsCampaign = (params: DashboardSearchRequest) => {
  return useQuery<StatisticsCampaiResponse>({
    queryFn: () => dashboardApi.getStatisticsCampaign(params),
    queryKey: [DASHBOARD_KEY, 'statistics-campaign', params],
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useStatisticsCustomerOfDay = () => {
  return useQuery<StatisticsCustomerOfDayResponse>({
    queryFn: () => dashboardApi.getStatisticsCustomerOfDay(),
    queryKey: [DASHBOARD_KEY, 'statistics-customer-of-day'],
  });
};

export const useStatisticsCustomerCallStats = (
  params: DashboardSearchRequest,
) => {
  return useQuery<StatisticsCustomerCallStatsRespone>({
    queryFn: () => dashboardApi.getStatisticsCustomerCallStats(params),
    queryKey: [DASHBOARD_KEY, 'statistics-customer-call-stats', params],
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useStatisticsCustomerApproach = (
  params: DashboardSearchRequest,
) => {
  return useQuery<StatisticsCustomerOfApproadResponse>({
    queryFn: () => dashboardApi.getStatisticsCustomerApproach(params),
    queryKey: [DASHBOARD_KEY, 'statistics-customer-approad', params],
    enabled: !!params.startDate && !!params.endDate,
  });
};
