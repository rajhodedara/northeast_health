import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  description,
  onClick,
  className = '' 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'neutral':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
          </div>
          
          <div className="mb-2">
            <span className="text-2xl font-bold text-text-primary">{value}</span>
          </div>
          
          {change && (
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={14} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-text-secondary mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;