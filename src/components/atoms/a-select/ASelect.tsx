import { ArrowDown01Icon, VectorIcon } from '@assets/icons';
import type { SelectProps } from 'antd';
import { Select as AntdSelect, Spin } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import useDebounce from '@hooks/useDebounce';
import {
  type GetListOptionsType,
  type GetQueryParamsType,
  type ListMasterDataResponse,
  type OptionsQueryType,
} from '@types';
import './ASelect.scss';

interface IASelect extends SelectProps {
  className?: string;
  getListOptions?: GetListOptionsType;
  getQueryParams?: GetQueryParamsType;
  optionsQuery?: OptionsQueryType;
}

const ASelect: React.FC<IASelect> = ({
  className,
  size,
  popupClassName,
  getListOptions,
  getQueryParams,
  optionsQuery = { value: 'id', label: 'name' },
  ...props
}) => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data: listMasterData, isFetching } =
    getListOptions && getQueryParams
      ? getListOptions(getQueryParams(debouncedSearchText, page))
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
          ? listMasterData.data.content.map((item: ListMasterDataResponse) => ({
              value: item[optionsQuery?.value],
              label: item[optionsQuery?.label],
            }))
          : [
              ...prev,
              ...listMasterData.data.content.map(
                (item: ListMasterDataResponse) => ({
                  value: item[optionsQuery?.value],
                  label: item[optionsQuery?.label],
                }),
              ),
            ],
      );
    }
  }, [listMasterData, page, optionsQuery]);

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
