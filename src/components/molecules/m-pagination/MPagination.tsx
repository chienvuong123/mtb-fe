'use client';

import React from 'react';
import { Flex, Pagination as AntdPagination } from 'antd';
import type { PaginationProps } from 'antd/lib';
import clsx from 'clsx';

import './MPagination.scss';
import { ASelect } from '@components/atoms';
import { type IMPagination } from './MPagination.type';

const MPagination: React.FC<IMPagination> = ({
  className,
  pagination,
  optionPageSize,
  setPagination,
}) => {
  const classAntd = clsx('m-pagination', className);

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

  return (
    <div className={classAntd}>
      <Flex gap={12} align="center">
        {optionPageSize?.length && (
          <ASelect
            size="small"
            className="w-max per-page"
            defaultValue={pagination.pageSize}
            onChange={(pageSize: number) =>
              setPagination({ ...pagination, pageSize })
            }
            options={optionPageSize}
          />
        )}
        <AntdPagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          showSizeChanger={false}
          itemRender={itemRender}
          onChange={(current: number, pageSize: number) =>
            setPagination({
              ...pagination,
              current,
              pageSize,
            })
          }
        />
      </Flex>
    </div>
  );
};

export default MPagination;
