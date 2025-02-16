export type ProductCategoryDTO = {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  code: string;
  name: string;
  status: string;
  categoryTypeId?: string;
};

export type TProductSearchForm = { code: string; name: string; status: string };
