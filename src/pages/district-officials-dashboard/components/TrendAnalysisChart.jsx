import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TrendAnalysisChart = ({ data, className = '' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span style={{ color: entry?.color }}>{entry?.dataKey}: </span>
              {entry?.value} cases
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Trend Analysis</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="week" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="diarrhea" 
              fill="var(--color-primary)" 
              name="Diarrhea"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="cholera" 
              fill="var(--color-secondary)" 
              name="Cholera"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="typhoid" 
              fill="var(--color-warning)" 
              name="Typhoid"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-text-secondary">Diarrhea Cases</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-text-secondary">Cholera Cases</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-sm text-text-secondary">Typhoid Cases</span>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;