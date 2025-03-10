import React from 'react';

interface LegendEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomLegendProps {
  data: LegendEntry[];
}

const CustomLegendPieChart: React.FC<CustomLegendProps> = ({ data }) => {
  return (
    <div className="pieChart custom-legend-container">
      <ul className="custom-legend-list">
        {data.map((entry) => (
          <li key={entry.name} className="custom-legend-item">
            <div className="legend-label">
              <span
                className="legend-color"
                style={{ backgroundColor: entry.color }}
              />
              <span className="legend-text">{entry.name}</span>
            </div>
            <span className="legend-value">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomLegendPieChart;
