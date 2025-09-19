import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterventionTracker = ({ className = '' }) => {
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const interventions = [
    {
      id: 1,
      title: 'Guwahati Cholera Response',
      location: 'Guwahati Central',
      status: 'in_progress',
      priority: 'high',
      startDate: '2025-09-14',
      estimatedCompletion: '2025-09-18',
      progress: 65,
      team: 'Medical Response Team A',
      activities: [
        { task: 'Water source testing', status: 'completed', assignee: 'Dr. Sharma' },
        { task: 'Medical camp setup', status: 'in_progress', assignee: 'Nurse Devi' },
        { task: 'Community awareness', status: 'pending', assignee: 'ASHA Worker' },
        { task: 'Contact tracing', status: 'in_progress', assignee: 'Health Inspector' }
      ],
      resources: {
        medical_kits: 15,
        water_purification_tablets: 500,
        personnel: 8
      },
      impact: {
        cases_treated: 32,
        people_reached: 1200,
        water_sources_treated: 8
      }
    },
    {
      id: 2,
      title: 'Jorhat Water Quality Improvement',
      location: 'Jorhat North',
      status: 'planning',
      priority: 'medium',
      startDate: '2025-09-16',
      estimatedCompletion: '2025-09-22',
      progress: 20,
      team: 'Environmental Health Unit',
      activities: [
        { task: 'Site assessment', status: 'completed', assignee: 'Environmental Officer' },
        { task: 'Resource allocation', status: 'in_progress', assignee: 'Admin Team' },
        { task: 'Community notification', status: 'pending', assignee: 'Communication Team' },
        { task: 'Equipment deployment', status: 'pending', assignee: 'Technical Team' }
      ],
      resources: {
        water_testing_kits: 25,
        purification_systems: 3,
        personnel: 5
      },
      impact: {
        cases_prevented: 0,
        people_reached: 0,
        water_sources_treated: 0
      }
    },
    {
      id: 3,
      title: 'Silchar Preventive Measures',
      location: 'Silchar South',
      status: 'completed',
      priority: 'low',
      startDate: '2025-09-10',
      estimatedCompletion: '2025-09-13',
      progress: 100,
      team: 'Community Health Team',
      activities: [
        { task: 'Health education sessions', status: 'completed', assignee: 'Health Educator' },
        { task: 'Water quality monitoring', status: 'completed', assignee: 'Lab Technician' },
        { task: 'Distribution of hygiene kits', status: 'completed', assignee: 'ASHA Workers' },
        { task: 'Follow-up assessments', status: 'completed', assignee: 'Supervisor' }
      ],
      resources: {
        hygiene_kits: 200,
        educational_materials: 500,
        personnel: 6
      },
      impact: {
        cases_prevented: 15,
        people_reached: 800,
        water_sources_treated: 5
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'in_progress':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'planning':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'on_hold':
        return 'text-text-secondary bg-muted border-border';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getActivityStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in_progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in_progress':
        return 'text-warning';
      case 'pending':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Intervention Tracking</h3>
        </div>
        
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Intervention
        </Button>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-accent rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-success">1</p>
          <p className="text-xs text-text-secondary">Completed</p>
        </div>
        <div className="bg-accent rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-warning">1</p>
          <p className="text-xs text-text-secondary">In Progress</p>
        </div>
        <div className="bg-accent rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">1</p>
          <p className="text-xs text-text-secondary">Planning</p>
        </div>
        <div className="bg-accent rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-text-primary">2000+</p>
          <p className="text-xs text-text-secondary">People Reached</p>
        </div>
      </div>
      {/* Interventions List */}
      <div className="space-y-4">
        {interventions?.map((intervention) => (
          <div
            key={intervention?.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedIntervention?.id === intervention?.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedIntervention(selectedIntervention?.id === intervention?.id ? null : intervention)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-text-primary">{intervention?.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(intervention?.status)}`}>
                    {intervention?.status?.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(intervention?.priority)}`}>
                    {intervention?.priority} priority
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{intervention?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{intervention?.team}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{intervention?.startDate} - {intervention?.estimatedCompletion}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">Progress</span>
                    <span className="text-sm font-medium text-text-primary">{intervention?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${intervention?.progress}%` }}
                    />
                  </div>
                </div>
                
                {selectedIntervention?.id === intervention?.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    {/* Activities */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-text-primary mb-3">Activities</h5>
                      <div className="space-y-2">
                        {intervention?.activities?.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Icon 
                              name={getActivityStatusIcon(activity?.status)} 
                              size={16} 
                              className={getActivityStatusColor(activity?.status)}
                            />
                            <span className="text-sm text-text-primary flex-1">{activity?.task}</span>
                            <span className="text-xs text-text-secondary">{activity?.assignee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Resources & Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-2">Resources Deployed</h5>
                        <div className="space-y-1">
                          {Object.entries(intervention?.resources)?.map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-text-secondary capitalize">{key?.replace('_', ' ')}</span>
                              <span className="text-text-primary font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-2">Impact Metrics</h5>
                        <div className="space-y-1">
                          {Object.entries(intervention?.impact)?.map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-text-secondary capitalize">{key?.replace('_', ' ')}</span>
                              <span className="text-text-primary font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" iconName="Edit">
                        Update Status
                      </Button>
                      <Button variant="outline" size="sm" iconName="Users">
                        Assign Team
                      </Button>
                      <Button variant="outline" size="sm" iconName="FileText">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Icon 
                name={selectedIntervention?.id === intervention?.id ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary ml-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionTracker;