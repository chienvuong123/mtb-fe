import { exampleApi } from '@apis';
import type {
  ExampleDTO,
  ExampleSearchRequest,
  // ExampleSearchResponse,
  // ExampleViewResponse,
} from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useExampleSearchQuery,
  useViewQuery: useExampleViewQuery,
  useAddMutation: useExampleAddMutation,
  useEditMutation: useExampleEditMutation,
  useRemoveMutation: useExampleRemoveMutation,
} = createBaseQueryHooks<
  ExampleDTO,
  ExampleSearchRequest
  // if you need to transform the view response
  // ExampleViewResponse,
  // if you need to transform the search response
  // ExampleSearchResponse
>('examples', exampleApi);

// define other queries
