import type { CategoryType } from '../category';
import type { BaseEntity } from '../common';

export interface PositionCategoryDTO extends BaseEntity {
  code: string;
  name: string;
  categoryTypeCode?: CategoryType;
}

export type TPositionSearchForm = {
  code?: string;
  name?: string;
  status: string;
};
