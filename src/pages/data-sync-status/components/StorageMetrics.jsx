import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageMetrics = ({
  totalStorage = 0,
  usedStorage = 0,
  offlineDataSize = 0,
  onCleanupData
}) => {
  const storagePercentage = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0;
  const offlinePercentage = totalStorage > 0 ? (offlineDataSize / totalStorage) * 100 : 0;

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStorageStatus = () => {
    if (storagePercentage >= 90) return { color: 'error', status: 'Critical' };
    if (storagePercentage >= 75) return { color: 'warning', status: 'High' };
    if (storagePercentage >= 50) return { color: 'primary', status: 'Moderate' };
    return { color: 'success', status: 'Good' };
  };

  const storageStatus = getStorageStatus();

  const storageBreakdown = [
    {
      label: 'Patient Data',
      size: Math.floor(offlineDataSize * 0.4),
      color: 'bg-primary',
      icon: 'User'
    },
    {
      label: 'Water Tests',
      size: Math.floor(offlineDataSize * 0.3),
      color: 'bg-secondary',
      icon: 'Droplets'
    },
    {
      label: 'Form Data',
      size: Math.floor(offlineDataSize * 0.2),
      color: 'bg-warning',
      icon: 'FileText'
    },
    {
      label: 'Images',
      size: Math.floor(offlineDataSize * 0.1),
      color: 'bg-error',
      icon: 'Image'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Storage Usage
          </h3>
          <p className="text-sm font-body text-text-secondary">
            IndexedDB capacity and offline data retention
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${storageStatus?.color === 'error' ? 'bg-error/10 text-error' :
          storageStatus?.color === 'warning' ? 'bg-warning/10 text-warning' :
            storageStatus?.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
          }`}>
          {storageStatus?.status}
        </div>
      </div>
      {/* Overall Storage Usage */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-text-secondary">
            Total Usage
          </span>
          <span className="text-sm font-body font-medium text-text-primary">
            {formatBytes(usedStorage)} of {formatBytes(totalStorage)}
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${storageStatus?.color === 'error' ? 'bg-error' :
              storageStatus?.color === 'warning' ? 'bg-warning' :
                storageStatus?.color === 'primary' ? 'bg-primary' : 'bg-success'
              }`}
            style={{ width: `${Math.min(storagePercentage, 100)}%` }}
          />
        </div>

        <div className="text-center">
          <span className="text-lg font-heading font-bold text-text-primary">
            {storagePercentage?.toFixed(1)}%
          </span>
          <span className="text-sm font-body text-text-secondary ml-1">
            used
          </span>
        </div>
      </div>
      {/* Offline Data Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-body font-medium text-text-primary">
            Offline Data Breakdown
          </h4>
          <span className="text-sm font-body text-text-secondary">
            {formatBytes(offlineDataSize)} total
          </span>
        </div>

        <div className="space-y-3">
          {storageBreakdown?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item?.color}`} />
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm font-body text-text-primary">
                    {item?.label}
                  </span>
                </div>
              </div>
              <span className="text-sm font-body text-text-secondary">
                {formatBytes(item?.size)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Storage Actions */}
      <div className="pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onCleanupData}
            iconName="Trash2"
            iconPosition="left"
            className="flex-1 text-text-primary hover:bg-transparent hover:text-text-primary"
          >
            Clean Up Data
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Handle export data */
            }}
            iconName="Download"
            iconPosition="left"
            className="flex-1 text-text-primary hover:bg-transparent hover:text-text-primary"
          >
            Export Data
          </Button>
        </div>


        {storagePercentage >= 75 && (
          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-body font-medium text-warning">
                  Storage Space Low
                </p>
                <p className="text-xs font-caption text-text-secondary mt-1">
                  Consider cleaning up old data or exporting to free up space for new offline data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageMetrics;