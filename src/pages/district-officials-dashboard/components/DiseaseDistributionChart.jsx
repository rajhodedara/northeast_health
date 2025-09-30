import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// --- Helper Components (Placeholders for a runnable example) ---
const PlaceholderIcon = ({ name, size = 16, className = '' }) => {
  const icons = {
    PieChart: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    Sparkles: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const PlaceholderButton = ({ variant = 'default', size, onClick, iconName, children, className = '', disabled = false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <PlaceholderIcon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};

// --- Chart Component ---

const DiseaseDistributionChart = ({ data = [], className = '' }) => {
  const [aiInsight, setAiInsight] = useState('');
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const COLORS = ['#0ea5e9', '#f97316', '#facc15', '#ef4444', '#22c55e', '#8884d8'];

  const totalCases = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const handleGenerateInsight = () => {
    setIsGeneratingInsight(true);
    setAiInsight('');
    setTimeout(() => {
      if (data.length === 0) {
        setAiInsight('No data available to generate insights.');
        setIsGeneratingInsight(false);
        return;
      }
      const mostPrevalent = data.reduce((max, item) => item.value > max.value ? item : max, data[0]);
      const percentage = totalCases > 0 ? ((mostPrevalent.value / totalCases) * 100).toFixed(1) : 0;
      const insight = `The data indicates that **${mostPrevalent.name}** is the most prevalent issue, accounting for **${percentage}%** of all recorded cases (${mostPrevalent.value} cases). This suggests that resources should be prioritized to address this specific disease.`;
      setAiInsight(insight);
      setIsGeneratingInsight(false);
    }, 1500);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {payload[0].name}: {payload[0].value} cases
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {totalCases > 0 ? ((payload[0].value / totalCases) * 100).toFixed(1) : 0}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Disease Distribution</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Breakdown of cases by disease type</p>
        </div>
        <div className="flex items-center flex-wrap gap-2">
            <PlaceholderButton variant="secondary" size="sm" iconName="Sparkles" onClick={handleGenerateInsight} disabled={isGeneratingInsight}>
              {isGeneratingInsight ? 'Analyzing...' : 'Get AI Insights'}
            </PlaceholderButton>
        </div>
      </div>

      <div className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={0}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

       {isGeneratingInsight && (
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 animate-pulse" style={{width: '40%'}}></div>
        </div>
       )}

      {aiInsight && !isGeneratingInsight && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-fade-in">
          <h4 className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 mb-2 flex items-center">
            <PlaceholderIcon name="Sparkles" size={14} className="mr-2" /> AI-Generated Insight
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: aiInsight }} />
        </div>
      )}
    </div>
  );
};

// --- Wrapper App with Mock Data ---

const App = () => {
  const mockChartData = [
    { name: 'Diarrhea', value: 489 },
    { name: 'Cholera', value: 234 },
    { name: 'Typhoid', value: 187 },
    { name: 'Hepatitis A', value: 98 },
    { name: 'Dysentery', value: 156 },
  ];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <DiseaseDistributionChart data={mockChartData} />
    </div>
  );
};

export default App;

