import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkStatusIndicator = ({ 
  isOnline = true, 
  signalStrength = 'strong', 
  lastSyncTime = null,
  onRetryConnection 
}) => {
  const getStatusColor = () => {
    if (!isOnline) return 'text-error';
    switch (signalStrength) {
      case 'weak':
        return 'text-warning';
      case 'moderate':
        return 'text-warning';
      case 'strong':
        return 'text-success';
      default:
        return 'text-success';
    }
  };

  const getStatusIcon = () => {
    if (!isOnline) return 'WifiOff';
    switch (signalStrength) {
      case 'weak':
        return 'Wifi';
      case 'moderate':
        return 'Wifi';
      case 'strong':
        return 'Wifi';
      default:
        return 'Wifi';
    }
  };

  const getSignalBars = () => {
    if (!isOnline) return 0;
    switch (signalStrength) {
      case 'weak':
        return 1;
      case 'moderate':
        return 2;
      case 'strong':
        return 3;
      default:
        return 3;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${
            isOnline ? 'bg-success/10' : 'bg-error/10'
          }`}>
            <Icon 
              name={getStatusIcon()} 
              size={24} 
              className={getStatusColor()}
            />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Network Status
            </h3>
            <p className={`text-sm font-body ${getStatusColor()}`}>
              {isOnline ? `Connected (${signalStrength})` : 'Offline'}
            </p>
          </div>
        </div>
        
        {/* Signal Strength Bars */}
        <div className="flex items-center space-x-1">
          {[1, 2, 3]?.map((bar) => (
            <div
              key={bar}
              className={`w-2 rounded-full transition-colors duration-200 ${
                bar <= getSignalBars() 
                  ? getStatusColor()?.replace('text-', 'bg-')
                  : 'bg-muted'
              }`}
              style={{ height: `${bar * 6 + 6}px` }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-text-secondary">
            Sync Capability
          </span>
          <span className={`text-sm font-body font-medium ${
            isOnline ? 'text-success' : 'text-error'
          }`}>
            {isOnline ? 'Available' : 'Limited'}
          </span>
        </div>

        {lastSyncTime && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-body text-text-secondary">
              Last Sync
            </span>
            <span className="text-sm font-body text-text-primary">
              {lastSyncTime}
            </span>
          </div>
        )}

        {!isOnline && (
          <div className="pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetryConnection}
              iconName="RefreshCw"
              iconPosition="left"
              className="w-full"
            >
              Retry Connection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkStatusIndicator;