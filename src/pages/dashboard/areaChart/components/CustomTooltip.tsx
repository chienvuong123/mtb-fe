import { Typography } from 'antd';
import React from 'react';
import type { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const dataTooltip = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <Typography.Text className="pb-1">{dataTooltip.date}</Typography.Text>
        <Typography.Text className="tooltip-item">
          <div className="dot-orange" />
          {dataTooltip.totalCustomerApproach}
        </Typography.Text>
        <Typography.Text className="tooltip-item">
          <div className="dot-blue" />
          {dataTooltip.totalCalled}
        </Typography.Text>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
