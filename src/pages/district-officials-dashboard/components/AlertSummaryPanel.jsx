import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Bell: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    Info: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    Check: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    MessageSquare: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Download: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, iconPosition, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
  };
  const icon = iconName && <Icon name={iconName} size={16} className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`} />;
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition !== 'left' && icon}
    </button>
  );
};

// --- Main Component ---

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
      case 'high': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-600 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-500/10';
      case 'investigating': return 'text-yellow-600 bg-yellow-500/10';
      case 'monitoring': return 'text-green-600 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Alert Summary</h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Live Monitoring</span>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">SMS Alert System Status</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center"><p className="text-lg font-bold text-blue-500">{smsStatus.sent}</p><p className="text-xs text-gray-500 dark:text-gray-400">Sent</p></div>
          <div className="text-center"><p className="text-lg font-bold text-green-500">{smsStatus.delivered}</p><p className="text-xs text-gray-500 dark:text-gray-400">Delivered</p></div>
          <div className="text-center"><p className="text-lg font-bold text-red-500">{smsStatus.failed}</p><p className="text-xs text-gray-500 dark:text-gray-400">Failed</p></div>
          <div className="text-center"><p className="text-lg font-bold text-yellow-500">{smsStatus.pending}</p><p className="text-xs text-gray-500 dark:text-gray-400">Pending</p></div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Active Alerts</h4>

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedAlert?.id === alert.id ? 'ring-2 ring-blue-500' : ''} ${getSeverityColor(alert.severity)}`}
            onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon name={getSeverityIcon(alert.severity)} size={20} className={alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1 flex-wrap"><h5 className="font-medium text-gray-800 dark:text-gray-200 truncate">{alert.title}</h5><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(alert.status)}`}>{alert.status}</span></div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap"><div className="flex items-center space-x-1"><Icon name="MapPin" size={14} /><span>{alert.location}</span></div><div className="flex items-center space-x-1"><Icon name="Users" size={14} /><span>{alert.cases} cases</span></div><div className="flex items-center space-x-1"><Icon name="Clock" size={14} /><span>{alert.timestamp}</span></div></div>

                  {selectedAlert?.id === alert.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{alert.description}</p>
                      <div className="mb-3">
                        <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Actions Taken:</h6>
                        <ul className="space-y-1">
                          {alert.actions.map((action, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"><Icon name="Check" size={14} className="text-green-500" /><span>{action}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex space-x-2 flex-wrap gap-2">
                        <Button variant="outline" size="sm" iconName="MessageSquare" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Send SMS</Button>
                        <Button variant="outline" size="sm" iconName="Users" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Deploy Team</Button>
                        <Button variant="outline" size="sm" iconName="FileText" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Generate Report</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Icon name={selectedAlert?.id === alert.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-gray-400 ml-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {/* --- FIX APPLIED HERE --- */}
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            New Alert
          </Button>
          <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            Broadcast SMS
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            Export Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertSummaryPanel;
