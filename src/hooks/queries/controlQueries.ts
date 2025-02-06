import { controlApi } from '@apis';
import type { ControlDTO, ControlSearchRequest } from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useControlSearchQuery,
  useViewQuery: useControlViewQuery,
  useAddMutation: useControlAddMutation,
  useEditMutation: useControlEditMutation,
  useRemoveMutation: useControlRemoveMutation,
} = createBaseQueryHooks<ControlDTO, ControlSearchRequest>(
  'Controls',
  controlApi,
);
