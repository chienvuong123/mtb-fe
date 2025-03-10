import React from 'react';

// Định nghĩa interface cho mỗi entry trong legendData
interface LegendEntry {
  color: string;
  dataKey: string;
  name: string;
}

// Định nghĩa interface cho props của CustomLegend
interface CustomLegendProps {
  legendData: LegendEntry[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ legendData }) => {
  return (
    <div className="custom-legend">
      {legendData?.map((entry) => (
        <div key={`item-${entry.dataKey}`} className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: entry.color || '#000' }}
          />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
