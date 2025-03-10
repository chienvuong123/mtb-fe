import React from 'react';
import type { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<number, string> {
  total: number;
}

const CustomTooltipPieChart: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  total,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / total) * 100).toFixed(1);

    return (
      <div className="tooltip-container">
        <p className="tooltip-text tooltip-title">{data.name}</p>
        <p className="tooltip-text">{percentage}%</p>
        <p className="tooltip-text">{data.value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltipPieChart;
