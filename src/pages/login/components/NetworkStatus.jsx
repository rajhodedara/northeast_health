import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatus = ({ isOnline = true, className = '' }) => {
  const getStatusConfig = () => {
    if (isOnline) {
      return {
        icon: 'Wifi',
        text: 'Connected',
        bgColor: 'bg-success/10',
        textColor: 'text-success',
        iconColor: 'text-success'
      };
    } else {
      return {
        icon: 'WifiOff',
        text: 'Offline Mode Available',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        iconColor: 'text-warning'
      };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${config?.bgColor} ${className}`}>
      <Icon name={config?.icon} size={16} className={config?.iconColor} />
      <span className={`text-sm font-medium ${config?.textColor}`}>
        {config?.text}
      </span>
    </div>
  );
};

export default NetworkStatus;