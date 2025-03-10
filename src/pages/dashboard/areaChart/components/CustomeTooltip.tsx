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
        <p className="pb-1">{dataTooltip.date}</p>
        <p className="tooltip-item">
          <div className="dot-orange" />
          {dataTooltip.totalCustomerApproach}
        </p>
        <p className="tooltip-item">
          <div className="dot-blue" />
          {dataTooltip.totalCalled}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
