import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveHeatMap = ({ className = '' }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const hotspots = [
    {
      id: 1,
      name: "Guwahati Central",
      lat: 26.1445,
      lng: 91.7362,
      riskLevel: "high",
      cases: 45,
      waterQuality: "poor",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "Dibrugarh East",
      lat: 27.4728,
      lng: 94.9120,
      riskLevel: "medium",
      cases: 23,
      waterQuality: "moderate",
      lastUpdated: "4 hours ago"
    },
    {
      id: 3,
      name: "Silchar South",
      lat: 24.8333,
      lng: 92.7789,
      riskLevel: "low",
      cases: 8,
      waterQuality: "good",
      lastUpdated: "1 hour ago"
    },
    {
      id: 4,
      name: "Jorhat North",
      lat: 26.7509,
      lng: 94.2037,
      riskLevel: "high",
      cases: 38,
      waterQuality: "poor",
      lastUpdated: "3 hours ago"
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-text-secondary';
    }
  };

  const getWaterQualityColor = (quality) => {
    switch (quality) {
      case 'poor':
        return 'text-error';
      case 'moderate':
        return 'text-warning';
      case 'good':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Interactive Health Map</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">Live Data</span>
        </div>
      </div>
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-4">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Northeast India Health Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=26.2006,92.9376&z=8&output=embed"
          className="absolute inset-0"
        />
        
        {/* Hotspot Overlays */}
        {hotspots?.map((hotspot) => (
          <div
            key={hotspot?.id}
            className={`absolute w-4 h-4 rounded-full ${getRiskColor(hotspot?.riskLevel)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse hover:scale-125 transition-transform duration-200`}
            style={{
              left: `${20 + (hotspot?.id * 15)}%`,
              top: `${30 + (hotspot?.id * 10)}%`
            }}
            onClick={() => setSelectedHotspot(hotspot)}
            title={`${hotspot?.name} - ${hotspot?.cases} cases`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm text-text-secondary">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-text-secondary">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-text-secondary">Low Risk</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>Last updated: 15 min ago</span>
        </div>
      </div>
      {/* Hotspot Details */}
      {selectedHotspot && (
        <div className="bg-accent border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-text-primary">{selectedHotspot?.name}</h4>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Active Cases</p>
              <p className="text-lg font-semibold text-text-primary">{selectedHotspot?.cases}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Risk Level</p>
              <p className={`text-sm font-medium capitalize ${
                selectedHotspot?.riskLevel === 'high' ? 'text-error' :
                selectedHotspot?.riskLevel === 'medium' ? 'text-warning' : 'text-success'
              }`}>
                {selectedHotspot?.riskLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Water Quality</p>
              <p className={`text-sm font-medium capitalize ${getWaterQualityColor(selectedHotspot?.waterQuality)}`}>
                {selectedHotspot?.waterQuality}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Last Updated</p>
              <p className="text-sm text-text-primary">{selectedHotspot?.lastUpdated}</p>
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors">
              View Details
            </button>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/90 transition-colors">
              Send Alert
            </button>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-error">4</p>
          <p className="text-xs text-text-secondary">High Risk Areas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">7</p>
          <p className="text-xs text-text-secondary">Medium Risk Areas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">12</p>
          <p className="text-xs text-text-secondary">Low Risk Areas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">114</p>
          <p className="text-xs text-text-secondary">Total Cases</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHeatMap;