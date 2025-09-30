import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SyncHistoryLog = ({ historyData = [] }) => {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [showDetails, setShowDetails] = useState({});

  const timeFilters = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const getFilteredData = () => {
    const now = new Date();
    const filterHours = {
      '1h': 1,
      '24h': 24,
      '7d': 24 * 7,
      '30d': 24 * 30
    };

    const cutoffTime = new Date(now.getTime() - filterHours[timeFilter] * 60 * 60 * 1000);
    return historyData?.filter(item => new Date(item.timestamp) >= cutoffTime);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'CheckCircle';
      case 'partial':
        return 'AlertCircle';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'partial':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev?.[id]
    }));
  };

  const calculateSuccessRate = (data) => {
    if (data?.length === 0) return 0;
    const successful = data?.filter(item => item?.status === 'success')?.length;
    return Math.round((successful / data?.length) * 100);
  };

  const filteredData = getFilteredData();
  const successRate = calculateSuccessRate(filteredData);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Sync History
            </h3>
            <p className="text-sm font-body text-text-secondary">
              Recent synchronization activity and performance metrics
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body text-text-secondary">Success Rate:</span>
              <span
                className={`text-sm font-body font-medium ${successRate >= 90 ? 'text-success' :
                    successRate >= 70 ? 'text-warning' : 'text-error'
                  }`}
              >
                {successRate}%
              </span>
            </div>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md text-sm font-body
               bg-input text-text-primary dark:bg-background dark:text-text-primary 
               focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {timeFilters?.map((filter) => (
                <option
                  key={filter?.value}
                  value={filter?.value}
                  className="bg-input text-text-primary dark:bg-background dark:text-text-primary"
                >
                  {filter?.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredData?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-heading font-medium text-text-primary mb-2">
              No sync history
            </h4>
            <p className="text-sm font-body text-text-secondary">
              No synchronization activity found for the selected time period.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredData?.map((item) => (
              <div key={item?.id} className="p-4 hover:bg-accent/50 transition-colors duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${getStatusColor(item?.status)?.replace('text-', 'bg-')}/10`}>
                      <Icon
                        name={getStatusIcon(item?.status)}
                        size={20}
                        className={getStatusColor(item?.status)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-body font-medium text-text-primary">
                          {item?.operation}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-caption ${item?.status === 'success' ? 'bg-success/10 text-success' :
                            item?.status === 'partial' ? 'bg-warning/10 text-warning' :
                              item?.status === 'failed' ? 'bg-error/10 text-error' : 'bg-muted text-text-secondary'
                          }`}>
                          {item?.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary mb-2">
                        <span>{new Date(item.timestamp)?.toLocaleString()}</span>
                        <span>Duration: {item?.duration}</span>
                        <span>Items: {item?.itemsProcessed}</span>
                      </div>
                      {item?.summary && (
                        <p className="text-sm font-body text-text-secondary">
                          {item?.summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(item?.id)}
                    iconName={showDetails?.[item?.id] ? "ChevronUp" : "ChevronDown"}
                  />
                </div>

                {showDetails?.[item?.id] && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-body font-medium text-text-primary mb-2">
                          Performance Metrics
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs font-caption text-text-secondary">
                              Data Transferred:
                            </span>
                            <span className="text-xs font-caption text-text-primary">
                              {item?.dataTransferred}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs font-caption text-text-secondary">
                              Success Rate:
                            </span>
                            <span className="text-xs font-caption text-text-primary">
                              {item?.successRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs font-caption text-text-secondary">
                              Network Speed:
                            </span>
                            <span className="text-xs font-caption text-text-primary">
                              {item?.networkSpeed}
                            </span>
                          </div>
                        </div>
                      </div>

                      {item?.errors && item?.errors?.length > 0 && (
                        <div>
                          <h5 className="text-sm font-body font-medium text-text-primary mb-2">
                            Issues Encountered
                          </h5>
                          <div className="space-y-1">
                            {item?.errors?.map((error, index) => (
                              <div key={index} className="text-xs font-caption text-error">
                                • {error}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncHistoryLog;