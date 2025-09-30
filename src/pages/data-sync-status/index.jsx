import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SyncProgressCard from './components/SyncProgressCard';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import DataQueueTable from './components/DataQueueTable';
import ErrorResolutionPanel from './components/ErrorResolutionPanel';
import StorageMetrics from './components/StorageMetrics';
import SyncHistoryLog from './components/SyncHistoryLog';
import SyncSettings from './components/SyncSettings';
import ThemeToggle from 'components/ui/ThemeToggle';

const DataSyncStatus = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for sync status
  const [syncData] = useState({
    pending: 12,
    syncing: 3,
    completed: 847,
    failed: 5,
    syncProgress: 78
  });

  // Mock queue data
  const [queueData] = useState([
    {
      id: 1,
      dataType: "patient_data",
      description: "Patient consultation - Rajesh Kumar",
      timestamp: "2025-01-15T07:30:00Z",
      status: "pending",
      attempts: 0,
      maxAttempts: 3,
      size: "2.4 KB"
    },
    {
      id: 2,
      dataType: "water_test",
      description: "Water quality test - Guwahati Ward 5",
      timestamp: "2025-01-15T06:45:00Z",
      status: "syncing",
      attempts: 1,
      maxAttempts: 3,
      size: "1.8 KB"
    },
    {
      id: 3,
      dataType: "form_submission",
      description: "Health survey form - Village Majuli",
      timestamp: "2025-01-15T05:20:00Z",
      status: "failed",
      attempts: 3,
      maxAttempts: 3,
      size: "3.2 KB"
    },
    {
      id: 4,
      dataType: "image_upload",
      description: "Patient symptoms photo",
      timestamp: "2025-01-15T04:15:00Z",
      status: "pending",
      attempts: 0,
      maxAttempts: 3,
      size: "156 KB"
    }
  ]);

  // Mock error data
  const [errorItems] = useState([
    {
      id: 1,
      title: "Network Connection Failed",
      description: "Unable to connect to sync server",
      errorType: "network",
      severity: "high",
      timestamp: "2025-01-15T07:15:00Z",
      attempts: 3,
      dataType: "patient_data",
      errorMessage: "ERR_NETWORK_TIMEOUT: Connection timed out after 30 seconds"
    },
    {
      id: 2,
      title: "Data Validation Error",
      description: "Required fields missing in form submission",
      errorType: "validation",
      severity: "medium",
      timestamp: "2025-01-15T06:30:00Z",
      attempts: 2,
      dataType: "form_submission",
      errorMessage: "VALIDATION_ERROR: Missing required field 'patient_age'"
    }
  ]);

  // Mock sync history
  const [historyData] = useState([
    {
      id: 1,
      operation: "Automatic Sync",
      status: "success",
      timestamp: "2025-01-15T07:00:00Z",
      duration: "2m 34s",
      itemsProcessed: 15,
      summary: "Successfully synced all pending patient data and water test results",
      dataTransferred: "45.2 KB",
      successRate: 100,
      networkSpeed: "2.1 Mbps",
      errors: []
    },
    {
      id: 2,
      operation: "Manual Sync",
      status: "partial",
      timestamp: "2025-01-15T05:30:00Z",
      duration: "4m 12s",
      itemsProcessed: 8,
      summary: "Partial sync completed - 2 items failed due to network issues",
      dataTransferred: "28.7 KB",
      successRate: 75,
      networkSpeed: "1.8 Mbps",
      errors: ["Network timeout on image upload", "Server temporarily unavailable"]
    },
    {
      id: 3,
      operation: "Background Sync",
      status: "failed",
      timestamp: "2025-01-15T03:15:00Z",
      duration: "1m 45s",
      itemsProcessed: 0,
      summary: "Sync failed - no network connection available",
      dataTransferred: "0 KB",
      successRate: 0,
      networkSpeed: "0 Mbps",
      errors: ["No network connection", "Unable to reach sync server"]
    }
  ]);

  // Mock storage data
  const [storageData] = useState({
    totalStorage: 1024 * 1024 * 100, // 100MB
    usedStorage: 1024 * 1024 * 45,   // 45MB
    offlineDataSize: 1024 * 1024 * 12 // 12MB
  });

  // Mock settings
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncFrequency: '15min',
    wifiOnly: false,
    backgroundSync: true,
    dataRetention: '30days',
    compressData: true,
    syncNotifications: true,
    lowBatteryMode: false
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'queue', label: 'Data Queue', icon: 'Database' },
    { id: 'errors', label: 'Errors', icon: 'AlertTriangle' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('healthwatch_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 3000);
  };

  const handleRetryConnection = () => {
    // Simulate connection retry
    console.log('Retrying connection...');
  };

  const handleRetryItem = (itemId) => {
    console.log('Retrying item:', itemId);
  };

  const handleDeleteItem = (itemId) => {
    console.log('Deleting item:', itemId);
  };

  const handleResolveError = (errorId) => {
    console.log('Resolving error:', errorId);
  };

  const handleCleanupData = () => {
    console.log('Cleaning up data...');
  };

  const handleUpdateSettings = (newSettings) => {
    setSyncSettings(newSettings);
    localStorage.setItem('healthwatch_sync_settings', JSON.stringify(newSettings));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Sync Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SyncProgressCard
                title="Pending Upload"
                count={syncData?.pending}
                icon="Upload"
                color="warning"
              />
              <SyncProgressCard
                title="Currently Syncing"
                count={syncData?.syncing}
                icon="RefreshCw"
                color="primary"
                progress={syncData?.syncProgress}
                isLoading={isSyncing}
              />
              <SyncProgressCard
                title="Successfully Synced"
                count={syncData?.completed}
                icon="CheckCircle"
                color="success"
              />
              <SyncProgressCard
                title="Failed Items"
                count={syncData?.failed}
                icon="XCircle"
                color="error"
              />
            </div>
            {/* Network Status and Manual Sync */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NetworkStatusIndicator
                isOnline={isOnline}
                signalStrength="moderate"
                lastSyncTime="2 minutes ago"
                onRetryConnection={handleRetryConnection}
              />

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      Manual Sync Control
                    </h3>
                    <p className="text-sm font-body text-text-secondary">
                      Force synchronization of pending data
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleManualSync}
                    loading={isSyncing}
                    iconName="RefreshCw"
                    iconPosition="left"
                    className="w-full"
                    disabled={!isOnline}
                  >
                    {isSyncing ? 'Syncing...' : 'Start Manual Sync'}
                  </Button>

                  {!isOnline && (
                    <div className="text-center text-sm font-body text-text-secondary">
                      Manual sync requires internet connection
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Storage Metrics */}
            <StorageMetrics
              totalStorage={storageData?.totalStorage}
              usedStorage={storageData?.usedStorage}
              offlineDataSize={storageData?.offlineDataSize}
              onCleanupData={handleCleanupData}
            />
          </div>
        );

      case 'queue':
        return (
          <DataQueueTable
            queueData={queueData}
            onRetryItem={handleRetryItem}
            onDeleteItem={handleDeleteItem}
          />
        );

      case 'errors':
        return (
          <ErrorResolutionPanel
            errorItems={errorItems}
            onRetryItem={handleRetryItem}
            onResolveError={handleResolveError}
          />
        );

      case 'history':
        return (
          <SyncHistoryLog historyData={historyData} />
        );

      case 'settings':
        return (
          <SyncSettings
            currentSettings={syncSettings}
            onUpdateSettings={handleUpdateSettings}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary rounded-lg">
                <Icon name="Database" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-text-primary">
                  Data Sync Status
                </h1>
                <p className="text-sm font-body text-text-secondary">
                  Monitor offline data synchronization and resolve connectivity issues
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Connection Status Badge */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-caption ${isOnline
                  ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                <Icon
                  name={isOnline ? "Wifi" : "WifiOff"}
                  size={16}
                />
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>

              <ThemeToggle />

              {/* Last Sync Time */}
              <div className="text-sm font-body text-text-secondary">
                Last sync: 2 min ago
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm whitespace-nowrap transition-colors duration-200 ${activeTab === tab?.id
                    ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
                {tab?.id === 'errors' && errorItems?.length > 0 && (
                  <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                    {errorItems?.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default DataSyncStatus;