import { salesOpportunitiesApi } from '@apis';
import type {
  TSalesOpportunitiesSearchForm,
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest,
} from 'src/dtos/sales-opportunities';
import { useMutation } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useSalesOpportunitiesSearchQuery,
  useViewQuery: useSalesOpportunitiesViewQuery,
} = createBaseQueryHooks<
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
