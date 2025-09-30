import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    MessageSquare: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    Save: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className={children ? "mr-2" : ""} />}
      {children}
    </button>
  );
};

const Input = ({ label, type, value, placeholder, onChange, disabled, description, className = '' }) => (
    <div>
      {label && <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      />
      {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
    </div>
);

const Select = ({ label, description, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{label}</label>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

// --- Main Component ---

const AlertConfigurationPanel = ({ onConfigurationChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [configurations, setConfigurations] = useState({
    cholera: { threshold: 5, enabled: true },
    typhoid: { threshold: 3, enabled: true },
    hepatitis: { threshold: 2, enabled: true },
    diarrhea: { threshold: 10, enabled: true }
  });
  const [selectedNotifications, setSelectedNotifications] = useState(['sms', 'dashboard']);

  const diseaseOptions = [ { value: 'cholera', label: 'Cholera' }, { value: 'typhoid', label: 'Typhoid' }, { value: 'hepatitis', label: 'Hepatitis A/E' }, { value: 'diarrhea', label: 'Acute Diarrhea' } ];
  const regionOptions = [ { value: 'all', label: 'All Districts' }, { value: 'kamrup', label: 'Kamrup District' }, { value: 'guwahati', label: 'Guwahati Metro' }, { value: 'dibrugarh', label: 'Dibrugarh District' }, { value: 'silchar', label: 'Silchar District' } ];
  const notificationOptions = [ { value: 'sms', label: 'SMS Alerts' }, { value: 'email', label: 'Email Notifications' }, { value: 'dashboard', label: 'Dashboard Alerts' }, { value: 'mobile', label: 'Mobile Push' } ];

  const handleThresholdChange = (disease, value) => {
    const newConfig = { ...configurations, [disease]: { ...configurations[disease], threshold: parseInt(value) || 0 } };
    setConfigurations(newConfig);
    onConfigurationChange?.(newConfig);
  };

  const handleToggleDisease = (disease) => {
    const newConfig = { ...configurations, [disease]: { ...configurations[disease], enabled: !configurations[disease].enabled } };
    setConfigurations(newConfig);
    onConfigurationChange?.(newConfig);
  };

  const handleNotificationChange = (channel) => {
    setSelectedNotifications(prev =>
        prev.includes(channel)
            ? prev.filter(c => c !== channel)
            : [...prev, channel]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={18} className="text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Alert Configuration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage outbreak thresholds and notifications</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} iconName={isExpanded ? "ChevronUp" : "ChevronDown"}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Disease Alert Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {diseaseOptions.map((disease) => (
                <div key={disease.value} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-200">{disease.label}</label>
                    <button onClick={() => handleToggleDisease(disease.value)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${configurations[disease.value].enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${configurations[disease.value].enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
                    </button>
                  </div>
                  <Input type="number" placeholder="Cases" value={configurations[disease.value].threshold} onChange={(e) => handleThresholdChange(disease.value, e.target.value)} disabled={!configurations[disease.value].enabled} />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Alert at {configurations[disease.value].threshold} cases in 24h</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">Geographic Coverage</h4>
                <Select label="Monitor Regions" options={regionOptions} value="all" onChange={() => {}} description="Select regions to monitor"/>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">Notification Channels</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
                {notificationOptions.map((option) => (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={selectedNotifications.includes(option.value)}
                        onChange={() => handleNotificationChange(option.value)}
                    />
                ))}
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Choose how to receive alerts</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center space-x-2"><Icon name="MessageSquare" size={18} className="text-blue-500" /><span>SMS Alert System</span></h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="SMS Gateway" type="text" value="NIC-SMS-Gateway" disabled description="Govt. SMS service"/>
              <Input label="Max Urgent Sends" type="number" placeholder="5" description="Per hour limit" />
              <Input label="Escalation Delay" type="number" placeholder="30" description="Minutes to escalate" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"><Icon name="Clock" size={16} /><span>Last updated: 2 hours ago</span></div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Reset to Default</Button>
              <Button variant="default" size="sm" iconName="Save">Save Configuration</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertConfigurationPanel;

