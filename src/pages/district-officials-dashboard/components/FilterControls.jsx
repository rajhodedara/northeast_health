import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange, className = '' }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last7days',
    district: 'all',
    diseaseType: 'all',
    riskLevel: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  const [showCustomDate, setShowCustomDate] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const districtOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'kamrup', label: 'Kamrup Metropolitan' },
    { value: 'dibrugarh', label: 'Dibrugarh' },
    { value: 'cachar', label: 'Cachar' },
    { value: 'jorhat', label: 'Jorhat' },
    { value: 'sivasagar', label: 'Sivasagar' },
    { value: 'nagaon', label: 'Nagaon' }
  ];

  const diseaseTypeOptions = [
    { value: 'all', label: 'All Diseases' },
    { value: 'diarrhea', label: 'Diarrhea' },
    { value: 'cholera', label: 'Cholera' },
    { value: 'typhoid', label: 'Typhoid' },
    { value: 'hepatitis', label: 'Hepatitis A' },
    { value: 'dysentery', label: 'Dysentery' }
  ];

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    
    if (key === 'dateRange') {
      setShowCustomDate(value === 'custom');
      if (value !== 'custom') {
        newFilters.customStartDate = '';
        newFilters.customEndDate = '';
      }
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last7days',
      district: 'all',
      diseaseType: 'all',
      riskLevel: 'all',
      customStartDate: '',
      customEndDate: ''
    };
    setFilters(resetFilters);
    setShowCustomDate(false);
    onFiltersChange(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.district !== 'all') count++;
    if (filters?.diseaseType !== 'all') count++;
    if (filters?.riskLevel !== 'all') count++;
    if (filters?.dateRange !== 'last7days') count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Filter Controls</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* District Filter */}
        <div>
          <Select
            label="District"
            options={districtOptions}
            value={filters?.district}
            onChange={(value) => handleFilterChange('district', value)}
            searchable
          />
        </div>

        {/* Disease Type Filter */}
        <div>
          <Select
            label="Disease Type"
            options={diseaseTypeOptions}
            value={filters?.diseaseType}
            onChange={(value) => handleFilterChange('diseaseType', value)}
          />
        </div>

        {/* Risk Level Filter */}
        <div>
          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => handleFilterChange('riskLevel', value)}
          />
        </div>
      </div>
      {/* Custom Date Range */}
      {showCustomDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <Input
            label="Start Date"
            type="date"
            value={filters?.customStartDate}
            onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.customEndDate}
            onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
          />
        </div>
      )}
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-text-secondary mr-2">Quick filters:</span>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('riskLevel', 'high')}
          className={filters?.riskLevel === 'high' ? 'bg-error text-error-foreground' : ''}
        >
          High Risk Only
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('diseaseType', 'cholera')}
          className={filters?.diseaseType === 'cholera' ? 'bg-primary text-primary-foreground' : ''}
        >
          Cholera Cases
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('dateRange', 'today')}
          className={filters?.dateRange === 'today' ? 'bg-secondary text-secondary-foreground' : ''}
        >
          Today Only
        </Button>
      </div>
      {/* Applied Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Applied Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.district !== 'all' && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                District: {districtOptions?.find(d => d?.value === filters?.district)?.label}
              </span>
            )}
            {filters?.diseaseType !== 'all' && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                Disease: {diseaseTypeOptions?.find(d => d?.value === filters?.diseaseType)?.label}
              </span>
            )}
            {filters?.riskLevel !== 'all' && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                Risk: {riskLevelOptions?.find(r => r?.value === filters?.riskLevel)?.label}
              </span>
            )}
            {filters?.dateRange !== 'last7days' && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                Period: {dateRangeOptions?.find(d => d?.value === filters?.dateRange)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;