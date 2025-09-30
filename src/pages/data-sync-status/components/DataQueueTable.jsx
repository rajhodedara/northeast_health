import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataQueueTable = ({ queueData = [], onRetryItem, onDeleteItem }) => {
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'syncing':
        return 'text-primary bg-primary/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'synced':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getDataTypeIcon = (type) => {
    switch (type) {
      case 'patient_data':
        return 'User';
      case 'water_test':
        return 'Droplets';
      case 'form_submission':
        return 'FileText';
      case 'image_upload':
        return 'Image';
      default:
        return 'File';
    }
  };

  const formatDataType = (type) => {
    return type?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
  };

  const sortedAndFilteredData = queueData?.filter(item => filterType === 'all' || item?.status === filterType)?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'timestamp') {
      return (new Date(aValue) - new Date(bValue)) * modifier;
    }

    return aValue?.localeCompare(bValue) * modifier;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Data Queue
            </h3>
            <p className="text-sm font-body text-text-secondary">
              {queueData?.length} items awaiting synchronization
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm font-body bg-input text-text-primary dark:bg-background dark:text-text-primary dark:border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option className="bg-input text-text-primary dark:bg-background dark:text-text-primary" value="all">All Status</option>
              <option className="bg-input text-text-primary dark:bg-background dark:text-text-primary" value="pending">Pending</option>
              <option className="bg-input text-text-primary dark:bg-background dark:text-text-primary" value="syncing">Syncing</option>
              <option className="bg-input text-text-primary dark:bg-background dark:text-text-primary" value="failed">Failed</option>
            </select>

          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <button
                  onClick={() => handleSort('dataType')}
                  className="flex items-center space-x-1 text-xs font-caption font-medium text-text-secondary dark:text-text-secondary uppercase tracking-wide hover:text-text-primary dark:hover:text-text-primary focus:outline-none"
                >
                  <span>Data Type</span>
                  <Icon
                    name="ArrowUpDown"
                    size={12}
                    className="text-text-secondary dark:text-text-secondary group-hover:text-text-primary dark:group-hover:text-text-primary"
                  />
                </button>
              </th>

              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 text-xs font-caption font-medium text-text-secondary uppercase tracking-wide hover:text-text-primary"
                >
                  <span>Created</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <span className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">
                  Status
                </span>
              </th>
              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <span className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">
                  Attempts
                </span>
              </th>
              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <span className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">
                  Size
                </span>
              </th>
              <th className="px-6 py-3 text-left bg-transparent dark:bg-background">
                <span className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAndFilteredData?.map((item) => (
              <tr key={item?.id} className="hover:bg-accent/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent rounded-md">
                      <Icon
                        name={getDataTypeIcon(item?.dataType)}
                        size={16}
                        className="text-accent-foreground"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-body font-medium text-text-primary">
                        {formatDataType(item?.dataType)}
                      </div>
                      <div className="text-xs font-caption text-text-secondary truncate max-w-32">
                        {item?.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-body text-text-primary">
                    {new Date(item.timestamp)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {new Date(item.timestamp)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-caption font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status === 'syncing' && (
                      <Icon name="RefreshCw" size={12} className="mr-1 animate-spin" />
                    )}
                    {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-body text-text-primary">
                    {item?.attempts}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    of {item?.maxAttempts}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-body text-text-primary">
                    {item?.size}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {item?.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRetryItem(item?.id)}
                        iconName="RefreshCw"
                        className="text-primary hover:text-primary"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteItem(item?.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedAndFilteredData?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Database" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-heading font-medium text-text-primary mb-2">
            No data in queue
          </h4>
          <p className="text-sm font-body text-text-secondary">
            {filterType === 'all' ? 'All data has been synchronized successfully.'
              : `No items with ${filterType} status found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DataQueueTable;