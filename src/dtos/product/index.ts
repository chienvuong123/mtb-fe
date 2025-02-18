import type { CategoryType } from '../category';
import type { BaseEntity } from '../common';

export interface ProductCategoryDTO extends BaseEntity {
  code: string;
  name: string;
  categoryTypeCode?: CategoryType;
}

export type TProductSearchForm = { code: string; name: string; status: string };
