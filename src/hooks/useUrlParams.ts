import type { PageParams } from '@dtos';
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
    ...initFilters
  } = qs.parse(search.replace('?', '')) as P & PageParams;

  const [pagination, setPagination] = useState<PageParams>({
    current,
    pageSize,
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
      }),
    });
  }, [filters, navigate, pagination]);

  return {
    pagination,
    setPagination,
    filters,
    setFilter,
    setFilters,
  };
};

export default useUrlParams;
