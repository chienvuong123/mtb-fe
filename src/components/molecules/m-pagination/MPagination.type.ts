type TOptionPageSize = {
  label: string;
  value: number;
};

type TPagination = {
  current: number;
  pageSize: number;
  total: number;
};

export interface IMPagination {
  className?: string;
  pagination: TPagination;
  optionPageSize?: TOptionPageSize[];
  setPagination: ({ total, current, pageSize }: TPagination) => void;
}
