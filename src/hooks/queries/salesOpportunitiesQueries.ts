import { salesOpportunitiesApi } from '@apis';
import type {
  TSalesOpportunitiesSearchForm,
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest,
} from '@dtos';
import { useMutation } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const { useSearchQuery: useSalesOpportunitiesSearchQuery } =
  createBaseQueryHooks<
    SalesOpportunitiesDTO,
    SalesOpportunitiesSearchRequest,
    // if you need to transform the view response
    // ExampleViewResponse,
    // if you need to transform the search response
    TSalesOpportunitiesSearchForm
  >('sales-opportunities', salesOpportunitiesApi);

// define other queries

export const useForwardBookingInforMutation = () => {
  return useMutation({
    mutationFn: (id: string) => salesOpportunitiesApi.forwardBookingInfor(id),
    mutationKey: ['sales-opportunities-forward-booking-infor'],
  });
};
