import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterventionTrackingPanel = ({ interventions, onUpdateIntervention }) => {
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-text-secondary bg-muted';
      case 'delayed':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getProgressPercentage = (intervention) => {
    const completedTasks = intervention?.tasks?.filter(task => task?.completed)?.length;
    return Math.round((completedTasks / intervention?.tasks?.length) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={18} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Intervention Tracking
            </h3>
            <p className="text-sm font-caption text-text-secondary">
              Monitor ongoing response activities and completion status
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
        >
          New Intervention
        </Button>
      </div>
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-caption text-text-secondary">In Progress</span>
            </div>
            <div className="text-2xl font-heading font-bold text-text-primary">
              {interventions?.filter(i => i?.status === 'in-progress')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-caption text-text-secondary">Completed</span>
            </div>
            <div className="text-2xl font-heading font-bold text-text-primary">
              {interventions?.filter(i => i?.status === 'completed')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-caption text-text-secondary">Delayed</span>
            </div>
            <div className="text-2xl font-heading font-bold text-text-primary">
              {interventions?.filter(i => i?.status === 'delayed')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-caption text-text-secondary">Personnel</span>
            </div>
            <div className="text-2xl font-heading font-bold text-text-primary">
              {interventions?.reduce((total, i) => total + i?.assignedPersonnel?.length, 0)}
            </div>
          </div>
        </div>

        {/* Interventions List */}
        <div className="space-y-4">
          {interventions?.map((intervention) => (
            <div
              key={intervention?.id}
              className={`border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                selectedIntervention === intervention?.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-base font-heading font-medium text-text-primary">
                      {intervention?.title}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(intervention?.status)}`}>
                      {intervention?.status?.charAt(0)?.toUpperCase() + intervention?.status?.slice(1)}
                    </span>
                    <span className={`inline-flex items-center space-x-1 text-xs font-caption font-medium ${getPriorityColor(intervention?.priority)}`}>
                      <Icon name="Flag" size={12} />
                      <span>{intervention?.priority?.charAt(0)?.toUpperCase() + intervention?.priority?.slice(1)}</span>
                    </span>
                  </div>
                  <p className="text-sm font-body text-text-secondary mb-3">
                    {intervention?.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm font-caption text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{intervention?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>Due: {formatDate(intervention?.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={14} />
                      <span>{intervention?.assignedPersonnel?.length} assigned</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIntervention(
                      selectedIntervention === intervention?.id ? null : intervention?.id
                    )}
                    iconName={selectedIntervention === intervention?.id ? "ChevronUp" : "ChevronDown"}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateIntervention(intervention?.id)}
                    iconName="Edit"
                  >
                    Update
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-caption text-text-secondary">Progress</span>
                  <span className="text-sm font-caption font-medium text-text-primary">
                    {getProgressPercentage(intervention)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${getProgressPercentage(intervention)}%` }}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedIntervention === intervention?.id && (
                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  {/* Tasks */}
                  <div>
                    <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
                      Tasks ({intervention?.tasks?.filter(t => t?.completed)?.length}/{intervention?.tasks?.length} completed)
                    </h5>
                    <div className="space-y-2">
                      {intervention?.tasks?.map((task, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            task?.completed 
                              ? 'bg-success border-success' :'border-border'
                          }`}>
                            {task?.completed && (
                              <Icon name="Check" size={12} className="text-white" />
                            )}
                          </div>
                          <span className={`text-sm font-body ${
                            task?.completed 
                              ? 'text-text-secondary line-through' :'text-text-primary'
                          }`}>
                            {task?.description}
                          </span>
                          {task?.assignee && (
                            <span className="text-xs font-caption text-text-secondary">
                              ({task?.assignee})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Personnel */}
                  <div>
                    <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
                      Assigned Personnel
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {intervention?.assignedPersonnel?.map((person, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-muted/50 rounded-full px-3 py-1">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs font-caption text-primary-foreground">
                              {person?.name?.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-body text-text-primary">{person?.name}</span>
                          <span className="text-xs font-caption text-text-secondary">
                            {person?.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div>
                    <h5 className="text-sm font-heading font-medium text-text-primary mb-3">
                      Recent Updates
                    </h5>
                    <div className="space-y-2">
                      {intervention?.updates?.slice(0, 3)?.map((update, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <div className="flex-1">
                            <p className="text-sm font-body text-text-primary">{update?.message}</p>
                            <p className="text-xs font-caption text-text-secondary">
                              {update?.author} • {formatDate(update?.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {interventions?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              No Active Interventions
            </h3>
            <p className="text-sm font-caption text-text-secondary mb-4">
              Start tracking response activities by creating a new intervention.
            </p>
            <Button variant="outline" iconName="Plus">
              Create First Intervention
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterventionTrackingPanel;