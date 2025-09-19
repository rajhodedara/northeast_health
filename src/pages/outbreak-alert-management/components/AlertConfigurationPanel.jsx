import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AlertConfigurationPanel = ({ onConfigurationChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [configurations, setConfigurations] = useState({
    cholera: { threshold: 5, enabled: true },
    typhoid: { threshold: 3, enabled: true },
    hepatitis: { threshold: 2, enabled: true },
    diarrhea: { threshold: 10, enabled: true }
  });

  const diseaseOptions = [
    { value: 'cholera', label: 'Cholera' },
    { value: 'typhoid', label: 'Typhoid' },
    { value: 'hepatitis', label: 'Hepatitis A/E' },
    { value: 'diarrhea', label: 'Acute Diarrhea' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'kamrup', label: 'Kamrup District' },
    { value: 'guwahati', label: 'Guwahati Metro' },
    { value: 'dibrugarh', label: 'Dibrugarh District' },
    { value: 'silchar', label: 'Silchar District' }
  ];

  const notificationOptions = [
    { value: 'sms', label: 'SMS Alerts' },
    { value: 'email', label: 'Email Notifications' },
    { value: 'dashboard', label: 'Dashboard Alerts' },
    { value: 'mobile', label: 'Mobile Push' }
  ];

  const handleThresholdChange = (disease, value) => {
    setConfigurations(prev => ({
      ...prev,
      [disease]: { ...prev?.[disease], threshold: parseInt(value) || 0 }
    }));
    onConfigurationChange?.({ disease, threshold: value });
  };

  const handleToggleDisease = (disease) => {
    setConfigurations(prev => ({
      ...prev,
      [disease]: { ...prev?.[disease], enabled: !prev?.[disease]?.enabled }
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Alert Configuration
            </h3>
            <p className="text-sm font-caption text-text-secondary">
              Configure outbreak detection thresholds and notification settings
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Disease Thresholds */}
          <div>
            <h4 className="text-base font-heading font-medium text-text-primary mb-4">
              Disease Alert Thresholds
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {diseaseOptions?.map((disease) => (
                <div key={disease?.value} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-body font-medium text-text-primary">
                      {disease?.label}
                    </label>
                    <button
                      onClick={() => handleToggleDisease(disease?.value)}
                      className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                        configurations?.[disease?.value]?.enabled
                          ? 'bg-success' :'bg-muted'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          configurations?.[disease?.value]?.enabled
                            ? 'translate-x-5' :'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <Input
                    type="number"
                    placeholder="Cases threshold"
                    value={configurations?.[disease?.value]?.threshold || ''}
                    onChange={(e) => handleThresholdChange(disease?.value, e?.target?.value)}
                    disabled={!configurations?.[disease?.value]?.enabled}
                    className="text-sm"
                  />
                  <p className="text-xs font-caption text-text-secondary">
                    Alert when {configurations?.[disease?.value]?.threshold || 0} cases in 24h
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-base font-heading font-medium text-text-primary mb-3">
                Geographic Coverage
              </h4>
              <Select
                label="Monitor Regions"
                options={regionOptions}
                value="all"
                onChange={() => {}}
                description="Select regions to monitor for outbreaks"
              />
            </div>

            <div>
              <h4 className="text-base font-heading font-medium text-text-primary mb-3">
                Notification Channels
              </h4>
              <Select
                label="Alert Methods"
                options={notificationOptions}
                value="sms"
                onChange={() => {}}
                multiple
                description="Choose how to receive outbreak alerts"
              />
            </div>
          </div>

          {/* SMS Configuration */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-base font-heading font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="MessageSquare" size={18} className="text-primary" />
              <span>SMS Alert System</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="SMS Gateway"
                type="text"
                value="NIC-SMS-Gateway"
                disabled
                description="Government SMS service"
              />
              <Input
                label="Priority Contacts"
                type="number"
                placeholder="5"
                description="Max urgent notifications/hour"
              />
              <Input
                label="Escalation Delay"
                type="number"
                placeholder="30"
                description="Minutes before escalation"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm font-caption text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>Last updated: 2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                Reset to Default
              </Button>
              <Button variant="default" size="sm" iconName="Save">
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertConfigurationPanel;