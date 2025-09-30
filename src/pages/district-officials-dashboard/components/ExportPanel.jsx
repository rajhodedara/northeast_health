import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Download: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    HardDrive: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Sheet: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M15 13H9"/><path d="M15 17H9"/><path d="M11 9H9"/></svg>,
    Database: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
    Code: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    Eye: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, iconPosition, children, className = '', loading = false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', xs: 'px-2 py-1 text-xs' };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  const icon = iconName && <Icon name={iconName} size={16} className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''} />;
  return (
    <button onClick={onClick} disabled={loading} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition !== 'left' && icon}
    </button>
  );
};

const Select = ({ label, description, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{label}</label>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>}
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200">
      {options.map(opt => <option key={opt.value} value={opt.value} className="dark:bg-gray-800">{opt.label}</option>)}
    </select>
  </div>
);

const Checkbox = ({ label, description, checked, onChange }) => (
  <label className="flex items-start space-x-3">
    <input type="checkbox" checked={checked} onChange={onChange} className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-900" />
    <div className="flex-1">
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </label>
);


// --- Main Component ---

const ExportPanel = ({ className = '' }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dateRange: 'last7days',
    includeCharts: true,
    includeMap: true,
    includeAlerts: true,
    includeInterventions: true,
    includeRawData: false
  });

  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', description: 'Formatted report with charts and visualizations' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Raw data in spreadsheet format' },
    { value: 'csv', label: 'CSV Data', description: 'Comma-separated values for data analysis' },
    { value: 'json', label: 'JSON Data', description: 'Structured data for API integration' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Exporting with config:', exportConfig);
    setIsExporting(false);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'excel': return 'Sheet';
      case 'csv': return 'Database';
      case 'json': return 'Code';
      default: return 'Download';
    }
  };

  const getEstimatedSize = () => {
    let baseSize = 2;
    if (exportConfig.includeCharts) baseSize += 1.5;
    if (exportConfig.includeMap) baseSize += 3;
    if (exportConfig.includeRawData) baseSize += 5;
    return baseSize.toFixed(1);
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Export Data</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon name="HardDrive" size={16} />
          <span>Est. size: {getEstimatedSize()} MB</span>
        </div>
      </div>

      <div className="mb-6"><Select label="Export Format" description="Choose the format for your exported data" options={formatOptions} value={exportConfig.format} onChange={(value) => setExportConfig({ ...exportConfig, format: value })}/></div>
      <div className="mb-6"><Select label="Date Range" description="Select the time period for data export" options={dateRangeOptions} value={exportConfig.dateRange} onChange={(value) => setExportConfig({ ...exportConfig, dateRange: value })}/></div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Include in Export</h4>
        <div className="space-y-3">
          <Checkbox label="Charts and Visualizations" description="Disease distribution charts, trend analysis graphs" checked={exportConfig.includeCharts} onChange={(e) => setExportConfig({ ...exportConfig, includeCharts: e.target.checked })}/>
          <Checkbox label="Interactive Heat Map" description="Geographic health data visualization with hotspots" checked={exportConfig.includeMap} onChange={(e) => setExportConfig({ ...exportConfig, includeMap: e.target.checked })}/>
          <Checkbox label="Alert Summary" description="Active alerts and SMS system status" checked={exportConfig.includeAlerts} onChange={(e) => setExportConfig({ ...exportConfig, includeAlerts: e.target.checked })}/>
          <Checkbox label="Intervention Tracking" description="Ongoing response activities and status updates" checked={exportConfig.includeInterventions} onChange={(e) => setExportConfig({ ...exportConfig, includeInterventions: e.target.checked })}/>
          <Checkbox label="Raw Data Tables" description="Detailed data tables for analysis (increases file size)" checked={exportConfig.includeRawData} onChange={(e) => setExportConfig({ ...exportConfig, includeRawData: e.target.checked })}/>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Quick Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={() => setExportConfig({ format: 'pdf', dateRange: 'last7days', includeCharts: true, includeMap: true, includeAlerts: true, includeInterventions: true, includeRawData: false })} iconName="FileText" iconPosition="left" className="justify-start text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">Executive Summary</Button>
          <Button variant="outline" size="sm" onClick={() => setExportConfig({ format: 'excel', dateRange: 'last30days', includeCharts: false, includeMap: false, includeAlerts: false, includeInterventions: false, includeRawData: true })} iconName="Sheet" iconPosition="left" className="justify-start text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">Data Analysis</Button>
          <Button variant="outline" size="sm" onClick={() => setExportConfig({ format: 'pdf', dateRange: 'last30days', includeCharts: true, includeMap: true, includeAlerts: true, includeInterventions: true, includeRawData: true })} iconName="FileText" iconPosition="left" className="justify-start text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">Comprehensive Report</Button>
          <Button variant="outline" size="sm" onClick={() => setExportConfig({ format: 'json', dateRange: 'last7days', includeCharts: false, includeMap: false, includeAlerts: true, includeInterventions: true, includeRawData: true })} iconName="Code" iconPosition="left" className="justify-start text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">API Integration</Button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Export Preview</h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Format: {formatOptions.find(f => f.value === exportConfig.format)?.label}</p>
          <p>Period: {dateRangeOptions.find(d => d.value === exportConfig.dateRange)?.label}</p>
          <p>Sections: {[ exportConfig.includeCharts && 'Charts', exportConfig.includeMap && 'Map', exportConfig.includeAlerts && 'Alerts', exportConfig.includeInterventions && 'Interventions', exportConfig.includeRawData && 'Raw Data' ].filter(Boolean).join(', ')}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="default" onClick={handleExport} loading={isExporting} iconName={getFormatIcon(exportConfig.format)} iconPosition="left" className="flex-1">
          {isExporting ? 'Generating Export...' : 'Export Data'}
        </Button>
        <Button variant="outline" iconName="Eye" onClick={() => {}} className="text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">
          Preview
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Recent Exports</h4>
        <div className="space-y-2">
          {[ { name: 'health_dashboard_report_2025-09-14.pdf', size: '3.2 MB', date: '2 hours ago' }, { name: 'outbreak_data_2025-09-13.xlsx', size: '1.8 MB', date: '1 day ago' }, { name: 'weekly_summary_2025-09-08.pdf', size: '2.7 MB', date: '1 week ago' } ].map((file, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-900 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name={file.name.endsWith('.pdf') ? 'FileText' : 'Sheet'} size={16} className="text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • {file.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="xs" iconName="Download">Download</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;

