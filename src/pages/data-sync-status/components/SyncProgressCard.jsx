import React from 'react';
import Icon from '../../../components/AppIcon';

const SyncProgressCard = ({ 
  title, 
  count, 
  icon, 
  color = 'primary', 
  progress = null,
  isLoading = false 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon 
            name={icon} 
            size={24} 
            className={isLoading ? 'animate-spin' : ''}
          />
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-text-primary">
            {count}
          </div>
          <div className="text-sm font-caption text-text-secondary">
            {title}
          </div>
        </div>
      </div>
      
      {progress !== null && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-body text-text-secondary">Progress</span>
            <span className="font-body font-medium text-text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                color === 'success' ? 'bg-success' :
                color === 'warning' ? 'bg-warning' :
                color === 'error' ? 'bg-error' : 'bg-primary'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncProgressCard;