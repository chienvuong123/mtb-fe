import type { CategoryType } from '../category';

export type ProductCategoryDTO = {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  code: string;
  name: string;
  status: string;
  categoryTypeCode?: CategoryType;
};

export type TProductSearchForm = { code: string; name: string; status: string };
