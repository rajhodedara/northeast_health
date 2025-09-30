import React, { useState, useMemo } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Filter: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46V19l4 2v-8.54L22 3z"></polygon></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, iconPosition, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', icon: 'p-2' };
  const variantClasses = {
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  const icon = iconName && <Icon name={iconName} size={16} className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''} />;
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition !== 'left' && icon}
    </button>
  );
};

const Select = ({ options, value, onChange, placeholder, className = '' }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 ${className}`} >
      {placeholder && <option value="all" disabled>{placeholder}</option>}
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
);

// --- Main Component ---

const MapFilters = ({ onFilterChange = () => {}, onClearFilters = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState({
    disease: 'all',
    region: 'all',
    severity: [],
    waterQuality: []
  });

  const diseaseOptions = [ { value: 'all', label: 'All Diseases' }, { value: 'diarrheal', label: 'Diarrheal Disease' }, { value: 'cholera', label: 'Cholera' }, { value: 'typhoid', label: 'Typhoid' }, { value: 'hepatitis', label: 'Hepatitis A' }, { value: 'dysentery', label: 'Dysentery' } ];
  const regionOptions = [ { value: 'all', label: 'All Regions' }, { value: 'assam', label: 'Assam' }, { value: 'meghalaya', label: 'Meghalaya' }, { value: 'manipur', label: 'Manipur' }, { value: 'nagaland', label: 'Nagaland' } ];
  const severityLevels = [ { id: 'low', label: 'Low', color: 'bg-green-500' }, { id: 'moderate', label: 'Moderate', color: 'bg-yellow-500' }, { id: 'high', label: 'High', color: 'bg-orange-500' }, { id: 'critical', label: 'Critical', color: 'bg-red-500' } ];
  const waterQualityLevels = [ { id: 'safe', label: 'Safe', color: 'bg-green-500' }, { id: 'moderate', label: 'Moderate', color: 'bg-yellow-500' }, { id: 'poor', label: 'Poor', color: 'bg-orange-500' }, { id: 'unsafe', label: 'Unsafe', color: 'bg-red-500' } ];

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectionChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);
  };

  const handleMultiSelectChange = (key, value) => {
    const currentSelection = filters[key];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    handleSelectionChange(key, newSelection);
  };

  const clearAllFilters = () => {
    const clearedFilters = { disease: 'all', region: 'all', severity: [], waterQuality: [] };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = useMemo(() => {
    let count = 0;
    if (filters.disease !== 'all') count++;
    if (filters.region !== 'all') count++;
    if (filters.severity.length > 0) count++;
    if (filters.waterQuality.length > 0) count++;
    return count;
  }, [filters]);

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Map Filters</h2>
            {getActiveFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">{getActiveFilterCount} active</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={clearAllFilters} iconName="X" iconPosition="left">Clear All</Button>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 animate-fade-in-down">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Disease Type</label>
                <Select options={diseaseOptions} value={filters.disease} onChange={(v) => handleSelectionChange('disease', v)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Geographic Region</label>
                <Select options={regionOptions} value={filters.region} onChange={(v) => handleSelectionChange('region', v)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Severity Level</label>
                <div className="flex flex-wrap gap-2">
                    {severityLevels.map(level => (
                        <button key={level.id} onClick={() => handleMultiSelectChange('severity', level.id)} className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${filters.severity.includes(level.id) ? `${level.color} text-white` : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                            {level.label}
                        </button>
                    ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Water Quality</label>
                 <div className="flex flex-wrap gap-2">
                    {waterQualityLevels.map(quality => (
                        <button key={quality.id} onClick={() => handleMultiSelectChange('waterQuality', quality.id)} className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${filters.waterQuality.includes(quality.id) ? `${quality.color} text-white` : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                            {quality.label}
                        </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 dark:text-gray-400">Showing: <span className="font-medium text-gray-800 dark:text-gray-200">1,247 incidents</span></span>
                  <span className="text-gray-500 dark:text-gray-400">Water tests: <span className="font-medium text-gray-800 dark:text-gray-200">391 sites</span></span>
                  <span className="text-gray-500 dark:text-gray-400">Active outbreaks: <span className="font-medium text-red-500">3 zones</span></span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs"><Icon name="Clock" size={14} /><span>Updated 5 min ago</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
       <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MapFilters;
