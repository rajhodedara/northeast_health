import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Activity: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    Circle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>,
    Edit: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, iconPosition, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
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

const InterventionTracker = ({ className = '' }) => {
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const interventions = [
    { id: 1, title: 'Guwahati Cholera Response', location: 'Guwahati Central', status: 'in_progress', priority: 'high', startDate: '2025-09-14', estimatedCompletion: '2025-09-18', progress: 65, team: 'Medical Response Team A', activities: [ { task: 'Water source testing', status: 'completed', assignee: 'Dr. Sharma' }, { task: 'Medical camp setup', status: 'in_progress', assignee: 'Nurse Devi' }, { task: 'Community awareness', status: 'pending', assignee: 'ASHA Worker' }, { task: 'Contact tracing', status: 'in_progress', assignee: 'Health Inspector' } ], resources: { medical_kits: 15, water_purification_tablets: 500, personnel: 8 }, impact: { cases_treated: 32, people_reached: 1200, water_sources_treated: 8 } },
    { id: 2, title: 'Jorhat Water Quality Improvement', location: 'Jorhat North', status: 'planning', priority: 'medium', startDate: '2025-09-16', estimatedCompletion: '2025-09-22', progress: 20, team: 'Environmental Health Unit', activities: [ { task: 'Site assessment', status: 'completed', assignee: 'Environmental Officer' }, { task: 'Resource allocation', status: 'in_progress', assignee: 'Admin Team' }, { task: 'Community notification', status: 'pending', assignee: 'Communication Team' }, { task: 'Equipment deployment', status: 'pending', assignee: 'Technical Team' } ], resources: { water_testing_kits: 25, purification_systems: 3, personnel: 5 }, impact: { cases_prevented: 0, people_reached: 0, water_sources_treated: 0 } },
    { id: 3, title: 'Silchar Preventive Measures', location: 'Silchar South', status: 'completed', priority: 'low', startDate: '2025-09-10', estimatedCompletion: '2025-09-13', progress: 100, team: 'Community Health Team', activities: [ { task: 'Health education sessions', status: 'completed', assignee: 'Health Educator' }, { task: 'Water quality monitoring', status: 'completed', assignee: 'Lab Technician' }, { task: 'Distribution of hygiene kits', status: 'completed', assignee: 'ASHA Workers' }, { task: 'Follow-up assessments', status: 'completed', assignee: 'Supervisor' } ], resources: { hygiene_kits: 200, educational_materials: 500, personnel: 6 }, impact: { cases_prevented: 15, people_reached: 800, water_sources_treated: 5 } }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'in_progress': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'planning': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const getActivityStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in_progress': return 'Clock';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-yellow-500';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Intervention Tracking</h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          New Intervention
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-green-500">1</p><p className="text-xs text-gray-500 dark:text-gray-400">Completed</p></div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-yellow-500">1</p><p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p></div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-blue-500">1</p><p className="text-xs text-gray-500 dark:text-gray-400">Planning</p></div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-gray-800 dark:text-gray-100">2000+</p><p className="text-xs text-gray-500 dark:text-gray-400">People Reached</p></div>
      </div>
      <div className="space-y-4">
        {interventions.map((intervention) => (
          <div
            key={intervention.id}
            className={`border dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md dark:hover:bg-gray-900 ${ selectedIntervention?.id === intervention.id ? 'ring-2 ring-blue-500' : 'border-gray-200' }`}
            onClick={() => setSelectedIntervention(selectedIntervention?.id === intervention.id ? null : intervention)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">{intervention.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(intervention.status)}`}>{intervention.status.replace('_', ' ')}</span>
                  <span className={`text-xs font-medium capitalize ${getPriorityColor(intervention.priority)}`}>{intervention.priority} priority</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
                  <div className="flex items-center space-x-1"><Icon name="MapPin" size={14} /><span>{intervention.location}</span></div>
                  <div className="flex items-center space-x-1"><Icon name="Users" size={14} /><span>{intervention.team}</span></div>
                  <div className="flex items-center space-x-1"><Icon name="Calendar" size={14} /><span>{intervention.startDate} - {intervention.estimatedCompletion}</span></div>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-500 dark:text-gray-400">Progress</span><span className="text-sm font-medium text-gray-800 dark:text-gray-100">{intervention.progress}%</span></div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${intervention.progress}%` }} /></div>
                </div>
                {selectedIntervention?.id === intervention.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Activities</h5>
                      <div className="space-y-2">
                        {intervention.activities.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Icon name={getActivityStatusIcon(activity.status)} size={16} className={getActivityStatusColor(activity.status)} />
                            <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{activity.task}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.assignee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Resources Deployed</h5>
                        <div className="space-y-1">
                          {Object.entries(intervention.resources).map(([key, value]) => (<div key={key} className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400 capitalize">{key.replace('_', ' ')}</span><span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span></div>))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Impact Metrics</h5>
                        <div className="space-y-1">
                          {Object.entries(intervention.impact).map(([key, value]) => (<div key={key} className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400 capitalize">{key.replace('_', ' ')}</span><span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span></div>))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4 flex-wrap gap-2">
                      <Button variant="outline" size="sm" iconName="Edit" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Update Status</Button>
                      <Button variant="outline" size="sm" iconName="Users" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Assign Team</Button>
                      <Button variant="outline" size="sm" iconName="FileText" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Generate Report</Button>
                    </div>
                  </div>
                )}
              </div>
              <Icon name={selectedIntervention?.id === intervention.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-gray-400 ml-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionTracker;
