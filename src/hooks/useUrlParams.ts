import type { PageParams, SortParams } from '@dtos';
import { filterObject } from '@utils/objectHelper';
import qs from 'qs';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TInitSort<T> = {
  field?: keyof T;
  direction?: 'asc' | 'desc';
  unicode?: boolean;
};

type TInitFilters<T> = {
  initSort?: TInitSort<T>;
  initFilters?: T;
};

const useUrlParams = <T>(props?: TInitFilters<T>) => {
  const [initValues, setInitValues] = useState<TInitFilters<T> | undefined>(
    props,
  );
  const navigate = useNavigate();
  const { search } = useLocation();
  const paramsObjects = qs.parse(search.replace('?', '')) as T &
    PageParams &
    SortParams;
  const {
    current = 1,
    pageSize = 10,
    field = initValues?.initSort?.field as string,
    direction = initValues?.initSort?.direction as string,
    ...initFilters
  } = paramsObjects;

  const handleChangeParams = (
    data: Partial<T | PageParams | SortParams>,
    reset?: boolean,
  ) => {
    navigate({
      search: qs.stringify(
        filterObject({
          ...(reset ? { current: 1 } : paramsObjects),
          ...data,
        }),
      ),
    });
  };

  const setPagination = ({ current: c, pageSize: p }: Partial<PageParams>) =>
    handleChangeParams({ current: c, pageSize: p });

  const setSort = (sort: Partial<SortParams>) => {
    setInitValues((pre) => ({ ...pre, initSort: undefined }));
    handleChangeParams(sort);
  };

  const setFilters = (data: Partial<T>) => {
    setInitValues((pre) => ({ ...pre, initFilters: undefined }));
    handleChangeParams(data);
  };

  const handleResetFilters = (data?: Partial<T | PageParams | SortParams>) =>
    handleChangeParams({ direction, field, current, pageSize, ...data }, true);

  return {
    pagination: { current: current ?? 1, pageSize: pageSize ?? 0 },
    setPagination,
    sort: { field, direction },
    setSort,
    filters: { ...initFilters },
    setFilters,
    handleResetFilters,
  };
};

export default useUrlParams;
