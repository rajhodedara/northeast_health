import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Activity: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    Flag: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Edit: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    Check: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  };
  const icon = iconName && <Icon name={iconName} size={16} className={children ? 'mr-2' : ''} />;
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {icon}
      {children}
    </button>
  );
};

// --- Main Component ---

const InterventionTrackingPanel = ({ interventions, onUpdateIntervention }) => {
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  // Use a fallback empty array to prevent errors if interventions is null/undefined
  const displayInterventions = interventions || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-500/10';
      case 'in-progress': return 'text-yellow-600 bg-yellow-500/10';
      case 'pending': return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
      case 'delayed': return 'text-red-600 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-500';
      case 'high': return 'text-yellow-500';
      case 'medium': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const getProgressPercentage = (intervention) => {
    if (!intervention?.tasks?.length) return 0;
    const completedTasks = intervention.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / intervention.tasks.length) * 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={18} className="text-blue-500 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Intervention Tracking
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monitor ongoing response activities and completion status
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          New Intervention
        </Button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2"><Icon name="Clock" size={16} className="text-yellow-500" /><span className="text-sm text-gray-500 dark:text-gray-400">In Progress</span></div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{displayInterventions.filter(i => i.status === 'in-progress').length}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2"><Icon name="CheckCircle" size={16} className="text-green-500" /><span className="text-sm text-gray-500 dark:text-gray-400">Completed</span></div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{displayInterventions.filter(i => i.status === 'completed').length}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2"><Icon name="AlertTriangle" size={16} className="text-red-500" /><span className="text-sm text-gray-500 dark:text-gray-400">Delayed</span></div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{displayInterventions.filter(i => i.status === 'delayed').length}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2"><Icon name="Users" size={16} className="text-blue-500" /><span className="text-sm text-gray-500 dark:text-gray-400">Personnel</span></div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{displayInterventions.reduce((total, i) => total + (i.assignedPersonnel?.length || 0), 0)}</div>
          </div>
        </div>

        <div className="space-y-4">
          {displayInterventions.map((intervention) => (
            <div
              key={intervention.id}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-200 hover:shadow-md dark:hover:bg-gray-900 ${
                selectedIntervention === intervention.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2 flex-wrap">
                    <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">{intervention.title}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention.status)}`}>{intervention.status?.charAt(0)?.toUpperCase() + intervention.status?.slice(1)}</span>
                    <span className={`inline-flex items-center space-x-1 text-xs font-medium ${getPriorityColor(intervention.priority)}`}><Icon name="Flag" size={12} /><span>{intervention.priority?.charAt(0)?.toUpperCase() + intervention.priority?.slice(1)}</span></span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{intervention.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                    <div className="flex items-center space-x-1"><Icon name="MapPin" size={14} /><span>{intervention.location}</span></div>
                    <div className="flex items-center space-x-1"><Icon name="Calendar" size={14} /><span>Due: {formatDate(intervention.dueDate)}</span></div>
                    <div className="flex items-center space-x-1"><Icon name="User" size={14} /><span>{intervention.assignedPersonnel?.length || 0} assigned</span></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIntervention(selectedIntervention === intervention.id ? null : intervention.id)}>
                    <Icon name={selectedIntervention === intervention.id ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateIntervention && onUpdateIntervention(intervention.id)}
                    iconName="Edit"
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Update
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-500 dark:text-gray-400">Progress</span><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{getProgressPercentage(intervention)}%</span></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 rounded-full h-2 transition-all duration-300" style={{ width: `${getProgressPercentage(intervention)}%` }} /></div>
              </div>

              {selectedIntervention === intervention.id && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Tasks ({(intervention.tasks?.filter(t => t.completed).length || 0)}/{(intervention.tasks?.length || 0)} completed)</h5>
                    <div className="space-y-2">
                      {intervention.tasks?.map((task, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>{task.completed && (<Icon name="Check" size={12} className="text-white" />)}</div>
                          <span className={`text-sm ${task.completed ? 'text-gray-500 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>{task.description}</span>
                          {task.assignee && (<span className="text-xs text-gray-400">({task.assignee})</span>)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Assigned Personnel</h5>
                    <div className="flex flex-wrap gap-2">
                      {intervention.assignedPersonnel?.map((person, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><span className="text-xs text-white">{person.name?.charAt(0)}</span></div>
                          <span className="text-sm text-gray-800 dark:text-gray-200">{person.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{person.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Recent Updates</h5>
                    <div className="space-y-2">
                      {intervention.updates?.slice(0, 3).map((update, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div className="flex-1"><p className="text-sm text-gray-700 dark:text-gray-300">{update.message}</p><p className="text-xs text-gray-500 dark:text-gray-400">{update.author} • {formatDate(update.timestamp)}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {displayInterventions.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No Active Interventions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Start tracking response activities by creating a new intervention.</p>
            <Button
              variant="outline"
              iconName="Plus"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Create First Intervention
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterventionTrackingPanel;

