export type SortObject = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

export type PageableObject = {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort?: SortObject;
  unpaged?: boolean;
};
