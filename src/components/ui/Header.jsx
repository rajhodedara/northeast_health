import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon'; // Reverted to original relative path
import Button from './Button'; // Reverted to original relative path
import ThemeToggle from './ThemeToggle'; // Assuming ThemeToggle is in the same directory as Button/Icon or adjust path as needed

const Header = ({ userRole = 'asha', isOffline = false, syncStatus = 'synced', onLanguageChange, currentLanguage = 'en' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  ];

  // --- UPDATED NAVIGATION LINKS (to include the routes we fixed earlier) ---
  const ashaNavItems = [
    { path: '/data-entry/patient', label: 'Patient Data', icon: 'UserPlus' },
    { path: '/data-entry/water-test', label: 'Water Test', icon: 'Droplets' },
    { path: '/data-log', label: 'View Reports', icon: 'ListOrdered' },
    { path: '/data-sync-status', label: 'Sync Status', icon: 'RefreshCw' },
  ];

  const officialNavItems = [
    { path: '/district-officials-dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/interactive-health-map', label: 'Health Map', icon: 'Map' },
    { path: '/outbreak-alert-management', label: 'Alerts', icon: 'AlertTriangle' },
    { path: '/data-log', label: 'Data Log', icon: 'ListOrdered' },
    { path: '/data-sync-status', label: 'Sync Status', icon: 'RefreshCw' },
  ];
  // -------------------------------------------------------------

  const moreMenuItems = [
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
    { path: '/admin', label: 'Admin', icon: 'Shield' },
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
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      if (!event?.target?.closest('.more-menu')) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-1000 bg-surface border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Activity" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-text-primary">
                HealthWatch Northeast
              </h1>
              <p className="text-xs font-caption text-text-secondary">
                Public Health Surveillance
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-200"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </a>
            ))}

            {/* More Menu for Desktop */}
            <div className="relative more-menu">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                iconName="MoreHorizontal"
                className="ml-2 text-text-secondary"
              >
                More
              </Button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-1100 animate-fade-in">
                  {moreMenuItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-popover-foreground hover:bg-accent rounded-md transition-colors duration-150"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">

            {/* --- INTEGRATION POINT 1: DESKTOP THEME TOGGLE --- */}
            <div className="hidden sm:flex ">
              <ThemeToggle />
            </div>
            {/* ------------------------------------------------ */}

            {/* Network Status Indicator */}
            <div className="flex items-center space-x-2">
              {isOffline && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-md">
                  <Icon name="WifiOff" size={14} />
                  <span className="text-xs font-caption">Offline</span>
                </div>
              )}

              {/* Sync Status */}
              <div className={`flex items-center space-x-1 ${getSyncStatusColor()}`}>
                <Icon
                  name={getSyncStatusIcon()}
                  size={16}
                  className={syncStatus === 'syncing' ? 'animate-spin' : ''}
                />
                <span className="hidden sm:inline text-xs font-caption">
                  {syncStatus === 'synced' ? 'Synced' :
                    syncStatus === 'syncing' ? 'Syncing...' :
                      syncStatus === 'pending' ? 'Pending' : 'Error'}
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative language-dropdown">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                iconName="Globe"
                className="hidden sm:flex text-black dark:text-white"
              >
                {languages?.find(lang => lang?.code === currentLanguage)?.code?.toUpperCase()}
              </Button>


              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-1100 animate-fade-in">
                  {languages?.map((language) => (
                    <button
                      key={language?.code}
                      onClick={() => handleLanguageSelect(language?.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-body text-left hover:bg-accent rounded-md transition-colors duration-150 ${currentLanguage === language?.code ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'
                        }`}
                    >
                      <span>{language?.name}</span>
                      <span className="text-xs text-text-secondary">{language?.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              className="lg:hidden text-black dark:text-white"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface animate-slide-in">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-body font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </a>
              ))}

              {/* --- INTEGRATION POINT 2: MOBILE THEME TOGGLE --- */}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-caption text-text-secondary">Display Mode</span>
                  <ThemeToggle />
                </div>
              </div>
              {/* ------------------------------------------------ */}

              <div className="border-t border-border pt-2 mt-2">
                {moreMenuItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-body font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Language Selector */}
              <div className="border-t border-border pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-caption text-text-secondary">Language</div>
                {languages?.map((language) => (
                  <button
                    key={language?.code}
                    onClick={() => {
                      handleLanguageSelect(language?.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-3 text-base font-body text-left hover:bg-accent rounded-md transition-colors duration-200 ${currentLanguage === language?.code ? 'bg-accent text-accent-foreground' : 'text-text-secondary'
                      }`}
                  >
                    <span>{language?.name}</span>
                    <span className="text-sm text-text-secondary">{language?.nativeName}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Network Connectivity Banner */}
      {isOffline && (
        <div className="bg-warning text-warning-foreground px-4 py-2 text-center text-sm font-body">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="WifiOff" size={16} />
            <span>You're currently offline. Data will sync when connection is restored.</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => window.location?.reload()}
              className="ml-2 text-warning-foreground hover:bg-warning/20"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;