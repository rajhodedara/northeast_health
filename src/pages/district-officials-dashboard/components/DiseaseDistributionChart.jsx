import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const DiseaseDistributionChart = ({ data, className = '' }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)', 
    'var(--color-warning)',
    'var(--color-error)',
    'var(--color-success)',
    '#8884d8',
    '#82ca9d',
    '#ffc658'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">
            {payload?.[0]?.name}: {payload?.[0]?.value} cases
          </p>
          <p className="text-xs text-text-secondary">
            {((payload?.[0]?.value / data?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Disease Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data?.map((item, index) => (
          <div key={item?.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
            />
            <span className="text-sm text-text-secondary">{item?.name}</span>
            <span className="text-sm font-medium text-text-primary ml-auto">{item?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseDistributionChart;