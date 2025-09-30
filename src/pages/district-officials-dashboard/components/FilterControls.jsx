import React from 'react';

// --- Helper Components (Placeholders to resolve errors) ---

// A basic Icon component that uses an inline SVG for demonstration
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Filter: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
    ),
    RotateCcw: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>
    ),
    Info: (
       <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    ),
    Sparkles: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9z"/></svg>
    )
  };
  const IconComponent = icons[name] || null;
  return <div className={className}>{IconComponent}</div>;
};

// A basic Button component
const Button = ({ variant, size, onClick, iconName, iconPosition, children, className = '', disabled = false }) => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        xs: 'px-2 py-1 text-xs',
    };
    const variantClasses = {
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800',
    };
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        >
            {iconName && iconPosition === 'left' && <Icon name={iconName} size={16} className="mr-2" />}
            {children}
            {iconName && iconPosition === 'right' && <Icon name={iconName} size={16} className="ml-2" />}
        </button>
    );
};


// A basic Select component
const Select = ({ label, options, value, onChange, searchable }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white dark:border-gray-600"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// A basic Input component
const Input = ({ label, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white dark:border-gray-600"
    />
  </div>
);


// --- Main FilterControls Component ---

const FilterControls = ({ onFiltersChange, className = '' }) => {
  const [filters, setFilters] = React.useState({
    dateRange: 'last7days',
    district: 'all',
    diseaseType: 'all',
    riskLevel: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  const [showCustomDate, setShowCustomDate] = React.useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [apiError, setApiError] = React.useState('');

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
    // Clear suggestions when filters change
    setSuggestions([]);
    setApiError('');
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
    setSuggestions([]);
    setApiError('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.district !== 'all') count++;
    if (filters?.diseaseType !== 'all') count++;
    if (filters?.riskLevel !== 'all') count++;
    if (filters?.dateRange !== 'last7days') count++;
    return count;
  };

  const handleFetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setSuggestions([]);
    setApiError('');

    // Mock data for demonstration purposes
    const mockSuggestions = [
      {
        suggestionName: "High-Risk Cholera Cases",
        filters: { riskLevel: "high", diseaseType: "cholera" }
      },
      {
        suggestionName: "Recent Cases in Kamrup",
        filters: { district: "kamrup", dateRange: "last7days" }
      },
      {
        suggestionName: "Typhoid in Last 30 Days",
        filters: { diseaseType: "typhoid", dateRange: "last30days" }
      }
    ];

    // Simulate a network delay
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setIsLoadingSuggestions(false);
    }, 1500); // 1.5-second delay
  };

  const applySuggestion = (suggestedFilters) => {
    const newFilters = {
        dateRange: 'last7days',
        district: 'all',
        diseaseType: 'all',
        riskLevel: 'all',
        customStartDate: '',
        customEndDate: '',
        ...suggestedFilters
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    setSuggestions([]);
  };


  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filter Controls</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
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
          className="dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
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

      {/* Gemini Smart Suggestions */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
         <Button
            variant="outline"
            size="sm"
            onClick={handleFetchSuggestions}
            iconName="Sparkles"
            iconPosition="left"
            disabled={isLoadingSuggestions}
            className="dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
        >
            {isLoadingSuggestions ? 'Thinking...' : '✨ Get Smart Suggestions'}
        </Button>
        {apiError && <p className="text-sm text-red-500 mt-2">{apiError}</p>}
        {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Try these:</span>
                {suggestions.map((suggestion, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="xs"
                        onClick={() => applySuggestion(suggestion.filters)}
                        className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        {suggestion.suggestionName}
                    </Button>
                ))}
            </div>
        )}
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Quick filters:</span>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('riskLevel', 'high')}
          className={filters?.riskLevel === 'high' ? 'bg-red-500 text-white' : 'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}
        >
          High Risk Only
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('diseaseType', 'cholera')}
          className={filters?.diseaseType === 'cholera' ? 'bg-blue-500 text-white' : 'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}
        >
          Cholera Cases
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleFilterChange('dateRange', 'today')}
          className={filters?.dateRange === 'today' ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : 'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}
        >
          Today Only
        </Button>
      </div>

      {/* Applied Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Applied Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.district !== 'all' && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                District: {districtOptions?.find(d => d?.value === filters?.district)?.label}
              </span>
            )}
            {filters?.diseaseType !== 'all' && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                Disease: {diseaseTypeOptions?.find(d => d?.value === filters?.diseaseType)?.label}
              </span>
            )}
            {filters?.riskLevel !== 'all' && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                Risk: {riskLevelOptions?.find(r => r?.value === filters?.riskLevel)?.label}
              </span>
            )}
            {filters?.dateRange !== 'last7days' && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
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

