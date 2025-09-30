import React, { useEffect } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Activity: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    Droplets: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.7-3.02C8.23 8.5 8 7.2 8 6c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.23 2.49-1.3 3.23-.98.63-1.7 1.86-1.7 3.02 0 2.23 1.8 4.05 4 4.05s4-1.82 4-4.05c0-1.16-.57-2.26-1.7-3.02C17.23 8.5 17 7.2 17 6c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.2.23 2.49 1.3 3.23.98.63 1.7 1.86 1.7 3.02 0 2.23-1.8 4.05-4 4.05Z"/></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Shield: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    Eye: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, iconPosition, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  };
  const icon = iconName && <Icon name={iconName} size={16} className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''} />;
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition !== 'left' && icon}
    </button>
  );
};


// --- Main Component ---
const MapPopup = ({ data, position, onClose, onAction = () => {} }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!data || !position) return null;

  const config = {
    health_incident: {
      icon: 'Activity',
      title: data.disease || 'Health Incident',
      status: data.severity,
      details: [ { label: 'Patients', value: data.patientCount }, { label: 'Reported', value: data.reportedDate } ],
      actions: [ { action: 'view_details', icon: 'Eye', label: 'View Details', variant: 'default' }, { action: 'create_alert', icon: 'AlertTriangle', label: 'Create Alert', variant: 'outline' } ]
    },
    water_test: {
      icon: 'Droplets',
      title: 'Water Quality Test',
      status: data.quality,
      details: [ { label: 'CFU Count', value: `${data.cfuCount} CFU` }, { label: 'Test Date', value: data.testDate } ],
      actions: [ { action: 'view_test_details', icon: 'FileText', label: 'Full Report', variant: 'default' }, { action: 'schedule_retest', icon: 'Calendar', label: 'Schedule Retest', variant: 'outline' } ]
    },
    outbreak: {
      icon: 'AlertTriangle',
      title: 'Outbreak Zone',
      status: data.status,
      details: [ { label: 'Affected', value: data.affectedPopulation }, { label: 'Start Date', value: data.startDate } ],
      actions: [ { action: 'manage_outbreak', icon: 'Shield', label: 'Manage', variant: 'default' }, { action: 'view_timeline', icon: 'Clock', label: 'Timeline', variant: 'outline' } ]
    }
  }[data.type] || {};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'critical': case 'unsafe': case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'high': case 'poor': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low': case 'safe': case 'controlled': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div
      className="absolute z-50 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 text-gray-800 dark:text-gray-200 animate-fade-in-up"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        marginTop: '-12px'
      }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><Icon name="X" size={16} /></button>

      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(config.status)}`}>
            <Icon name={config.icon || 'MapPin'} size={20} className="opacity-80" />
        </div>
        <div>
            <h3 className="font-semibold text-lg leading-tight">{config.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{data.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Status</p>
            <p className={`font-bold capitalize text-base ${getStatusColor(config.status).replace('bg-', 'text-').split(' ')[0]}`}>{config.status}</p>
          </div>
          {config.details?.map(detail => (
              <div key={detail.label}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">{detail.label}</p>
                  <p className="font-bold text-base">{detail.value}</p>
              </div>
          ))}
      </div>

      <div className="flex space-x-2 border-t border-gray-200 dark:border-gray-700 pt-3">
          {config.actions?.map(action => (
              <Button key={action.action} variant={action.variant} size="sm" onClick={() => onAction(action.action, data)} iconPosition="left" iconName={action.icon} className="flex-1">
                  {action.label}
              </Button>
          ))}
      </div>

      {/* Popup Arrow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700"></div>
        <div className="w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900 absolute -top-px left-1/2 transform -translate-x-1/2"></div>
      </div>
       <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, -90%); } to { opacity: 1; transform: translate(-50%, -100%); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

// --- Wrapper App for Demo ---
const App = () => {
    const mockData = {
        type: 'health_incident',
        disease: 'Cholera Outbreak',
        location: 'Guwahati Central',
        severity: 'Critical',
        patientCount: 45,
        reportedDate: '2025-09-15',
    };

    return (
        <div className="w-full h-screen bg-gray-500 p-10 flex items-center justify-center">
            <MapPopup
                data={mockData}
                position={{ x: '50%', y: '50%' }}
                onClose={() => console.log('Close clicked')}
                onAction={(action, data) => console.log(`Action: ${action}`, data)}
            />
        </div>
    );
};

export default App;

