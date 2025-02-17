/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDown01Icon, VectorIcon } from '@assets/icons';
import type { SelectProps } from 'antd';
import { Select as AntdSelect, Spin } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import useDebounce from '@hooks/useDebounce';
import './ASelect.scss';

interface IASelect extends SelectProps {
  className?: string;
  fetchHook?: any;
  getQueryParams?: (searchText: string, page: number) => any;
}

const ASelect: React.FC<IASelect> = ({
  className,
  size,
  popupClassName,
  fetchHook,
  getQueryParams,
  ...props
}) => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data: listMasterData, isFetching } =
    fetchHook && getQueryParams
      ? fetchHook(getQueryParams(debouncedSearchText, page))
      : { data: null, isFetching: false };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleScrollLoad = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight - 20 &&
      !isFetching &&
      listMasterData?.data?.content?.length !== 0
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (listMasterData?.data?.content) {
      setOptions((prev) =>
        page === 1
          ? listMasterData.data.content.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          : [
              ...prev,
              ...listMasterData.data.content.map((item: any) => ({
                value: item.id,
                label: item.name,
              })),
            ],
      );
    }
  }, [listMasterData, page]);

  return (
    <AntdSelect
      suffixIcon={size !== 'small' ? <ArrowDown01Icon /> : <VectorIcon />}
      className={clsx('a-select w-full', className)}
      size={size}
      popupClassName={clsx('a-select-popup', popupClassName)}
      allowClear={false}
      filterOption={false}
      onSearch={handleSearch}
      onPopupScroll={handleScrollLoad}
      options={options}
      loading={isFetching}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      {...props}
    />
  );
};

export default ASelect;
