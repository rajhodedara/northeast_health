import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AlertFilters = ({ onFilterChange, alertCounts }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    severity: 'all',
    disease: 'all',
    location: 'all',
    dateRange: 'today'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: `All Alerts (${alertCounts?.total})` },
    { value: 'new', label: `New (${alertCounts?.new})` },
    { value: 'acknowledged', label: `Acknowledged (${alertCounts?.acknowledged})` },
    { value: 'in-progress', label: `In Progress (${alertCounts?.inProgress})` },
    { value: 'escalated', label: `Escalated (${alertCounts?.escalated})` },
    { value: 'resolved', label: `Resolved (${alertCounts?.resolved})` }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const diseaseOptions = [
    { value: 'all', label: 'All Diseases' },
    { value: 'cholera', label: 'Cholera' },
    { value: 'typhoid', label: 'Typhoid' },
    { value: 'hepatitis', label: 'Hepatitis A/E' },
    { value: 'diarrhea', label: 'Acute Diarrhea' },
    { value: 'dysentery', label: 'Dysentery' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'kamrup', label: 'Kamrup District' },
    { value: 'guwahati', label: 'Guwahati Metro' },
    { value: 'dibrugarh', label: 'Dibrugarh District' },
    { value: 'silchar', label: 'Silchar District' },
    { value: 'jorhat', label: 'Jorhat District' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      status: 'all',
      severity: 'all',
      disease: 'all',
      location: 'all',
      dateRange: 'today'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== 'today')?.length;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Alert Filters
            </h3>
            <p className="text-sm font-caption text-text-secondary">
              Filter and search outbreak alerts
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {getActiveFilterCount()} active
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.status === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', filters?.status === 'new' ? 'all' : 'new')}
            iconName="AlertCircle"
          >
            New ({alertCounts?.new})
          </Button>
          <Button
            variant={filters?.severity === 'critical' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('severity', filters?.severity === 'critical' ? 'all' : 'critical')}
            iconName="AlertTriangle"
          >
            Critical
          </Button>
          <Button
            variant={filters?.status === 'escalated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', filters?.status === 'escalated' ? 'all' : 'escalated')}
            iconName="TrendingUp"
          >
            Escalated ({alertCounts?.escalated})
          </Button>
          <Button
            variant={filters?.dateRange === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('dateRange', filters?.dateRange === 'today' ? 'all' : 'today')}
            iconName="Calendar"
          >
            Today
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Alert Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              description="Filter by current alert status"
            />
            
            <Select
              label="Severity Level"
              options={severityOptions}
              value={filters?.severity}
              onChange={(value) => handleFilterChange('severity', value)}
              description="Filter by alert severity"
            />
            
            <Select
              label="Disease Type"
              options={diseaseOptions}
              value={filters?.disease}
              onChange={(value) => handleFilterChange('disease', value)}
              description="Filter by disease category"
            />
            
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              description="Filter by geographic area"
            />
            
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              description="Filter by time period"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-body font-medium text-text-primary">
                Search Alerts
              </label>
              <Input
                type="search"
                placeholder="Search by location, disease, or ID..."
                onChange={(e) => handleFilterChange('search', e?.target?.value)}
                className="w-full"
              />
              <p className="text-xs font-caption text-text-secondary">
                Search across all alert fields
              </p>
            </div>
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <Input
                label="Start Date"
                type="date"
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}

          {/* Advanced Filters */}
          <div className="border-t border-border pt-6">
            <h4 className="text-base font-heading font-medium text-text-primary mb-4">
              Advanced Filters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-body font-medium text-text-primary">
                  Minimum Cases
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  onChange={(e) => handleFilterChange('minCases', e?.target?.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-body font-medium text-text-primary">
                  ML Score Range
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min %"
                    min="0"
                    max="100"
                    onChange={(e) => handleFilterChange('minMlScore', e?.target?.value)}
                  />
                  <span className="text-text-secondary">to</span>
                  <Input
                    type="number"
                    placeholder="Max %"
                    min="0"
                    max="100"
                    onChange={(e) => handleFilterChange('maxMlScore', e?.target?.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-body font-medium text-text-primary">
                  Response Time
                </label>
                <Select
                  options={[
                    { value: 'all', label: 'All Response Times' },
                    { value: 'overdue', label: 'Overdue' },
                    { value: 'due-today', label: 'Due Today' },
                    { value: 'due-soon', label: 'Due Soon' }
                  ]}
                  value="all"
                  onChange={(value) => handleFilterChange('responseTime', value)}
                />
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-body text-text-primary">
                <span className="font-medium">{alertCounts?.filtered || alertCounts?.total}</span> alerts match your filters
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  Export Results
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Save"
                >
                  Save Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertFilters;