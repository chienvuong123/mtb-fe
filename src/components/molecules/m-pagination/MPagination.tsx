'use client';

import React, { useMemo } from 'react';
import { Flex, Pagination as AntdPagination, Typography } from 'antd';
import type { PaginationProps } from 'antd/lib';
import clsx from 'clsx';

import './MPagination.scss';
import { AButton, ASelect } from '@components/atoms';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@assets/icons';
import { isNumberArray } from '@utils/objectHelper';
import { type IMPagination, type TOptionPageSize } from './MPagination.type';

const MPagination: React.FC<IMPagination> = ({
  className,
  pagination,
  optionPageSize,
  justify = 'space-between',
  setPagination,
  ...props
}) => {
  const classAntd = clsx('m-pagination py-22 px-24 bg-white', className);

  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === 'jump-prev' || type === 'jump-next') {
      return <li className="ant-pagination-item">...</li>;
    }

    return originalElement;
  };

  const transformPageSizeOptions: TOptionPageSize[] =
    useMemo(
      () =>
        isNumberArray(optionPageSize)
          ? (optionPageSize as number[]).map((item) => ({
              label: `${item} bản ghi trên 1 trang`,
              value: item,
            }))
          : optionPageSize,
      [optionPageSize],
    ) ?? [];

  return (
    <div className={classAntd}>
      <Flex gap={12} align="center" justify={justify}>
        <Typography.Text className="fw-500">Tổng số 1 bản ghi</Typography.Text>
        <Flex align="center">
          {optionPageSize?.length && (
            <ASelect
              size="small"
              className="w-max per-page mr-12"
              defaultValue={Number(pagination.pageSize)}
              onChange={(pageSize: number) =>
                setPagination({ ...pagination, pageSize })
              }
              options={transformPageSizeOptions}
            />
          )}
          <AntdPagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showSizeChanger={false}
            itemRender={itemRender}
            prevIcon={
              <AButton
                variant="filled"
                color="blue"
                className="w-32 h-32 "
                icon={<ArrowLeft01Icon />}
              />
            }
            nextIcon={
              <AButton
                variant="filled"
                color="blue"
                className="w-32 h-32 "
                icon={<ArrowRight01Icon />}
              />
            }
            onChange={(current: number, pageSize: number) =>
              setPagination({
                ...pagination,
                current,
                pageSize,
              })
            }
            {...props}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default MPagination;
