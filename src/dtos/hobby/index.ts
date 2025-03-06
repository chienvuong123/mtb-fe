import type { CategoryType } from '../category';
import type { BaseEntity } from '../common';

export interface HobbyCategoryDTO extends Partial<BaseEntity> {
  code?: string;
  name?: string;
  categoryTypeCode?: CategoryType;
}

export type THobbySearchForm = {
  code?: string;
  name?: string;
  status: string;
};
