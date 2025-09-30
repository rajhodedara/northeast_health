import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorResolutionPanel = ({ errorItems = [], onRetryItem, onResolveError }) => {
  const [expandedError, setExpandedError] = useState(null);

  const getErrorTypeIcon = (errorType) => {
    switch (errorType) {
      case 'network':
        return 'WifiOff';
      case 'validation':
        return 'AlertCircle';
      case 'authentication':
        return 'Lock';
      case 'server':
        return 'Server';
      case 'storage':
        return 'HardDrive';
      default:
        return 'AlertTriangle';
    }
  };

  const getErrorSeverity = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getSuggestedActions = (errorType) => {
    switch (errorType) {
      case 'network':
        return [
          'Check internet connection',
          'Try switching to mobile data',
          'Move to area with better signal',
          'Retry sync when connection improves'
        ];
      case 'validation':
        return [
          'Review data for missing fields',
          'Check data format requirements',
          'Verify all required information',
          'Contact support if issue persists'
        ];
      case 'authentication':
        return [
          'Re-login to your account',
          'Check user permissions',
          'Contact administrator',
          'Clear app cache and retry'
        ];
      case 'server':
        return [
          'Wait and retry in few minutes',
          'Check system status',
          'Contact technical support',
          'Try during off-peak hours'
        ];
      case 'storage':
        return [
          'Free up device storage',
          'Clear app cache',
          'Remove old data files',
          'Restart the application'
        ];
      default:
        return [
          'Retry the operation',
          'Check system requirements',
          'Contact support team',
          'Review error details'
        ];
    }
  };

  const toggleErrorExpansion = (errorId) => {
    setExpandedError(expandedError === errorId ? null : errorId);
  };

  if (errorItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-sm text-center">
        <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No Sync Errors
        </h3>
        <p className="text-sm font-body text-text-secondary">
          All data synchronization is working smoothly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Error Resolution
            </h3>
            <p className="text-sm font-body text-text-secondary">
              {errorItems?.length} items need attention
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => errorItems?.forEach(item => onRetryItem(item?.id))}
            iconName="RefreshCw"
            iconPosition="left"
            className="text-text-primary border-border bg-transparent hover:bg-transparent hover:text-text-primary dark:text-text-primary dark:hover:text-text-primary dark:hover:bg-transparent"
          >
            Retry All
          </Button>

        </div>
      </div>
      <div className="divide-y divide-border">
        {errorItems?.map((error) => (
          <div key={error?.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg border ${getErrorSeverity(error?.severity)}`}>
                  <Icon
                    name={getErrorTypeIcon(error?.errorType)}
                    size={20}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-body font-semibold text-text-primary">
                      {error?.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-caption ${getErrorSeverity(error?.severity)}`}>
                      {error?.severity} priority
                    </span>
                  </div>
                  <p className="text-sm font-body text-text-secondary mb-2">
                    {error?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
                    <span>Failed: {new Date(error.timestamp)?.toLocaleString()}</span>
                    <span>Attempts: {error?.attempts}</span>
                    <span>Data: {error?.dataType}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleErrorExpansion(error?.id)}
                  iconName={expandedError === error?.id ? "ChevronUp" : "ChevronDown"}
                  className="bg-transparent text-text-primary hover:bg-transparent hover:text-text-primary dark:text-text-primary dark:hover:text-text-primary dark:hover:bg-transparent"
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRetryItem(error?.id)}
                  iconName="RefreshCw"
                  className="border-border text-text-primary bg-transparent hover:bg-transparent hover:text-text-primary dark:text-text-primary dark:border-border dark:hover:bg-transparent"
                >
                  Retry
                </Button>
              </div>

            </div>

            {expandedError === error?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {/* Error Details */}
                <div>
                  <h5 className="text-sm font-body font-medium text-text-primary mb-2">
                    Error Details
                  </h5>
                  <div className="bg-muted rounded-md p-3">
                    <code className="text-xs font-mono text-text-primary">
                      {error?.errorMessage}
                    </code>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div>
                  <h5 className="text-sm font-body font-medium text-text-primary mb-3">
                    Suggested Actions
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getSuggestedActions(error?.errorType)?.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-primary" />
                        <span className="text-sm font-body text-text-secondary">
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onRetryItem(error?.id)}
                    iconName="RefreshCw"
                    iconPosition="left"
                    className="bg-primary text-white hover:bg-primary dark:bg-primary dark:text-white dark:hover:bg-primary"
                  >
                    Retry Now
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onResolveError(error?.id)}
                    iconName="Check"
                    iconPosition="left"
                    className="border-border text-text-primary bg-transparent hover:bg-transparent hover:text-text-primary dark:text-text-primary dark:border-border dark:hover:bg-transparent"
                  >
                    Mark Resolved
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      /* Handle contact support */
                    }}
                    iconName="HelpCircle"
                    iconPosition="left"
                    className="text-text-primary bg-transparent hover:bg-transparent hover:text-text-primary dark:text-text-primary dark:hover:text-text-primary"
                  >
                    Get Help
                  </Button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorResolutionPanel;