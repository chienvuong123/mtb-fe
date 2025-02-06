import type { PageParams, SortParams } from '@dtos';
import qs from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useUrlParams = <T>() => {
  type P = T & { keyword?: string };
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    current = 1,
    pageSize = 20,
    field,
    direction,
    ...initFilters
  } = qs.parse(search.replace('?', '')) as P & PageParams & SortParams;

  const [pagination, setPagination] = useState<PageParams>({
    current,
    pageSize,
  });
  const [sort, setSort] = useState<SortParams>({
    field,
    direction,
  });
  const [filters, setFilters] = useState<P>((initFilters ?? {}) as P);

  const setFilter = useCallback(
    (key: keyof P, value: P[keyof P]) => {
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
