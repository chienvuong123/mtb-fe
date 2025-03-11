import type { PageParams, SortParams } from '@dtos';
import qs from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TInitSort<T> = {
  field?: keyof T;
  direction?: 'asc' | 'desc';
  unicode?: boolean;
};

type TInitFilters<T> = {
  initSort?: TInitSort<T>;
};

const useUrlParams = <T>(props?: TInitFilters<T>) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    current = 1,
    pageSize = 10,
    field = props?.initSort?.field as string,
    direction = props?.initSort?.direction as string,
    ...initFilters
  } = qs.parse(search.replace('?', '')) as T & PageParams & SortParams;

  const [pagination, setPagination] = useState<PageParams>({
    current,
    pageSize,
  });
  const [sort, setSort] = useState<SortParams>({
    field,
    direction,
  });
  const [filters, setFilters] = useState<T>((initFilters ?? {}) as T);

  const setFilter = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    },
    [setFilters],
  );

  useEffect(() => {
    navigate({
      search: qs.stringify({
        ...filters,
        ...pagination,
        ...sort,
      }),
    });
  }, [filters, navigate, pagination, sort]);

  return {
    pagination,
    setPagination,
    sort,
    setSort,
    filters,
    setFilter,
    setFilters,
  };
};

export default useUrlParams;
