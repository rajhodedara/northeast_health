import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AnalyticsCard from './components/AnalyticsCard';
import DiseaseDistributionChart from './components/DiseaseDistributionChart';
import TrendAnalysisChart from './components/TrendAnalysisChart';
import InteractiveHeatMap from './components/InteractiveHeatMap';
import FilterControls from './components/FilterControls';
import AlertSummaryPanel from './components/AlertSummaryPanel';
import InterventionTracker from './components/InterventionTracker';
import ExportPanel from './components/ExportPanel';
import MLRiskScoring from './components/MLRiskScoring';
import Icon from '../../components/AppIcon';

const DistrictOfficialsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'last7days',
    district: 'all',
    diseaseType: 'all',
    riskLevel: 'all'
  });
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced');

  // Mock data for analytics cards
  const analyticsData = [
    {
      title: "Total Active Cases",
      value: "1,247",
      change: "+12.5%",
      changeType: "negative",
      icon: "Users",
      description: "Across all districts"
    },
    {
      title: "High Risk Areas",
      value: "8",
      change: "+2",
      changeType: "negative",
      icon: "AlertTriangle",
      description: "Requiring immediate attention"
    },
    {
      title: "Water Sources Tested",
      value: "156",
      change: "+23",
      changeType: "positive",
      icon: "Droplets",
      description: "This week"
    },
    {
      title: "Interventions Active",
      value: "12",
      change: "+3",
      changeType: "positive",
      icon: "Activity",
      description: "Response teams deployed"
    },
    {
      title: "SMS Alerts Sent",
      value: "3,456",
      change: "+156",
      changeType: "positive",
      icon: "MessageSquare",
      description: "Last 24 hours"
    },
    {
      title: "Recovery Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "7-day average"
    }
  ];

  // Mock data for disease distribution
  const diseaseDistributionData = [
    { name: 'Diarrhea', value: 456 },
    { name: 'Cholera', value: 234 },
    { name: 'Typhoid', value: 189 },
    { name: 'Hepatitis A', value: 156 },
    { name: 'Dysentery', value: 98 },
    { name: 'Other', value: 114 }
  ];

  // Mock data for trend analysis
  const trendAnalysisData = [
    { week: 'Week 1', diarrhea: 89, cholera: 45, typhoid: 32 },
    { week: 'Week 2', diarrhea: 102, cholera: 52, typhoid: 28 },
    { week: 'Week 3', diarrhea: 95, cholera: 48, typhoid: 35 },
    { week: 'Week 4', diarrhea: 118, cholera: 61, typhoid: 42 },
    { week: 'Week 5', diarrhea: 134, cholera: 67, typhoid: 38 },
    { week: 'Week 6', diarrhea: 125, cholera: 58, typhoid: 45 },
    { week: 'Week 7', diarrhea: 142, cholera: 73, typhoid: 51 }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('healthwatch_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate network status monitoring
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Simulate sync status updates
    const syncInterval = setInterval(() => {
      const statuses = ['synced', 'syncing', 'pending'];
      setSyncStatus(statuses?.[Math.floor(Math.random() * statuses?.length)]);
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('healthwatch_language', languageCode);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleAnalyticsCardClick = (title) => {
    // In a real application, this would navigate to detailed view
    console.log('Analytics card clicked:', title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="official"
        isOffline={isOffline}
        syncStatus={syncStatus}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      <div className="flex">
        <Sidebar
          userRole="official"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          syncStatus={syncStatus}
          isOffline={isOffline}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">District Officials Dashboard</h1>
                <p className="text-text-secondary">
                  Comprehensive health surveillance and outbreak monitoring for Northeast India
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Filter Controls */}
            <FilterControls onFiltersChange={handleFiltersChange} />

            {/* Analytics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsData?.map((card, index) => (
                <AnalyticsCard
                  key={index}
                  title={card?.title}
                  value={card?.value}
                  change={card?.change}
                  changeType={card?.changeType}
                  icon={card?.icon}
                  description={card?.description}
                  onClick={() => handleAnalyticsCardClick(card?.title)}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DiseaseDistributionChart data={diseaseDistributionData} />
              <TrendAnalysisChart data={trendAnalysisData} />
            </div>

            {/* Interactive Heat Map */}
            <InteractiveHeatMap />

            {/* Secondary Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlertSummaryPanel />
              <InterventionTracker />
            </div>

            {/* ML Risk Scoring */}
            <MLRiskScoring />

            {/* Export Panel */}
            <ExportPanel />

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center space-x-4">
                  <span>© {new Date()?.getFullYear()} HealthWatch Northeast</span>
                  <span>•</span>
                  <span>Ministry of Health & Family Welfare</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-error' : 'bg-success'}`} />
                    <span>{isOffline ? 'Offline' : 'Online'}</span>
                  </div>
                  <span>•</span>
                  <span>Data as of {new Date()?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistrictOfficialsDashboard;