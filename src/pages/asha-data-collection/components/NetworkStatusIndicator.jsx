import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkStatusIndicator = ({ isOffline, syncStatus, pendingCount, onRetrySync }) => {
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncProgress, setSyncProgress] = useState(0);

  useEffect(() => {
    // Simulate sync progress when syncing
    if (syncStatus === 'syncing') {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setSyncProgress(0);
    }
  }, [syncStatus]);

  useEffect(() => {
    // Update last sync time when sync completes
    if (syncStatus === 'synced') {
      setLastSyncTime(new Date());
    }
  }, [syncStatus]);

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-success bg-success/10 border-success/20';
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'CheckCircle';
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Syncing data...';
      case 'error':
        return 'Sync failed';
      case 'pending':
        return `${pendingCount} items pending`;
      default:
        return 'All data synced';
    }
  };

  const formatLastSyncTime = () => {
    if (!lastSyncTime) return 'Never';
    
    const now = new Date();
    const diffMs = now - lastSyncTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return lastSyncTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-medium text-text-primary">
          Network Status
        </h3>
        
        {/* Network Connection Status */}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-caption ${
          isOffline 
            ? 'text-error bg-error/10 border border-error/20' :'text-success bg-success/10 border border-success/20'
        }`}>
          <Icon 
            name={isOffline ? "WifiOff" : "Wifi"} 
            size={14} 
          />
          <span>{isOffline ? 'Offline' : 'Online'}</span>
        </div>
      </div>
      {/* Sync Status */}
      <div className={`flex items-center space-x-3 p-3 rounded-lg border ${getSyncStatusColor()}`}>
        <Icon 
          name={getSyncStatusIcon()} 
          size={20} 
          className={syncStatus === 'syncing' ? 'animate-spin' : ''}
        />
        
        <div className="flex-1">
          <div className="text-sm font-body font-medium">
            {getSyncStatusText()}
          </div>
          
          {syncStatus === 'syncing' && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${syncProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {syncProgress}% complete
              </div>
            </div>
          )}
          
          <div className="text-xs text-text-secondary mt-1">
            Last sync: {formatLastSyncTime()}
          </div>
        </div>

        {syncStatus === 'error' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetrySync}
            iconName="RotateCcw"
            className="shrink-0"
          >
            Retry
          </Button>
        )}
      </div>
      {/* Pending Items Counter */}
      {pendingCount > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-body text-text-primary">
                {pendingCount} items waiting to sync
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span className="text-xs font-caption text-text-secondary">
                Queued
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Data Usage Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-heading font-semibold text-text-primary">
              {Math.floor(Math.random() * 50) + 10}
            </div>
            <div className="text-xs font-caption text-text-secondary">
              Forms Submitted Today
            </div>
          </div>
          
          <div>
            <div className="text-lg font-heading font-semibold text-text-primary">
              {(Math.random() * 5 + 1)?.toFixed(1)} MB
            </div>
            <div className="text-xs font-caption text-text-secondary">
              Data Usage Today
            </div>
          </div>
        </div>
      </div>
      {/* Offline Mode Tips */}
      {isOffline && (
        <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div>
              <div className="text-sm font-body font-medium text-warning">
                Offline Mode Active
              </div>
              <div className="text-xs font-caption text-text-secondary mt-1">
                Your data is being saved locally and will sync automatically when you're back online.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStatusIndicator;