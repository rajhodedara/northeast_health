import React, { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ReferenceLine } from 'recharts';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    BarChart3: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
    Download: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    TrendingDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>,
    Minus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Brain: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2h1Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 18 19.5v-15A2.5 2.5 0 0 0 15.5 2h-1Z"></path></svg>,
    Zap: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};

const Select = ({ options, value, onChange, className = '' }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 ${className}`}>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
);


// --- Main Component ---

const HistoricalAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  const [selectedMetric, setSelectedMetric] = useState('cases');
  const [activeIndex, setActiveIndex] = useState(0);

  const timeframeOptions = [ { value: 'last7days', label: 'Last 7 Days' }, { value: 'last30days', label: 'Last 30 Days' }, { value: 'last3months', label: 'Last 3 Months' }, { value: 'last6months', label: 'Last 6 Months' }, { value: 'lastyear', label: 'Last Year' } ];
  const metricOptions = [ { value: 'alerts', label: 'Alert Count' }, { value: 'cases', label: 'Case Count' }, { value: 'responseTime', label: 'Response Time (h)' }, { value: 'resolutionRate', label: 'Resolution Rate (%)' } ];

  const alertTrendData = [ { date: '2025-09-08', alerts: 12, cases: 45, responseTime: 2.5, resolutionRate: 85 }, { date: '2025-09-09', alerts: 8, cases: 32, responseTime: 1.8, resolutionRate: 90 }, { date: '2025-09-10', alerts: 15, cases: 67, responseTime: 3.2, resolutionRate: 78 }, { date: '2025-09-11', alerts: 6, cases: 23, responseTime: 1.5, resolutionRate: 95 }, { date: '2025-09-12', alerts: 18, cases: 89, responseTime: 4.1, resolutionRate: 72 }, { date: '2025-09-13', alerts: 11, cases: 41, responseTime: 2.8, resolutionRate: 88 }, { date: '2025-09-14', alerts: 9, cases: 35, responseTime: 2.1, resolutionRate: 92 }, { date: '2025-09-15', alerts: 14, cases: 56, responseTime: 3.5, resolutionRate: 80 } ];
  const diseaseDistributionData = [ { name: 'Cholera', value: 35, color: '#EF4444' }, { name: 'Typhoid', value: 28, color: '#F59E0B' }, { name: 'Hepatitis A/E', value: 20, color: '#3B82F6' }, { name: 'Acute Diarrhea', value: 12, color: '#10B981' }, { name: 'Dysentery', value: 5, color: '#8B5CF6' } ];
  const locationHotspots = [ { location: 'Guwahati Metro', alerts: 45, trend: 'up', change: '+12%' }, { location: 'Kamrup District', alerts: 32, trend: 'down', change: '-8%' }, { location: 'Dibrugarh District', alerts: 28, trend: 'up', change: '+5%' }, { location: 'Silchar District', alerts: 19, trend: 'stable', change: '0%' }, { location: 'Jorhat District', alerts: 15, trend: 'down', change: '-15%' } ];
  const responseMetrics = [ { metric: 'Avg Response Time', value: '2.8 hours', trend: 'down', change: '-15%', target: '< 3 hours' }, { metric: 'Resolution Rate', value: '85%', trend: 'up', change: '+8%', target: '> 90%' }, { metric: 'Escalation Rate', value: '12%', trend: 'down', change: '-3%', target: '< 10%' }, { metric: 'False Positive Rate', value: '5%', trend: 'stable', change: '0%', target: '< 5%' } ];

  const averageMetric = useMemo(() => {
    if (alertTrendData.length === 0) return 0;
    const sum = alertTrendData.reduce((acc, item) => acc + item[selectedMetric], 0);
    return sum / alertTrendData.length;
  }, [selectedMetric, alertTrendData]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  const getTrendIcon = (trend) => ({ up: 'TrendingUp', down: 'TrendingDown', stable: 'Minus' }[trend] || 'Minus');
  const getTrendColor = (trend) => ({ up: 'text-red-500', down: 'text-green-500', stable: 'text-gray-500' }[trend] || 'text-gray-500');

  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center"><Icon name="BarChart3" size={18} className="text-blue-600 dark:text-blue-300" /></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Historical Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Patterns and response effectiveness over time</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select options={timeframeOptions} value={selectedTimeframe} onChange={setSelectedTimeframe} className="w-40"/>
          <Button variant="outline" size="sm" iconName="Download">Export Report</Button>
        </div>
      </div>
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {responseMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{metric.metric}</span>
                <div className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor(metric.trend)}`}><Icon name={getTrendIcon(metric.trend)} size={14} /><span>{metric.change}</span></div>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">Target: {metric.target}</div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Trends Over Time</h4>
            <Select options={metricOptions} value={selectedMetric} onChange={setSelectedMetric} className="w-48"/>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs><linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false}/>
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #E5E7EB', borderRadius: '0.5rem', fontSize: '12px' }}/>
                <ReferenceLine y={averageMetric} label={{ value: `Avg: ${averageMetric.toFixed(1)}`, position: 'insideTopLeft', fill: '#6B7280', fontSize: 10 }} stroke="#6B7280" strokeDasharray="4 4" />
                <Line type="monotone" dataKey={selectedMetric} stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} fillOpacity={1} fill="url(#colorMetric)"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Disease Distribution</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={diseaseDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" activeIndex={activeIndex} activeShape={(props) => { const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props; return (<g><text x={cx} y={cy} dy={-5} textAnchor="middle" fill="#111827" className="dark:fill-white font-bold text-2xl">{`${payload.value}%`}</text><text x={cx} y={cy} dy={15} textAnchor="middle" fill="#6B7280" className="dark:fill-gray-400 text-xs">of cases</text><Cell fill={fill} /></g>);}} onMouseEnter={onPieEnter}>
                    {diseaseDistributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
              {diseaseDistributionData.map((disease, index) => (<div key={index} onMouseEnter={() => setActiveIndex(index)} className="flex items-center space-x-2 p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: disease.color }} /><span className="text-sm text-gray-700 dark:text-gray-300">{disease.name}</span><span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-auto">{disease.value}%</span></div>))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Location Hotspots</h4>
            <div className="space-y-3">
              {locationHotspots.map((location, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center"><Icon name="MapPin" size={16} className="text-blue-500 dark:text-blue-300" /></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{location.location}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{location.alerts} alerts</div>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor(location.trend)}`}><Icon name={getTrendIcon(location.trend)} size={16} /><span>{location.change}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h4 className="text-base font-medium text-blue-800 dark:text-blue-200 mb-4 flex items-center space-x-2"><Icon name="Zap" size={18} /><span>Key Observations</span></h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-blue-900/80 dark:text-blue-100/80"><strong>Seasonal Pattern:</strong> Cholera cases show a clear increase during monsoon months (June-September).</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-blue-900/80 dark:text-blue-100/80"><strong>Geographic Correlation:</strong> 78% of typhoid cases occur within 2km of contaminated water sources.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-blue-900/80 dark:text-blue-100/80"><strong>Response Improvement:</strong> Average response time reduced by 25% after implementing mobile alerts.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-blue-900/80 dark:text-blue-100/80"><strong>Prediction Accuracy:</strong> ML model shows 89% accuracy in predicting outbreak severity within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;
