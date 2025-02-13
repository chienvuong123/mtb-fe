import { salesOpportunitiesApi } from '@apis';
import type {
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest,
  ISalesOpportunitiesSearchForm,
} from 'src/dtos/sales-opportunities';
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
  ISalesOpportunitiesSearchForm
>('sales-opportunities', salesOpportunitiesApi);

// define other queries
