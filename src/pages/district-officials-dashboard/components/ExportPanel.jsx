import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

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
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, this would trigger the actual export
    console.log('Exporting with config:', exportConfig);
    
    // Simulate file download
    const filename = `health_dashboard_report_${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    
    setIsExporting(false);
    
    // Show success message (in real app, this would be a toast notification)
    alert(`Export completed! File: ${filename}`);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf':
        return 'FileText';
      case 'excel':
        return 'Sheet';
      case 'csv':
        return 'Database';
      case 'json':
        return 'Code';
      default:
        return 'Download';
    }
  };

  const getEstimatedSize = () => {
    let baseSize = 2; // MB
    if (exportConfig?.includeCharts) baseSize += 1.5;
    if (exportConfig?.includeMap) baseSize += 3;
    if (exportConfig?.includeRawData) baseSize += 5;
    
    return baseSize?.toFixed(1);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Export Data</h3>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="HardDrive" size={16} />
          <span>Est. size: {getEstimatedSize()} MB</span>
        </div>
      </div>
      {/* Export Format Selection */}
      <div className="mb-6">
        <Select
          label="Export Format"
          description="Choose the format for your exported data"
          options={formatOptions}
          value={exportConfig?.format}
          onChange={(value) => setExportConfig({ ...exportConfig, format: value })}
        />
      </div>
      {/* Date Range Selection */}
      <div className="mb-6">
        <Select
          label="Date Range"
          description="Select the time period for data export"
          options={dateRangeOptions}
          value={exportConfig?.dateRange}
          onChange={(value) => setExportConfig({ ...exportConfig, dateRange: value })}
        />
      </div>
      {/* Content Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Include in Export</h4>
        <div className="space-y-3">
          <Checkbox
            label="Charts and Visualizations"
            description="Disease distribution charts, trend analysis graphs"
            checked={exportConfig?.includeCharts}
            onChange={(e) => setExportConfig({ ...exportConfig, includeCharts: e?.target?.checked })}
          />
          
          <Checkbox
            label="Interactive Heat Map"
            description="Geographic health data visualization with hotspots"
            checked={exportConfig?.includeMap}
            onChange={(e) => setExportConfig({ ...exportConfig, includeMap: e?.target?.checked })}
          />
          
          <Checkbox
            label="Alert Summary"
            description="Active alerts and SMS system status"
            checked={exportConfig?.includeAlerts}
            onChange={(e) => setExportConfig({ ...exportConfig, includeAlerts: e?.target?.checked })}
          />
          
          <Checkbox
            label="Intervention Tracking"
            description="Ongoing response activities and status updates"
            checked={exportConfig?.includeInterventions}
            onChange={(e) => setExportConfig({ ...exportConfig, includeInterventions: e?.target?.checked })}
          />
          
          <Checkbox
            label="Raw Data Tables"
            description="Detailed data tables for analysis (increases file size)"
            checked={exportConfig?.includeRawData}
            onChange={(e) => setExportConfig({ ...exportConfig, includeRawData: e?.target?.checked })}
          />
        </div>
      </div>
      {/* Quick Export Templates */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportConfig({
              format: 'pdf',
              dateRange: 'last7days',
              includeCharts: true,
              includeMap: true,
              includeAlerts: true,
              includeInterventions: true,
              includeRawData: false
            })}
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            Executive Summary
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportConfig({
              format: 'excel',
              dateRange: 'last30days',
              includeCharts: false,
              includeMap: false,
              includeAlerts: false,
              includeInterventions: false,
              includeRawData: true
            })}
            iconName="Sheet"
            iconPosition="left"
            className="justify-start"
          >
            Data Analysis
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportConfig({
              format: 'pdf',
              dateRange: 'last30days',
              includeCharts: true,
              includeMap: true,
              includeAlerts: true,
              includeInterventions: true,
              includeRawData: true
            })}
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            Comprehensive Report
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportConfig({
              format: 'json',
              dateRange: 'last7days',
              includeCharts: false,
              includeMap: false,
              includeAlerts: true,
              includeInterventions: true,
              includeRawData: true
            })}
            iconName="Code"
            iconPosition="left"
            className="justify-start"
          >
            API Integration
          </Button>
        </div>
      </div>
      {/* Export Preview */}
      <div className="bg-accent rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-2">Export Preview</h4>
        <div className="text-sm text-text-secondary space-y-1">
          <p>Format: {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</p>
          <p>Period: {dateRangeOptions?.find(d => d?.value === exportConfig?.dateRange)?.label}</p>
          <p>Sections: {[
            exportConfig?.includeCharts && 'Charts',
            exportConfig?.includeMap && 'Map',
            exportConfig?.includeAlerts && 'Alerts',
            exportConfig?.includeInterventions && 'Interventions',
            exportConfig?.includeRawData && 'Raw Data'
          ]?.filter(Boolean)?.join(', ')}</p>
        </div>
      </div>
      {/* Export Actions */}
      <div className="flex space-x-3">
        <Button
          variant="default"
          onClick={handleExport}
          loading={isExporting}
          iconName={getFormatIcon(exportConfig?.format)}
          iconPosition="left"
          className="flex-1"
        >
          {isExporting ? 'Generating Export...' : 'Export Data'}
        </Button>
        
        <Button
          variant="outline"
          iconName="Eye"
          onClick={() => {
            // In a real app, this would show a preview modal
            alert('Preview functionality would open a modal with sample export content');
          }}
        >
          Preview
        </Button>
      </div>
      {/* Recent Exports */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Recent Exports</h4>
        <div className="space-y-2">
          {[
            { name: 'health_dashboard_report_2025-09-14.pdf', size: '3.2 MB', date: '2 hours ago' },
            { name: 'outbreak_data_2025-09-13.xlsx', size: '1.8 MB', date: '1 day ago' },
            { name: 'weekly_summary_2025-09-08.pdf', size: '2.7 MB', date: '1 week ago' }
          ]?.map((file, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-accent rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name={file?.name?.endsWith('.pdf') ? 'FileText' : 'Sheet'} size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{file?.name}</p>
                  <p className="text-xs text-text-secondary">{file?.size} • {file?.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="xs" iconName="Download">
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;