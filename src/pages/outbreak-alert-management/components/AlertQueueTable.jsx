import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertQueueTable = ({ alerts, onAlertAction, onBulkAction }) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'escalated':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAlerts(alerts?.map(alert => alert?.id));
    } else {
      setSelectedAlerts([]);
    }
  };

  const handleSelectAlert = (alertId, checked) => {
    if (checked) {
      setSelectedAlerts(prev => [...prev, alertId]);
    } else {
      setSelectedAlerts(prev => prev?.filter(id => id !== alertId));
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedAlerts = [...alerts]?.sort((a, b) => {
    if (sortConfig?.key === 'timestamp') {
      return sortConfig?.direction === 'asc' 
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    }
    if (sortConfig?.key === 'patientCount') {
      return sortConfig?.direction === 'asc' 
        ? a?.patientCount - b?.patientCount
        : b?.patientCount - a?.patientCount;
    }
    return 0;
  });

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card overflow-hidden">
      {/* Table Header with Bulk Actions */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedAlerts?.length === alerts?.length && alerts?.length > 0}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-body text-text-primary">
              {selectedAlerts?.length > 0 ? `${selectedAlerts?.length} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedAlerts?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('acknowledge', selectedAlerts)}
                iconName="Check"
              >
                Acknowledge
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('escalate', selectedAlerts)}
                iconName="AlertTriangle"
              >
                Escalate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('resolve', selectedAlerts)}
                iconName="CheckCircle"
              >
                Resolve
              </Button>
            </div>
          )}
        </div>
        
        <div className="text-sm font-caption text-text-secondary">
          {alerts?.length} active alerts
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-text-primary hover:text-primary"
                >
                  <span>Alert Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                Disease
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                Location
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('patientCount')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-text-primary hover:text-primary"
                >
                  <span>Cases</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                ML Score
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-body font-medium text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAlerts?.map((alert) => (
              <tr key={alert?.id} className="hover:bg-muted/10 transition-colors duration-150">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedAlerts?.includes(alert?.id)}
                    onChange={(e) => handleSelectAlert(alert?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-body text-text-primary">
                    {formatTimestamp(alert?.timestamp)}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {alert?.timeAgo}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity?.charAt(0)?.toUpperCase() + alert?.severity?.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Virus" size={16} className="text-error" />
                    <span className="text-sm font-body text-text-primary">{alert?.disease}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-body text-text-primary">{alert?.location}</div>
                  <div className="text-xs font-caption text-text-secondary">{alert?.district}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-lg font-heading font-semibold text-error">
                    {alert?.patientCount}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    +{alert?.newCases} new
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-body font-semibold text-text-primary">
                      {alert?.mlScore}%
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      alert?.mlScore >= 80 ? 'bg-error' : 
                      alert?.mlScore >= 60 ? 'bg-warning' : 'bg-success'
                    }`} />
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {alert?.confidence}% confidence
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center space-x-1 ${getStatusColor(alert?.status)}`}>
                    <Icon 
                      name={
                        alert?.status === 'resolved' ? 'CheckCircle' :
                        alert?.status === 'in-progress' ? 'Clock' :
                        alert?.status === 'escalated' ? 'AlertTriangle' : 'Circle'
                      } 
                      size={14} 
                    />
                    <span className="text-sm font-caption capitalize">{alert?.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction('acknowledge', alert?.id)}
                      iconName="Check"
                      className="text-success hover:bg-success/10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction('escalate', alert?.id)}
                      iconName="AlertTriangle"
                      className="text-warning hover:bg-warning/10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction('resolve', alert?.id)}
                      iconName="CheckCircle"
                      className="text-primary hover:bg-primary/10"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedAlerts?.map((alert) => (
          <div key={alert?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedAlerts?.includes(alert?.id)}
                  onChange={(e) => handleSelectAlert(alert?.id, e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity?.charAt(0)?.toUpperCase() + alert?.severity?.slice(1)}
                    </span>
                    <div className="text-lg font-heading font-semibold text-error">
                      {alert?.patientCount} cases
                    </div>
                  </div>
                  <div className="text-sm font-body text-text-primary mt-1">
                    {alert?.disease} in {alert?.location}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {formatTimestamp(alert?.timestamp)} • ML Score: {alert?.mlScore}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-1 ${getStatusColor(alert?.status)}`}>
                <Icon 
                  name={
                    alert?.status === 'resolved' ? 'CheckCircle' :
                    alert?.status === 'in-progress' ? 'Clock' :
                    alert?.status === 'escalated' ? 'AlertTriangle' : 'Circle'
                  } 
                  size={14} 
                />
                <span className="text-sm font-caption capitalize">{alert?.status}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAlertAction('acknowledge', alert?.id)}
                  iconName="Check"
                  className="text-success hover:bg-success/10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAlertAction('escalate', alert?.id)}
                  iconName="AlertTriangle"
                  className="text-warning hover:bg-warning/10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAlertAction('resolve', alert?.id)}
                  iconName="CheckCircle"
                  className="text-primary hover:bg-primary/10"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {alerts?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            No Active Alerts
          </h3>
          <p className="text-sm font-caption text-text-secondary">
            All outbreak alerts have been resolved. The system is monitoring for new threats.
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertQueueTable;