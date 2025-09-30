import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Filter: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46V19l4 2v-8.54L22 3z"></polygon></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Download: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    Save: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  // --- FIX APPLIED HERE ---
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};

const Select = ({ label, description, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{label}</label>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>}
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Input = ({ label, type, placeholder, onChange, className }) => (
    <div>
      {label && <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{label}</label>}
      <input type={type} placeholder={placeholder} onChange={onChange} className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 ${className}`} />
    </div>
);


// --- Main Component ---
const AlertFilters = ({ onFilterChange = () => {}, alertCounts = { total: 25, new: 5, acknowledged: 10, inProgress: 3, escalated: 2, resolved: 5, filtered: 25 } }) => {
  const [filters, setFilters] = useState({ status: 'all', severity: 'all', disease: 'all', location: 'all', dateRange: 'today' });
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [ { value: 'all', label: `All Alerts (${alertCounts.total})` }, { value: 'new', label: `New (${alertCounts.new})` }, { value: 'acknowledged', label: `Acknowledged (${alertCounts.acknowledged})` }, { value: 'in-progress', label: `In Progress (${alertCounts.inProgress})` }, { value: 'escalated', label: `Escalated (${alertCounts.escalated})` }, { value: 'resolved', label: `Resolved (${alertCounts.resolved})` } ];
  const severityOptions = [ { value: 'all', label: 'All Severities' }, { value: 'critical', label: 'Critical' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' } ];
  const diseaseOptions = [ { value: 'all', label: 'All Diseases' }, { value: 'cholera', label: 'Cholera' }, { value: 'typhoid', label: 'Typhoid' }, { value: 'hepatitis', label: 'Hepatitis A/E' }, { value: 'diarrhea', label: 'Acute Diarrhea' }, { value: 'dysentery', label: 'Dysentery' } ];
  const locationOptions = [ { value: 'all', label: 'All Locations' }, { value: 'kamrup', label: 'Kamrup District' }, { value: 'guwahati', label: 'Guwahati Metro' }, { value: 'dibrugarh', label: 'Dibrugarh District' }, { value: 'silchar', label: 'Silchar District' }, { value: 'jorhat', label: 'Jorhat District' } ];
  const dateRangeOptions = [ { value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' }, { value: 'last7days', label: 'Last 7 Days' }, { value: 'last30days', label: 'Last 30 Days' }, { value: 'custom', label: 'Custom Range' } ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = { status: 'all', severity: 'all', disease: 'all', location: 'all', dateRange: 'today' };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getActiveFilterCount = () => Object.values(filters).filter(value => value !== 'all' && value !== 'today' && value !== '').length;

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center"><Icon name="Filter" size={18} className="text-blue-600 dark:text-blue-300" /></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Alert Filters</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Filter and search outbreak alerts
              {getActiveFilterCount() > 0 && (<span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">{getActiveFilterCount()} active</span>)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (<Button variant="ghost" size="sm" onClick={clearAllFilters} iconName="X">Clear All</Button>)}
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} iconName={isExpanded ? "ChevronUp" : "ChevronDown"}>{isExpanded ? 'Collapse' : 'Expand'}</Button>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700"><div className="flex flex-wrap gap-2">
          <Button variant={filters.status === 'new' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('status', filters.status === 'new' ? 'all' : 'new')} iconName="AlertCircle">New ({alertCounts.new})</Button>
          <Button variant={filters.severity === 'critical' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('severity', filters.severity === 'critical' ? 'all' : 'critical')} iconName="AlertTriangle">Critical</Button>
          <Button variant={filters.status === 'escalated' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('status', filters.status === 'escalated' ? 'all' : 'escalated')} iconName="TrendingUp">Escalated ({alertCounts.escalated})</Button>
          <Button variant={filters.dateRange === 'today' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('dateRange', filters.dateRange === 'today' ? 'all' : 'today')} iconName="Calendar">Today</Button>
      </div></div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select label="Alert Status" options={statusOptions} value={filters.status} onChange={(value) => handleFilterChange('status', value)} description="Filter by current alert status"/>
            <Select label="Severity Level" options={severityOptions} value={filters.severity} onChange={(value) => handleFilterChange('severity', value)} description="Filter by alert severity"/>
            <Select label="Disease Type" options={diseaseOptions} value={filters.disease} onChange={(value) => handleFilterChange('disease', value)} description="Filter by disease category"/>
            <Select label="Location" options={locationOptions} value={filters.location} onChange={(value) => handleFilterChange('location', value)} description="Filter by geographic area"/>
            <Select label="Date Range" options={dateRangeOptions} value={filters.dateRange} onChange={(value) => handleFilterChange('dateRange', value)} description="Filter by time period"/>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">Search Alerts</label>
              <Input type="search" placeholder="Search by location, disease, or ID..." onChange={(e) => handleFilterChange('search', e.target.value)} className="w-full"/>
              <p className="text-xs text-gray-500 dark:text-gray-400">Search across all alert fields</p>
            </div>
          </div>
          {filters.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Input label="Start Date" type="date" onChange={(e) => handleFilterChange('startDate', e.target.value)}/>
              <Input label="End Date" type="date" onChange={(e) => handleFilterChange('endDate', e.target.value)}/>
            </div>
          )}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-100 mb-4">Advanced Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2"><label className="text-sm font-medium text-gray-800 dark:text-gray-200">Minimum Cases</label><Input type="number" placeholder="e.g., 5" onChange={(e) => handleFilterChange('minCases', e.target.value)}/></div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-800 dark:text-gray-200">ML Score Range</label><div className="flex items-center space-x-2"><Input type="number" placeholder="Min %" min="0" max="100" onChange={(e) => handleFilterChange('minMlScore', e.target.value)}/><span className="text-gray-500">to</span><Input type="number" placeholder="Max %" min="0" max="100" onChange={(e) => handleFilterChange('maxMlScore', e.target.value)}/></div></div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-800 dark:text-gray-200">Response Time</label><Select options={[{ value: 'all', label: 'All Response Times' }, { value: 'overdue', label: 'Overdue' }, { value: 'due-today', label: 'Due Today' }, { value: 'due-soon', label: 'Due Soon' }]} onChange={(value) => handleFilterChange('responseTime', value)}/></div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">{alertCounts.filtered}</span> alerts match your filters</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download">Export Results</Button>
                <Button variant="outline" size="sm" iconName="Save">Save Filter</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertFilters;
