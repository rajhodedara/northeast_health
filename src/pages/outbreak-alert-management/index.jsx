import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AlertConfigurationPanel from './components/AlertConfigurationPanel';
import AlertQueueTable from './components/AlertQueueTable';
import InterventionTrackingPanel from './components/InterventionTrackingPanel';
import AlertFilters from './components/AlertFilters';
import HistoricalAnalysis from './components/HistoricalAnalysis';

const OutbreakAlertManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('alerts');
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  // Mock alert data
  const [alerts] = useState([
    {
      id: 'ALT-2025-001',
      timestamp: '2025-09-15T06:30:00Z',
      timeAgo: '1 hour ago',
      severity: 'critical',
      disease: 'Cholera',
      location: 'Fancy Bazar',
      district: 'Kamrup Metro',
      patientCount: 12,
      newCases: 5,
      mlScore: 92,
      confidence: 89,
      status: 'new'
    },
    {
      id: 'ALT-2025-002',
      timestamp: '2025-09-15T05:15:00Z',
      timeAgo: '2 hours ago',
      severity: 'high',
      disease: 'Typhoid',
      location: 'Silpukhuri',
      district: 'Kamrup Metro',
      patientCount: 8,
      newCases: 3,
      mlScore: 78,
      confidence: 85,
      status: 'acknowledged'
    },
    {
      id: 'ALT-2025-003',
      timestamp: '2025-09-15T04:45:00Z',
      timeAgo: '3 hours ago',
      severity: 'medium',
      disease: 'Hepatitis A',
      location: 'Dibrugarh Town',
      district: 'Dibrugarh',
      patientCount: 6,
      newCases: 2,
      mlScore: 65,
      confidence: 78,
      status: 'in-progress'
    },
    {
      id: 'ALT-2025-004',
      timestamp: '2025-09-14T22:30:00Z',
      timeAgo: '9 hours ago',
      severity: 'high',
      disease: 'Acute Diarrhea',
      location: 'Silchar Medical College',
      district: 'Cachar',
      patientCount: 15,
      newCases: 7,
      mlScore: 84,
      confidence: 91,
      status: 'escalated'
    },
    {
      id: 'ALT-2025-005',
      timestamp: '2025-09-14T18:15:00Z',
      timeAgo: '13 hours ago',
      severity: 'low',
      disease: 'Dysentery',
      location: 'Jorhat District Hospital',
      district: 'Jorhat',
      patientCount: 4,
      newCases: 1,
      mlScore: 45,
      confidence: 72,
      status: 'resolved'
    }
  ]);

  // Mock intervention data
  const [interventions] = useState([
    {
      id: 'INT-2025-001',
      title: 'Cholera Outbreak Response - Fancy Bazar',
      description: 'Immediate containment and treatment protocol for cholera outbreak in Fancy Bazar area',
      location: 'Fancy Bazar, Kamrup Metro',
      status: 'in-progress',
      priority: 'urgent',
      dueDate: '2025-09-16',
      assignedPersonnel: [
        { name: 'Dr. Rajesh Kumar', role: 'Medical Officer' },
        { name: 'Priya Sharma', role: 'ASHA Supervisor' },
        { name: 'Amit Das', role: 'Sanitation Inspector' }
      ],
      tasks: [
        { description: 'Deploy medical team to affected area', completed: true, assignee: 'Dr. Rajesh Kumar' },
        { description: 'Set up temporary treatment center', completed: true, assignee: 'Medical Team' },
        { description: 'Conduct water source testing', completed: false, assignee: 'Sanitation Team' },
        { description: 'Distribute ORS and medical supplies', completed: false, assignee: 'ASHA Workers' },
        { description: 'Community awareness campaign', completed: false, assignee: 'Health Education Team' }
      ],
      updates: [
        { message: 'Medical team deployed successfully', author: 'Dr. Rajesh Kumar', timestamp: '2025-09-15T07:00:00Z' },
        { message: 'Temporary treatment center operational', author: 'Medical Coordinator', timestamp: '2025-09-15T06:45:00Z' },
        { message: 'Initial patient screening completed', author: 'Nursing Staff', timestamp: '2025-09-15T06:30:00Z' }
      ]
    },
    {
      id: 'INT-2025-002',
      title: 'Typhoid Prevention - Silpukhuri',
      description: 'Preventive measures and contact tracing for typhoid cases in Silpukhuri area',
      location: 'Silpukhuri, Kamrup Metro',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-09-17',
      assignedPersonnel: [
        { name: 'Dr. Meera Devi', role: 'Public Health Officer' },
        { name: 'Ravi Borah', role: 'Field Coordinator' }
      ],
      tasks: [
        { description: 'Contact tracing of affected individuals', completed: false, assignee: 'Field Team' },
        { description: 'Water quality assessment', completed: false, assignee: 'Lab Technician' },
        { description: 'Vaccination drive planning', completed: false, assignee: 'Immunization Team' }
      ],
      updates: [
        { message: 'Intervention plan approved', author: 'District Health Officer', timestamp: '2025-09-15T05:30:00Z' }
      ]
    }
  ]);

  const alertCounts = {
    total: alerts?.length,
    new: alerts?.filter(a => a?.status === 'new')?.length,
    acknowledged: alerts?.filter(a => a?.status === 'acknowledged')?.length,
    inProgress: alerts?.filter(a => a?.status === 'in-progress')?.length,
    escalated: alerts?.filter(a => a?.status === 'escalated')?.length,
    resolved: alerts?.filter(a => a?.status === 'resolved')?.length
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('healthwatch-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('healthwatch-language', languageCode);
  };

  const handleAlertAction = (action, alertId) => {
    console.log(`Alert action: ${action} for alert ${alertId}`);
    // In a real app, this would update the alert status
  };

  const handleBulkAction = (action, alertIds) => {
    console.log(`Bulk action: ${action} for alerts`, alertIds);
    // In a real app, this would update multiple alert statuses
  };

  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // In a real app, this would filter the alerts
  };

  const handleConfigurationChange = (config) => {
    console.log('Configuration changed:', config);
    // In a real app, this would update alert thresholds
  };

  const handleUpdateIntervention = (interventionId) => {
    console.log('Update intervention:', interventionId);
    // In a real app, this would open intervention update modal
  };

  const tabs = [
    { id: 'alerts', label: 'Active Alerts', icon: 'AlertTriangle', count: alertCounts?.total },
    { id: 'interventions', label: 'Interventions', icon: 'Activity', count: interventions?.length },
    { id: 'analysis', label: 'Historical Analysis', icon: 'BarChart3' },
    { id: 'configuration', label: 'Configuration', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="official"
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        syncStatus="synced"
        isOffline={false}
      />
      <Sidebar
        userRole="official"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        syncStatus="synced"
        isOffline={false}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-4`}>
        <div className="px-6 pb-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Outbreak Alert Management
                </h1>
                <p className="text-base font-body text-text-secondary">
                  Monitor, configure, and respond to automated outbreak detection alerts
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm font-caption font-medium">System Active</span>
                </div>
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  onClick={() => window.location?.reload()}
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm font-caption text-text-secondary">Critical</span>
              </div>
              <div className="text-2xl font-heading font-bold text-error">
                {alerts?.filter(a => a?.severity === 'critical')?.length}
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-caption text-text-secondary">High</span>
              </div>
              <div className="text-2xl font-heading font-bold text-warning">
                {alerts?.filter(a => a?.severity === 'high')?.length}
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-caption text-text-secondary">Pending</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">
                {alerts?.filter(a => a?.status === 'new' || a?.status === 'acknowledged')?.length}
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-secondary" />
                <span className="text-sm font-caption text-text-secondary">Active</span>
              </div>
              <div className="text-2xl font-heading font-bold text-secondary">
                {interventions?.filter(i => i?.status === 'in-progress')?.length}
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-text-secondary" />
                <span className="text-sm font-caption text-text-secondary">Personnel</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">
                {interventions?.reduce((total, i) => total + i?.assignedPersonnel?.length, 0)}
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-caption text-text-secondary">Avg Response</span>
              </div>
              <div className="text-2xl font-heading font-bold text-success">2.8h</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                  {tab?.count !== undefined && (
                    <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'alerts' && (
              <>
                <AlertFilters
                  onFilterChange={handleFilterChange}
                  alertCounts={alertCounts}
                />
                <AlertQueueTable
                  alerts={alerts}
                  onAlertAction={handleAlertAction}
                  onBulkAction={handleBulkAction}
                />
              </>
            )}

            {activeTab === 'interventions' && (
              <InterventionTrackingPanel
                interventions={interventions}
                onUpdateIntervention={handleUpdateIntervention}
              />
            )}

            {activeTab === 'analysis' && (
              <HistoricalAnalysis />
            )}

            {activeTab === 'configuration' && (
              <AlertConfigurationPanel
                onConfigurationChange={handleConfigurationChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OutbreakAlertManagement;