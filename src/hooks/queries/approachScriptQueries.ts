import type {
  ApproachResultCreateRequest,
  ApproachScriptDTO,
  ApproachScriptSearchRequest,
} from 'src/dtos/approach-script';
import { approachScriptApi } from '@apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBaseQueryHooks } from './baseQueries';

export const APPROACH_SCRIPT_KEY = 'approach-script-list';

export const {
  useSearchQuery: useApproachScriptSearchQuery,
  useViewQuery: useApproachScriptViewQuery,
} = createBaseQueryHooks<ApproachScriptDTO, ApproachScriptSearchRequest>(
  APPROACH_SCRIPT_KEY,
  approachScriptApi,
);

export const useApproachScriptViewByCustomerQuery = (customerId?: string) => {
  return useQuery({
    queryKey: [APPROACH_SCRIPT_KEY, 'view-by-customer', customerId],
    queryFn: () => approachScriptApi.viewByCustomer(customerId),
    select: (data) => data.data,
    enabled: !!customerId,
  });
};

export const useApproachScriptResultMutation = () => {
  return useMutation({
    mutationFn: (params: ApproachResultCreateRequest[]) =>
      approachScriptApi.createApproachResult(params),
  });
};
