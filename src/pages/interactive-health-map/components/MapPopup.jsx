import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapPopup = ({ data, position, onClose, onAction }) => {
  if (!data || !position) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'active':
        return 'text-red-600 bg-red-50';
      case 'controlled':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'health_incident':
        return 'Activity';
      case 'water_test':
        return 'Droplets';
      case 'outbreak':
        return 'AlertTriangle';
      case 'intervention':
        return 'Shield';
      default:
        return 'MapPin';
    }
  };

  const renderHealthIncident = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {data?.disease || 'Health Incident'}
          </h3>
          <p className="text-sm font-body text-text-secondary">
            {data?.location || 'Location not specified'}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(data?.severity)}`}>
          {data?.severity || 'Unknown'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">Patient Count</p>
          <p className="text-lg font-body font-semibold text-text-primary">
            {data?.patientCount || 0}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">Date Reported</p>
          <p className="text-sm font-body text-text-primary">
            {data?.reportedDate || 'Not specified'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-caption text-text-secondary">Symptoms</p>
        <div className="flex flex-wrap gap-1">
          {(data?.symptoms || ['Diarrhea', 'Fever', 'Vomiting'])?.map((symptom, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded"
            >
              {symptom}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('view_details', data)}
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('create_alert', data)}
          iconName="AlertTriangle"
          iconPosition="left"
        >
          Create Alert
        </Button>
      </div>
    </div>
  );

  const renderWaterTest = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Water Quality Test
          </h3>
          <p className="text-sm font-body text-text-secondary">
            {data?.location || 'Location not specified'}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(data?.quality)}`}>
          {data?.quality || 'Unknown'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">CFU Count</p>
          <p className="text-lg font-body font-semibold text-text-primary">
            {data?.cfuCount || 0}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">Test Date</p>
          <p className="text-sm font-body text-text-primary">
            {data?.testDate || 'Not specified'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-caption text-text-secondary">Test Parameters</p>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-body text-text-secondary">pH Level</span>
            <span className="text-sm font-body text-text-primary">{data?.ph || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-body text-text-secondary">Turbidity</span>
            <span className="text-sm font-body text-text-primary">{data?.turbidity || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-body text-text-secondary">Chlorine</span>
            <span className="text-sm font-body text-text-primary">{data?.chlorine || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('view_test_details', data)}
          iconName="FileText"
          iconPosition="left"
        >
          Full Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('schedule_retest', data)}
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule Retest
        </Button>
      </div>
    </div>
  );

  const renderOutbreak = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Outbreak Zone
          </h3>
          <p className="text-sm font-body text-text-secondary">
            {data?.location || 'Location not specified'}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(data?.status)}`}>
          {data?.status || 'Unknown'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">Affected Population</p>
          <p className="text-lg font-body font-semibold text-text-primary">
            {data?.affectedPopulation || 0}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-caption text-text-secondary">Outbreak Started</p>
          <p className="text-sm font-body text-text-primary">
            {data?.startDate || 'Not specified'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-caption text-text-secondary">Primary Disease</p>
        <p className="text-sm font-body text-text-primary">{data?.primaryDisease || 'Not specified'}</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-caption text-text-secondary">Intervention Status</p>
        <div className="flex items-center space-x-2">
          <Icon 
            name={data?.interventionActive ? "CheckCircle" : "Clock"} 
            size={16} 
            className={data?.interventionActive ? "text-green-600" : "text-yellow-600"} 
          />
          <span className="text-sm font-body text-text-primary">
            {data?.interventionActive ? 'Active Response' : 'Response Pending'}
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('manage_outbreak', data)}
          iconName="Settings"
          iconPosition="left"
        >
          Manage Response
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('view_timeline', data)}
          iconName="Clock"
          iconPosition="left"
        >
          View Timeline
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (data?.type) {
      case 'health_incident':
        return renderHealthIncident();
      case 'water_test':
        return renderWaterTest();
      case 'outbreak':
        return renderOutbreak();
      default:
        return renderHealthIncident();
    }
  };

  return (
    <div
      className="absolute z-1100 w-80 bg-surface border border-border rounded-lg shadow-modal p-4"
      style={{
        left: position?.x,
        top: position?.y,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getTypeIcon(data?.type)} size={20} className="text-primary" />
          <span className="text-xs font-caption text-text-secondary uppercase tracking-wide">
            {data?.type?.replace('_', ' ') || 'Data Point'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded-md transition-colors duration-150"
        >
          <Icon name="X" size={16} className="text-text-secondary" />
        </button>
      </div>
      {renderContent()}
      {/* Popup Arrow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
        <div className="w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-surface absolute -top-px left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default MapPopup;