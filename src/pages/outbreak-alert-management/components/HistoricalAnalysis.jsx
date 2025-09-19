import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HistoricalAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  const [selectedMetric, setSelectedMetric] = useState('alerts');

  const timeframeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'alerts', label: 'Alert Count' },
    { value: 'cases', label: 'Case Count' },
    { value: 'response-time', label: 'Response Time' },
    { value: 'resolution-rate', label: 'Resolution Rate' }
  ];

  // Mock historical data
  const alertTrendData = [
    { date: '2025-09-08', alerts: 12, cases: 45, responseTime: 2.5, resolutionRate: 85 },
    { date: '2025-09-09', alerts: 8, cases: 32, responseTime: 1.8, resolutionRate: 90 },
    { date: '2025-09-10', alerts: 15, cases: 67, responseTime: 3.2, resolutionRate: 78 },
    { date: '2025-09-11', alerts: 6, cases: 23, responseTime: 1.5, resolutionRate: 95 },
    { date: '2025-09-12', alerts: 18, cases: 89, responseTime: 4.1, resolutionRate: 72 },
    { date: '2025-09-13', alerts: 11, cases: 41, responseTime: 2.8, resolutionRate: 88 },
    { date: '2025-09-14', alerts: 9, cases: 35, responseTime: 2.1, resolutionRate: 92 },
    { date: '2025-09-15', alerts: 14, cases: 56, responseTime: 3.5, resolutionRate: 80 }
  ];

  const diseaseDistributionData = [
    { name: 'Cholera', value: 35, color: '#EF4444' },
    { name: 'Typhoid', value: 28, color: '#F59E0B' },
    { name: 'Hepatitis A/E', value: 20, color: '#1E40AF' },
    { name: 'Acute Diarrhea', value: 12, color: '#059669' },
    { name: 'Dysentery', value: 5, color: '#8B5CF6' }
  ];

  const locationHotspots = [
    { location: 'Guwahati Metro', alerts: 45, trend: 'up', change: '+12%' },
    { location: 'Kamrup District', alerts: 32, trend: 'down', change: '-8%' },
    { location: 'Dibrugarh District', alerts: 28, trend: 'up', change: '+5%' },
    { location: 'Silchar District', alerts: 19, trend: 'stable', change: '0%' },
    { location: 'Jorhat District', alerts: 15, trend: 'down', change: '-15%' }
  ];

  const responseMetrics = [
    { metric: 'Average Response Time', value: '2.8 hours', trend: 'down', change: '-15%', target: '< 3 hours' },
    { metric: 'Resolution Rate', value: '85%', trend: 'up', change: '+8%', target: '> 90%' },
    { metric: 'Escalation Rate', value: '12%', trend: 'down', change: '-3%', target: '< 10%' },
    { metric: 'False Positive Rate', value: '5%', trend: 'stable', change: '0%', target: '< 5%' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Historical Analysis
            </h3>
            <p className="text-sm font-caption text-text-secondary">
              Analyze outbreak patterns and response effectiveness
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={timeframeOptions}
            value={selectedTimeframe}
            onChange={setSelectedTimeframe}
            className="w-40"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Export Report
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {responseMetrics?.map((metric, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption text-text-secondary">{metric?.metric}</span>
                <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
                  <Icon name={getTrendIcon(metric?.trend)} size={14} />
                  <span className="text-xs font-caption">{metric?.change}</span>
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                {metric?.value}
              </div>
              <div className="text-xs font-caption text-text-secondary">
                Target: {metric?.target}
              </div>
            </div>
          ))}
        </div>

        {/* Alert Trends Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-heading font-medium text-text-primary">
              Alert Trends Over Time
            </h4>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-40"
            />
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value)}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric === 'alerts' ? 'alerts' : 
                           selectedMetric === 'cases' ? 'cases' :
                           selectedMetric === 'response-time' ? 'responseTime' : 'resolutionRate'}
                  stroke="#1E40AF" 
                  strokeWidth={2}
                  dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1E40AF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease Distribution and Location Hotspots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Disease Distribution */}
          <div>
            <h4 className="text-base font-heading font-medium text-text-primary mb-4">
              Disease Distribution (Last 30 Days)
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {diseaseDistributionData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {diseaseDistributionData?.map((disease, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: disease?.color }}
                  />
                  <span className="text-sm font-body text-text-primary">{disease?.name}</span>
                  <span className="text-sm font-caption text-text-secondary">({disease?.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Hotspots */}
          <div>
            <h4 className="text-base font-heading font-medium text-text-primary mb-4">
              Location Hotspots
            </h4>
            <div className="space-y-3">
              {locationHotspots?.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-body font-medium text-text-primary">
                        {location?.location}
                      </div>
                      <div className="text-xs font-caption text-text-secondary">
                        {location?.alerts} alerts
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(location?.trend)}`}>
                    <Icon name={getTrendIcon(location?.trend)} size={14} />
                    <span className="text-sm font-caption font-medium">{location?.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pattern Recognition Insights */}
        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="text-base font-heading font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Brain" size={18} className="text-primary" />
            <span>AI Pattern Recognition Insights</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                <div>
                  <p className="text-sm font-body text-text-primary">
                    <strong>Seasonal Pattern Detected:</strong> Cholera cases increase by 40% during monsoon months (June-September).
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-error rounded-full mt-2" />
                <div>
                  <p className="text-sm font-body text-text-primary">
                    <strong>Geographic Correlation:</strong> 78% of typhoid cases occur within 2km of contaminated water sources.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2" />
                <div>
                  <p className="text-sm font-body text-text-primary">
                    <strong>Response Improvement:</strong> Average response time reduced by 25% after implementing mobile alerts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="text-sm font-body text-text-primary">
                    <strong>Prediction Accuracy:</strong> ML model shows 89% accuracy in predicting outbreak severity within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;