import type { CategoryType } from '../category';
import type { BaseEntity } from '../common';

export interface BranchCategoryDTO extends BaseEntity {
  code: string;
  name: string;
  categoryTypeCode?: CategoryType;
}

export type TBranchSearchForm = {
  code?: string;
  name?: string;
  status: string;
};
