import React from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = ({ isVisible, onToggle }) => {
  const legendItems = [
    {
      category: "Health Incidents",
      items: [
        { color: "bg-red-500", label: "Diarrheal Disease", count: 45 },
        { color: "bg-orange-500", label: "Cholera", count: 12 },
        { color: "bg-yellow-500", label: "Typhoid", count: 8 },
        { color: "bg-purple-500", label: "Hepatitis A", count: 6 }
      ]
    },
    {
      category: "Water Quality",
      items: [
        { color: "bg-green-500", label: "Safe (0-5 CFU)", count: 234 },
        { color: "bg-yellow-400", label: "Moderate (6-20 CFU)", count: 89 },
        { color: "bg-orange-400", label: "Poor (21-100 CFU)", count: 45 },
        { color: "bg-red-400", label: "Unsafe (>100 CFU)", count: 23 }
      ]
    },
    {
      category: "Outbreak Status",
      items: [
        { color: "bg-red-600", label: "Active Outbreak", count: 3 },
        { color: "bg-orange-600", label: "High Risk", count: 7 },
        { color: "bg-yellow-600", label: "Monitoring", count: 15 },
        { color: "bg-green-600", label: "Controlled", count: 28 }
      ]
    }
  ];

  const markerTypes = [
    { icon: "MapPin", color: "text-red-500", label: "Health Facility" },
    { icon: "Droplets", color: "text-blue-500", label: "Water Source" },
    { icon: "AlertTriangle", color: "text-orange-500", label: "Outbreak Zone" },
    { icon: "Shield", color: "text-green-500", label: "Intervention Site" }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-surface border border-border rounded-lg p-3 shadow-modal hover:shadow-lg transition-shadow duration-200 z-1000"
      >
        <Icon name="Info" size={20} className="text-text-primary" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-surface border border-border rounded-lg shadow-modal z-1000 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Map Legend</h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-accent rounded-md transition-colors duration-150"
        >
          <Icon name="X" size={16} className="text-text-secondary" />
        </button>
      </div>
      <div className="p-4 space-y-6">
        {/* Data Categories */}
        {legendItems?.map((category, index) => (
          <div key={index} className="space-y-3">
            <h4 className="text-sm font-body font-medium text-text-primary">{category?.category}</h4>
            <div className="space-y-2">
              {category?.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                    <span className="text-sm font-body text-text-secondary">{item?.label}</span>
                  </div>
                  <span className="text-xs font-caption text-text-secondary bg-muted px-2 py-1 rounded">
                    {item?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Marker Types */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-body font-medium text-text-primary">Map Markers</h4>
          <div className="space-y-2">
            {markerTypes?.map((marker, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name={marker?.icon} size={16} className={marker?.color} />
                <span className="text-sm font-body text-text-secondary">{marker?.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Freshness */}
        <div className="space-y-2 border-t border-border pt-4">
          <h4 className="text-sm font-body font-medium text-text-primary">Data Status</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-caption text-text-secondary">
              Last updated: 15 minutes ago
            </span>
          </div>
          <div className="text-xs font-caption text-text-secondary">
            Next sync: 2:30 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;