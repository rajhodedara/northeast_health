import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({
  userRole = 'official',
  isCollapsed = false,
  onToggleCollapse,
  syncStatus = 'synced',
  isOffline = false,
  className = ''
}) => {
  const [activeItem, setActiveItem] = useState('/district-officials-dashboard');

  const ashaNavItems = [
    {
      path: '/asha-data-collection',
      label: 'Data Collection',
      icon: 'FileText',
      description: 'Record patient data and water tests'
    },
    {
      path: '/data-sync-status',
      label: 'Sync Status',
      icon: 'RefreshCw',
      description: 'Monitor data upload progress'
    },
  ];

  const officialNavItems = [
    {
      path: '/district-officials-dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      description: 'Overview and analytics'
    },
    {
      path: '/interactive-health-map',
      label: 'Health Map',
      icon: 'Map',
      description: 'Geographic health data visualization'
    },
    {
      path: '/outbreak-alert-management',
      label: 'Alert Management',
      icon: 'AlertTriangle',
      description: 'Monitor and respond to outbreaks'
    },
    {
      path: '/data-sync-status',
      label: 'Data Sync',
      icon: 'Database',
      description: 'System-wide data synchronization'
    },
  ];

  const quickActions = [
    {
      action: 'new-report',
      label: 'New Report',
      icon: 'Plus',
      description: 'Create new health report'
    },
    {
      action: 'emergency-alert',
      label: 'Emergency Alert',
      icon: 'Siren',
      description: 'Send urgent health alert'
    },
  ];

  const navigationItems = userRole === 'asha' ? ashaNavItems : officialNavItems;

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-success';
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

  useEffect(() => {
    // Set active item based on current path
    const currentPath = window.location?.pathname;
    if (navigationItems?.some(item => item?.path === currentPath)) {
      setActiveItem(currentPath);
    }
  }, [navigationItems]);

  const handleNavigation = (path) => {
    setActiveItem(path);
    // In a real app, you would use React Router here
    window.location.href = path;
  };

  const handleQuickAction = (action) => {
    // Handle quick actions
    console.log('Quick action:', action);

    // Add proper functionality for different actions
    switch (action) {
      case 'new-report':
        // Navigate to ASHA data collection page for new report creation
        window.location.href = '/asha-data-collection';
        break;
      case 'emergency-alert':
        // Navigate to outbreak alert management for emergency alerts
        window.location.href = '/outbreak-alert-management';
        break;
      default:
        console.warn('Unknown quick action:', action);
        break;
    }
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border z-1000 transition-all duration-300 ease-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Activity" size={16} color="white" />
              </div>
              <div>
                <h2 className="text-sm font-heading font-semibold text-text-primary">
                  {userRole === 'asha' ? 'Field Worker' : 'District Official'}
                </h2>
                <p className="text-xs font-caption text-text-secondary">
                  {userRole === 'asha' ? 'Data Collection' : 'Analytics Dashboard'}
                </p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            className="shrink-0"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-all duration-200 group ${
                activeItem === item?.path
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }`}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`shrink-0 ${
                  activeItem === item?.path ? 'text-primary-foreground' : ''
                }`}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-body font-medium truncate">
                    {item?.label}
                  </div>
                  <div className={`text-xs font-caption truncate ${
                    activeItem === item?.path
                      ? 'text-primary-foreground/80'
                      : 'text-text-secondary group-hover:text-text-primary'
                  }`}>
                    {item?.description}
                  </div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && userRole === 'official' && (
          <div className="p-4 border-t border-border">
            <h3 className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action?.action)}
                  iconName={action?.icon}
                  iconPosition="left"
                className="
                  w-full justify-start
                  text-text-primary
                  hover:text-text-primary
                "


                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Status Footer */}
        <div className="p-4 border-t border-border">
          {/* Sync Status */}
          <div className={`flex items-center space-x-2 mb-3 ${getSyncStatusColor()}`}>
            <Icon
              name={getSyncStatusIcon()}
              size={16}
              className={syncStatus === 'syncing' ? 'animate-spin' : ''}
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-caption font-medium">
                  {syncStatus === 'synced' ? 'All Data Synced' :
                   syncStatus === 'syncing' ? 'Syncing Data...' :
                   syncStatus === 'pending' ? 'Sync Pending' : 'Sync Error'}
                </div>
                <div className="text-xs text-text-secondary">
                  Last sync: 2 min ago
                </div>
              </div>
            )}
          </div>

          {/* Network Status */}
          {isOffline && (
            <div className="flex items-center space-x-2 px-2 py-1 bg-warning/10 text-warning rounded-md">
              <Icon name="WifiOff" size={14} />
              {!isCollapsed && (
                <span className="text-xs font-caption">Offline Mode</span>
              )}
            </div>
          )}

          {/* User Info */}
          {!isCollapsed && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-body font-medium text-text-primary truncate">
                    {userRole === 'asha' ? 'ASHA Worker' : 'District Official'}
                  </div>
                  <div className="text-xs font-caption text-text-secondary truncate">
                    {userRole === 'asha' ? 'Field Operations' : 'Administrative'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;