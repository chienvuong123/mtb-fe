import { controlApi } from '@apis';
import type { ControlDTO, ControlSearchRequest } from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const CONTROL_TYPE = 'control-type';
export const {
  useSearchQuery: useControlSearchQuery,
  useAddMutation: useControlAddMutation,
  useEditMutation: useControlEditMutation,
  useRemoveMutation: useControlRemoveMutation,
} = createBaseQueryHooks<ControlDTO, ControlSearchRequest>(
  CONTROL_TYPE,
  controlApi,
);
