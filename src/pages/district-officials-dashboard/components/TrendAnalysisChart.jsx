import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Sparkles: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '', disabled = false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};


// --- Main Component ---

const TrendAnalysisChart = ({ data, className = '' }) => {
  const [highlightedBar, setHighlightedBar] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
              <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{entry.value} cases</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const diseaseKeys = [
    { key: 'diarrhea', name: 'Diarrhea', color: '#14b8a6' }, // Teal
    { key: 'cholera', name: 'Cholera', color: '#f59e0b' }, // Amber
    { key: 'typhoid', name: 'Typhoid', color: '#6366f1' }, // Indigo
  ];

  const handleAnalyzeTrends = () => {
      setIsAnalyzing(true);
      setAnalysis('');
      // Mock AI analysis for demo
      setTimeout(() => {
          const analysisText = "The analysis reveals a significant and steady increase in **Cholera** cases over the past four weeks, which requires immediate attention. **Diarrhea** cases also saw a notable rise, peaking in Week 3 before showing a slight decline. **Typhoid** cases have remained relatively low and stable throughout the period.";
          setAnalysis(analysisText);
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Weekly Trend Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Case trends for key diseases over the last 4 weeks</p>
        </div>
        <Button variant="secondary" size="sm" iconName="Sparkles" onClick={handleAnalyzeTrends} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Trends'}
        </Button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              {diseaseKeys.map(disease => (
                <linearGradient key={disease.key} id={`color${disease.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={disease.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={disease.color} stopOpacity={0.3}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
            <XAxis
              dataKey="week"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}/>

            {diseaseKeys.map(disease => (
                 <Bar
                    key={disease.key}
                    dataKey={disease.key}
                    fill={`url(#color${disease.name})`}
                    name={disease.name}
                    radius={[4, 4, 0, 0]}
                    opacity={highlightedBar === null || highlightedBar === disease.key ? 1 : 0.3}
                    stroke={highlightedBar === disease.key ? disease.color : 'none'}
                    strokeWidth={2}
                />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {diseaseKeys.map(disease => (
             <div
                key={disease.key}
                className="flex items-center space-x-2 cursor-pointer"
                onMouseOver={() => setHighlightedBar(disease.key)}
                onMouseOut={() => setHighlightedBar(null)}
             >
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: disease.color}}/>
                <span className="text-sm text-gray-600 dark:text-gray-400">{disease.name}</span>
            </div>
        ))}
      </div>

      {isAnalyzing && (
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 animate-pulse" style={{width: '40%'}}></div>
        </div>
      )}

      {analysis && !isAnalyzing && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-fade-in">
          <h4 className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 mb-2 flex items-center">
            <Icon name="Sparkles" size={14} className="mr-2" /> AI-Generated Analysis
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: analysis }} />
        </div>
      )}
    </div>
  );
};


// --- Wrapper App with Mock Data ---

const App = () => {
  const mockTrendData = [
    { week: 'Week 1', diarrhea: 65, cholera: 28, typhoid: 15 },
    { week: 'Week 2', diarrhea: 72, cholera: 35, typhoid: 18 },
    { week: 'Week 3', diarrhea: 88, cholera: 42, typhoid: 25 },
    { week: 'Week 4', diarrhea: 81, cholera: 55, typhoid: 22 },
  ];

  return (
      <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <TrendAnalysisChart data={mockTrendData} />
      </div>
  );
};

export default App;

