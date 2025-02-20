import { formatMoney } from '@utils/stringHelper';
import { Flex, Spin, Typography } from 'antd';
import type { FC } from 'react';

export const LimitLoanAmountCard: FC<{
  loanLimit?: number;
  loading?: boolean;
}> = ({ loanLimit, loading }) => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="limit-loan-amount-card"
    >
      {loading ? (
        <>
          <Spin size="large" spinning />
          <span className="mt-12">Đang check hạn mức</span>
        </>
      ) : (
        <>
          <span>Hạn mức được phép vay</span>
          <Typography.Title className="mt-12 text-primary" level={3}>
            {formatMoney(loanLimit ?? 0)}đ
          </Typography.Title>
        </>
      )}
    </Flex>
  );
};
