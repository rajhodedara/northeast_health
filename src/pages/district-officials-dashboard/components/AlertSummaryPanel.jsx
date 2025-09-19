import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertSummaryPanel = ({ className = '' }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: 'outbreak',
      severity: 'high',
      title: 'Cholera Outbreak Alert',
      location: 'Guwahati Central',
      cases: 45,
      timestamp: '2 hours ago',
      status: 'active',
      description: 'Rapid increase in cholera cases detected in Guwahati Central area. Immediate intervention required.',
      actions: ['SMS sent to 150 residents', 'Medical team dispatched', 'Water testing initiated']
    },
    {
      id: 2,
      type: 'water_quality',
      severity: 'medium',
      title: 'Water Quality Degradation',
      location: 'Jorhat North',
      cases: 12,
      timestamp: '4 hours ago',
      status: 'investigating',
      description: 'Water quality parameters showing concerning trends. Monitoring situation closely.',
      actions: ['Water samples collected', 'Local authorities notified']
    },
    {
      id: 3,
      type: 'surveillance',
      severity: 'low',
      title: 'Increased Diarrhea Cases',
      location: 'Silchar South',
      cases: 8,
      timestamp: '6 hours ago',
      status: 'monitoring',
      description: 'Slight uptick in diarrhea cases. Within normal range but monitoring for trends.',
      actions: ['Routine monitoring active']
    }
  ];

  const smsStatus = {
    sent: 1247,
    delivered: 1198,
    failed: 49,
    pending: 23
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-error bg-error/10';
      case 'investigating':
        return 'text-warning bg-warning/10';
      case 'monitoring':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Alert Summary</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">Live Monitoring</span>
        </div>
      </div>
      {/* SMS Status Overview */}
      <div className="bg-accent rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">SMS Alert System Status</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{smsStatus?.sent}</p>
            <p className="text-xs text-text-secondary">Sent</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">{smsStatus?.delivered}</p>
            <p className="text-xs text-text-secondary">Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-error">{smsStatus?.failed}</p>
            <p className="text-xs text-text-secondary">Failed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning">{smsStatus?.pending}</p>
            <p className="text-xs text-text-secondary">Pending</p>
          </div>
        </div>
      </div>
      {/* Active Alerts */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Active Alerts</h4>
        
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAlert?.id === alert?.id ? 'ring-2 ring-primary' : ''
            } ${getSeverityColor(alert?.severity)}`}
            onClick={() => setSelectedAlert(selectedAlert?.id === alert?.id ? null : alert)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon 
                  name={getSeverityIcon(alert?.severity)} 
                  size={20} 
                  className={alert?.severity === 'high' ? 'text-error' : 
                           alert?.severity === 'medium' ? 'text-warning' : 'text-success'}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-text-primary truncate">{alert?.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(alert?.status)}`}>
                      {alert?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{alert?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{alert?.cases} cases</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{alert?.timestamp}</span>
                    </div>
                  </div>
                  
                  {selectedAlert?.id === alert?.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-text-primary mb-3">{alert?.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="text-xs font-medium text-text-secondary mb-2">Actions Taken:</h6>
                        <ul className="space-y-1">
                          {alert?.actions?.map((action, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-text-primary">
                              <Icon name="Check" size={14} className="text-success" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" iconName="MessageSquare">
                          Send SMS
                        </Button>
                        <Button variant="outline" size="sm" iconName="Users">
                          Deploy Team
                        </Button>
                        <Button variant="outline" size="sm" iconName="FileText">
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Icon 
                name={selectedAlert?.id === alert?.id ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary ml-2"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            New Alert
          </Button>
          <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
            Broadcast SMS
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertSummaryPanel;