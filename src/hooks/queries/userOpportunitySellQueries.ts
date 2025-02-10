import { opportunitySellApi } from '@apis';
import { createBaseQueryHooks } from './baseQueries';
import type { 
    OpportunitySellDTO, 
    OpportunitySellSearchRequest, 
    OpportunitySellSearchResponse
} from 'src/dtos/opportunity';

export const {
  useSearchQuery: useOpportunitySellSearchQuery,
  useViewQuery: useOpportunitySellViewQuery,
} = createBaseQueryHooks<
  OpportunitySellDTO,
  OpportunitySellSearchRequest,
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  OpportunitySellSearchResponse
>('opportunity-sell', opportunitySellApi);

// define other queries
