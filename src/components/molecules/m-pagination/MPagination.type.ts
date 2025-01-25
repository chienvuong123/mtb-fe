import type { PaginationProps } from 'antd';

export type TOptionPageSize = {
  label: string;
  value: number;
};

export type TPagination = {
  current: number;
  pageSize: number;
  total: number;
};

export interface IMPagination extends PaginationProps {
  className?: string;
  pagination: TPagination;
  optionPageSize?: TOptionPageSize[] | number[];
  justify?: React.CSSProperties['justifyContent'];
  setPagination: ({ total, current, pageSize }: TPagination) => void;
}
