import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = ({ onPatientFormClick, onWaterTestClick, onViewDataClick, pendingCount }) => {
  const quickActions = [
    {
      id: 'patient-data',
      title: 'Patient Data',
      description: 'Record patient symptoms and health information',
      icon: 'FileText',
      color: 'bg-primary/10 text-primary border-primary/20',
      iconColor: 'text-primary',
      onClick: onPatientFormClick,
      badge: null
    },
    {
      id: 'water-test',
      title: 'Water Test',
      description: 'Record water quality test results',
      icon: 'Droplets',
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      iconColor: 'text-secondary',
      onClick: onWaterTestClick,
      badge: null
    },
    {
      id: 'view-data',
      title: 'View Submitted Data',
      description: 'Review previously submitted forms',
      icon: 'Database',
      color: 'bg-secondary/10 border-border text-primary',
      iconColor: 'text-accent-foreground text-primary',
      onClick: onViewDataClick,
      badge: pendingCount > 0 ? pendingCount : null
    },
    {
      id: 'sync-status',
      title: 'Sync Status',
      description: 'Check data synchronization status',
      icon: 'RefreshCw',
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      iconColor: 'text-secondary',
      onClick: () => window.location.href = '/data-sync-status',
      badge: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions?.map((action) => (
        <div
          key={action?.id}
          className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${action?.color}`}
          onClick={action?.onClick}
        >
          {/* Badge for pending items */}
          {action?.badge && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-xs font-bold">
              {action?.badge}
            </div>
          )}

          <div className="flex flex-col items-center text-center space-y-3">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
              <Icon
                name={action?.icon}
                size={32}
                className={action?.iconColor}
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-heading font-semibold">
              {action?.title}
            </h3>

            {/* Description */}
            <p className="text-sm font-caption opacity-80 leading-relaxed">
              {action?.description}
            </p>

            {/* Action Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 opacity-70 hover:opacity-100"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Open
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;