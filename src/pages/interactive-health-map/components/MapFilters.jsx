import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const MapFilters = ({ onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedWaterQuality, setSelectedWaterQuality] = useState([]);

  const diseaseOptions = [
    { value: 'all', label: 'All Diseases' },
    { value: 'diarrheal', label: 'Diarrheal Disease' },
    { value: 'cholera', label: 'Cholera' },
    { value: 'typhoid', label: 'Typhoid' },
    { value: 'hepatitis', label: 'Hepatitis A' },
    { value: 'dysentery', label: 'Dysentery' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'assam', label: 'Assam' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'arunachal', label: 'Arunachal Pradesh' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low Risk', color: 'text-green-600' },
    { id: 'moderate', label: 'Moderate Risk', color: 'text-yellow-600' },
    { id: 'high', label: 'High Risk', color: 'text-orange-600' },
    { id: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  const waterQualityLevels = [
    { id: 'safe', label: 'Safe (0-5 CFU)', color: 'text-green-600' },
    { id: 'moderate', label: 'Moderate (6-20 CFU)', color: 'text-yellow-600' },
    { id: 'poor', label: 'Poor (21-100 CFU)', color: 'text-orange-600' },
    { id: 'unsafe', label: 'Unsafe (>100 CFU)', color: 'text-red-600' }
  ];

  const handleSeverityChange = (severityId, checked) => {
    const newSelection = checked
      ? [...selectedSeverity, severityId]
      : selectedSeverity?.filter(id => id !== severityId);
    setSelectedSeverity(newSelection);
    applyFilters({ severity: newSelection });
  };

  const handleWaterQualityChange = (qualityId, checked) => {
    const newSelection = checked
      ? [...selectedWaterQuality, qualityId]
      : selectedWaterQuality?.filter(id => id !== qualityId);
    setSelectedWaterQuality(newSelection);
    applyFilters({ waterQuality: newSelection });
  };

  const applyFilters = (updates = {}) => {
    const filters = {
      disease: selectedDisease,
      severity: selectedSeverity,
      region: selectedRegion,
      waterQuality: selectedWaterQuality,
      ...updates
    };
    onFilterChange(filters);
  };

  const clearAllFilters = () => {
    setSelectedDisease('all');
    setSelectedSeverity([]);
    setSelectedRegion('all');
    setSelectedWaterQuality([]);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedDisease !== 'all') count++;
    if (selectedSeverity?.length > 0) count++;
    if (selectedRegion !== 'all') count++;
    if (selectedWaterQuality?.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Map Filters
            </h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-caption px-2 py-1 rounded-full">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Disease Type Filter */}
            <div className="space-y-3">
              <label className="text-sm font-body font-medium text-text-primary">
                Disease Type
              </label>
              <Select
                options={diseaseOptions}
                value={selectedDisease}
                onChange={(value) => {
                  setSelectedDisease(value);
                  applyFilters({ disease: value });
                }}
                placeholder="Select disease"
              />
            </div>

            {/* Geographic Region Filter */}
            <div className="space-y-3">
              <label className="text-sm font-body font-medium text-text-primary">
                Geographic Region
              </label>
              <Select
                options={regionOptions}
                value={selectedRegion}
                onChange={(value) => {
                  setSelectedRegion(value);
                  applyFilters({ region: value });
                }}
                placeholder="Select region"
              />
            </div>

            {/* Severity Level Filter */}
            <div className="space-y-3">
              <label className="text-sm font-body font-medium text-text-primary">
                Severity Level
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {severityLevels?.map((level) => (
                  <Checkbox
                    key={level?.id}
                    label={level?.label}
                    checked={selectedSeverity?.includes(level?.id)}
                    onChange={(e) => handleSeverityChange(level?.id, e?.target?.checked)}
                    className={level?.color}
                  />
                ))}
              </div>
            </div>

            {/* Water Quality Filter */}
            <div className="space-y-3">
              <label className="text-sm font-body font-medium text-text-primary">
                Water Quality
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {waterQualityLevels?.map((quality) => (
                  <Checkbox
                    key={quality?.id}
                    label={quality?.label}
                    checked={selectedWaterQuality?.includes(quality?.id)}
                    onChange={(e) => handleWaterQualityChange(quality?.id, e?.target?.checked)}
                    className={quality?.color}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm font-body">
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary">
                  Showing: <span className="font-medium text-text-primary">1,247 incidents</span>
                </span>
                <span className="text-text-secondary">
                  Water tests: <span className="font-medium text-text-primary">391 sites</span>
                </span>
                <span className="text-text-secondary">
                  Active outbreaks: <span className="font-medium text-red-600">3 zones</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Clock" size={14} />
                <span className="text-xs font-caption">Updated 5 min ago</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapFilters;