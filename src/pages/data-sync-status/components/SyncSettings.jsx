import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SyncSettings = ({ 
  currentSettings = {}, 
  onUpdateSettings 
}) => {
  const [settings, setSettings] = useState({
    autoSync: currentSettings?.autoSync || true,
    syncFrequency: currentSettings?.syncFrequency || '15min',
    wifiOnly: currentSettings?.wifiOnly || false,
    backgroundSync: currentSettings?.backgroundSync || true,
    dataRetention: currentSettings?.dataRetention || '30days',
    compressData: currentSettings?.compressData || true,
    syncNotifications: currentSettings?.syncNotifications || true,
    lowBatteryMode: currentSettings?.lowBatteryMode || false,
    ...currentSettings
  });

  const [hasChanges, setHasChanges] = useState(false);

  const syncFrequencyOptions = [
    { value: '5min', label: '5 minutes', description: 'High frequency - uses more battery' },
    { value: '15min', label: '15 minutes', description: 'Recommended for most users' },
    { value: '30min', label: '30 minutes', description: 'Balanced performance' },
    { value: '1hour', label: '1 hour', description: 'Low frequency - saves battery' },
    { value: 'manual', label: 'Manual only', description: 'Sync only when triggered' }
  ];

  const dataRetentionOptions = [
    { value: '7days', label: '7 days', description: 'Minimal storage usage' },
    { value: '30days', label: '30 days', description: 'Recommended for field work' },
    { value: '90days', label: '90 days', description: 'Extended offline capability' },
    { value: 'unlimited', label: 'Unlimited', description: 'Keep all data locally' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    onUpdateSettings(settings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setSettings({
      autoSync: true,
      syncFrequency: '15min',
      wifiOnly: false,
      backgroundSync: true,
      dataRetention: '30days',
      compressData: true,
      syncNotifications: true,
      lowBatteryMode: false
    });
    setHasChanges(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Sync Settings
            </h3>
            <p className="text-sm font-body text-text-secondary">
              Configure synchronization behavior and offline capabilities
            </p>
          </div>
          {hasChanges && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetSettings}
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveSettings}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Auto Sync Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-body font-medium text-text-primary">
            Automatic Synchronization
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Enable automatic sync"
              description="Automatically sync data when connection is available"
              checked={settings?.autoSync}
              onChange={(e) => handleSettingChange('autoSync', e?.target?.checked)}
            />

            {settings?.autoSync && (
              <div className="ml-6 space-y-3">
                <div>
                  <label className="text-sm font-body font-medium text-text-primary mb-2 block">
                    Sync Frequency
                  </label>
                  <div className="space-y-2">
                    {syncFrequencyOptions?.map((option) => (
                      <label key={option?.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="syncFrequency"
                          value={option?.value}
                          checked={settings?.syncFrequency === option?.value}
                          onChange={(e) => handleSettingChange('syncFrequency', e?.target?.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <div>
                          <div className="text-sm font-body text-text-primary">
                            {option?.label}
                          </div>
                          <div className="text-xs font-caption text-text-secondary">
                            {option?.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <Checkbox
                  label="Background sync"
                  description="Continue syncing when app is in background"
                  checked={settings?.backgroundSync}
                  onChange={(e) => handleSettingChange('backgroundSync', e?.target?.checked)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Network Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-body font-medium text-text-primary">
            Network Preferences
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="WiFi only sync"
              description="Only sync when connected to WiFi to save mobile data"
              checked={settings?.wifiOnly}
              onChange={(e) => handleSettingChange('wifiOnly', e?.target?.checked)}
            />

            <Checkbox
              label="Compress data"
              description="Reduce data usage by compressing uploads"
              checked={settings?.compressData}
              onChange={(e) => handleSettingChange('compressData', e?.target?.checked)}
            />

            <Checkbox
              label="Low battery mode"
              description="Reduce sync frequency when battery is low"
              checked={settings?.lowBatteryMode}
              onChange={(e) => handleSettingChange('lowBatteryMode', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Data Retention */}
        <div className="space-y-4">
          <h4 className="text-sm font-body font-medium text-text-primary">
            Offline Data Management
          </h4>
          
          <div>
            <label className="text-sm font-body font-medium text-text-primary mb-2 block">
              Data Retention Period
            </label>
            <div className="space-y-2">
              {dataRetentionOptions?.map((option) => (
                <label key={option?.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dataRetention"
                    value={option?.value}
                    checked={settings?.dataRetention === option?.value}
                    onChange={(e) => handleSettingChange('dataRetention', e?.target?.value)}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="text-sm font-body text-text-primary">
                      {option?.label}
                    </div>
                    <div className="text-xs font-caption text-text-secondary">
                      {option?.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-body font-medium text-text-primary">
            Notifications
          </h4>
          
          <Checkbox
            label="Sync notifications"
            description="Show notifications for sync status and errors"
            checked={settings?.syncNotifications}
            onChange={(e) => handleSettingChange('syncNotifications', e?.target?.checked)}
          />
        </div>

        {/* Information Panel */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h5 className="text-sm font-body font-medium text-text-primary mb-2">
                Offline Capabilities
              </h5>
              <div className="text-xs font-caption text-text-secondary space-y-1">
                <p>• Data is automatically stored locally when offline</p>
                <p>• Forms can be completed without internet connection</p>
                <p>• Sync resumes automatically when connection is restored</p>
                <p>• All data is encrypted and secure during offline storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncSettings;