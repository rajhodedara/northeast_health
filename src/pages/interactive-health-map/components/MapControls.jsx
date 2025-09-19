import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MapControls = ({ onLayerToggle, onTimeRangeChange, onZoomChange, onExport }) => {
  const [activeLayer, setActiveLayer] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');
  const [zoomLevel, setZoomLevel] = useState(10);

  const layerOptions = [
    { value: 'all', label: 'All Data Layers' },
    { value: 'health', label: 'Health Incidents' },
    { value: 'water', label: 'Water Quality' },
    { value: 'outbreaks', label: 'Outbreak Zones' },
    { value: 'interventions', label: 'Interventions' }
  ];

  const timeRangeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleLayerChange = (value) => {
    setActiveLayer(value);
    onLayerToggle(value);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    onTimeRangeChange(value);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 1, 18);
    setZoomLevel(newZoom);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 1, 5);
    setZoomLevel(newZoom);
    onZoomChange(newZoom);
  };

  return (
    <div className="absolute top-4 left-4 z-1000 space-y-4">
      {/* Layer Controls */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-modal min-w-64">
        <h3 className="text-sm font-body font-medium text-text-primary mb-3">Data Layers</h3>
        <Select
          options={layerOptions}
          value={activeLayer}
          onChange={handleLayerChange}
          placeholder="Select layer"
        />
      </div>

      {/* Time Range Controls */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-modal min-w-64">
        <h3 className="text-sm font-body font-medium text-text-primary mb-3">Time Period</h3>
        <Select
          options={timeRangeOptions}
          value={timeRange}
          onChange={handleTimeRangeChange}
          placeholder="Select time range"
        />
      </div>

      {/* Zoom Controls */}
      <div className="bg-surface border border-border rounded-lg p-2 shadow-modal">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            iconName="Plus"
            className="w-10 h-10"
          />
          <div className="text-xs font-caption text-center text-text-secondary py-1">
            {zoomLevel}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            iconName="Minus"
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Export Controls */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-modal min-w-64">
        <h3 className="text-sm font-body font-medium text-text-primary mb-3">Export Options</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('screenshot')}
            iconName="Camera"
            iconPosition="left"
            fullWidth
          >
            Screenshot
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('data')}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-4 shadow-modal min-w-64">
        <h3 className="text-sm font-body font-medium text-text-primary mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
          >
            Refresh Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Home"
            iconPosition="left"
            fullWidth
          >
            Reset View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapControls;