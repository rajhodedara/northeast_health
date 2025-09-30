import React, { useState, useMemo } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Check: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    ArrowUpDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    Circle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>,
    ShieldAlert: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
    ShieldHalf: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 22V2"/></svg>,
    Shield: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '', title = '' }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', icon: 'p-2' };
  const variantClasses = {
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  return (
    <button title={title} onClick={onClick} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className={children ? "mr-2" : ""} />}
      {children}
    </button>
  );
};

const SeverityBadge = ({ severity }) => {
    const config = {
        critical: { icon: 'ShieldAlert', color: 'bg-red-500', label: 'Critical' },
        high: { icon: 'ShieldAlert', color: 'bg-yellow-500', label: 'High' },
        medium: { icon: 'ShieldHalf', color: 'bg-blue-500', label: 'Medium' },
        low: { icon: 'Shield', color: 'bg-gray-400', label: 'Low' },
    }[severity] || { icon: 'Shield', color: 'bg-gray-400', label: 'Low' };

    return (
        <div className="flex items-center space-x-2">
            <div className={`w-1.5 h-6 rounded-full ${config.color}`}></div>
            <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">{config.label}</span>
            </div>
        </div>
    );
};

const ScoreIndicator = ({ score }) => {
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 80 ? 'stroke-red-500' : score >= 60 ? 'stroke-yellow-500' : 'stroke-green-500';

    return (
        <div className="relative w-10 h-10">
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="4" fill="transparent" r="18" cx="20" cy="20" />
                <circle className={`transform -rotate-90 origin-center ${color}`} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r="18" cx="20" cy="20" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-200">{score}</span>
        </div>
    );
};

// --- Main Component ---

const AlertQueueTable = ({ alerts = [], onAlertAction = () => {}, onBulkAction = () => {} }) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-500';
      case 'in-progress': return 'text-yellow-500';
      case 'escalated': return 'text-red-500';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedAlerts(alerts.map(alert => alert.id));
    else setSelectedAlerts([]);
  };

  const handleSelectAlert = (e, alertId) => {
    if (e.target.checked) setSelectedAlerts(prev => [...prev, alertId]);
    else setSelectedAlerts(prev => prev.filter(id => id !== alertId));
  };

  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

  const sortedAlerts = useMemo(() => {
    return [...alerts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [alerts, sortConfig]);

  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={selectedAlerts.length === alerts.length && alerts.length > 0} onChange={handleSelectAll} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{selectedAlerts.length > 0 ? `${selectedAlerts.length} selected` : 'Select All'}</span>
          </div>
          {selectedAlerts.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onBulkAction('acknowledge', selectedAlerts)} iconName="Check">Acknowledge</Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('escalate', selectedAlerts)} iconName="AlertTriangle">Escalate</Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('resolve', selectedAlerts)} iconName="CheckCircle">Resolve</Button>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{alerts?.length || 0} active alerts</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="p-4 w-12"></th>
              <th className="px-4 py-3"><button onClick={() => handleSort('timestamp')} className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"><span>Alert Time</span><Icon name="ArrowUpDown" size={14}/></button></th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3"><button onClick={() => handleSort('patientCount')} className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"><span>Cases</span><Icon name="ArrowUpDown" size={14}/></button></th>
              <th className="px-4 py-3">ML Score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {sortedAlerts.map((alert) => (
              <tr key={alert.id} className={`transition-colors ${selectedAlerts.includes(alert.id) ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
                <td className="p-4"><input type="checkbox" checked={selectedAlerts.includes(alert.id)} onChange={(e) => handleSelectAlert(e, alert.id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /></td>
                <td className="px-4 py-3"><div className="font-medium text-gray-800 dark:text-gray-200">{formatTimestamp(alert.timestamp)}</div><div className="text-xs text-gray-500 dark:text-gray-400">{alert.timeAgo}</div></td>
                <td className="px-4 py-3"><SeverityBadge severity={alert.severity} /></td>
                <td className="px-4 py-3">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{alert.disease}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{alert.location}, {alert.district}</div>
                </td>
                <td className="px-4 py-3">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{alert.patientCount}</div>
                    <div className="text-xs text-green-500 font-medium">+{alert.newCases} new</div>
                </td>
                <td className="px-4 py-3"><ScoreIndicator score={alert.mlScore}/></td>
                <td className="px-4 py-3"><div className={`flex items-center space-x-1.5 font-medium ${getStatusColor(alert.status)}`}><Icon name={alert.status === 'resolved' ? 'CheckCircle' : alert.status === 'in-progress' ? 'Clock' : alert.status === 'escalated' ? 'AlertTriangle' : 'Circle'} size={14} /><span className="capitalize">{alert.status}</span></div></td>
                <td className="px-4 py-3"><div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => onAlertAction('acknowledge', alert.id)} title="Acknowledge"><Icon name="Check" className="text-green-500" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => onAlertAction('escalate', alert.id)} title="Escalate"><Icon name="AlertTriangle" className="text-yellow-500" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => onAlertAction('resolve', alert.id)} title="Resolve"><Icon name="CheckCircle" className="text-blue-500" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!alerts || alerts.length === 0) && (
        <div className="p-8 text-center"><Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">No Active Alerts</h3><p className="text-sm text-gray-500 dark:text-gray-400">All outbreak alerts have been resolved. The system is monitoring for new threats.</p></div>
      )}
    </div>
  );
};


// --- Wrapper App with Mock Data ---
const App = () => {
    const mockAlerts = [
        { id: 1, timestamp: '2025-09-15T14:30:00Z', timeAgo: '2 hours ago', severity: 'critical', disease: 'Cholera', location: 'Guwahati Central', district: 'Kamrup', patientCount: 45, newCases: 12, mlScore: 92, confidence: 95, status: 'escalated' },
        { id: 2, timestamp: '2025-09-15T12:15:00Z', timeAgo: '4 hours ago', severity: 'high', disease: 'Typhoid', location: 'Jorhat North', district: 'Jorhat', patientCount: 28, newCases: 5, mlScore: 81, confidence: 88, status: 'in-progress' },
        { id: 3, timestamp: '2025-09-15T10:00:00Z', timeAgo: '6 hours ago', severity: 'medium', disease: 'Diarrhea', location: 'Silchar South', district: 'Cachar', patientCount: 15, newCases: 3, mlScore: 65, confidence: 70, status: 'new' },
        { id: 4, timestamp: '2025-09-14T22:00:00Z', timeAgo: '1 day ago', severity: 'low', disease: 'Hepatitis A', location: 'Dibrugarh West', district: 'Dibrugarh', patientCount: 8, newCases: 1, mlScore: 45, confidence: 60, status: 'resolved' },
    ];
    const handleAlertAction = (action, alertId) => console.log(`Action: ${action} on alert ${alertId}`);
    const handleBulkAction = (action, alertIds) => console.log(`Bulk Action: ${action} on alerts ${alertIds.join(', ')}`);

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <AlertQueueTable alerts={mockAlerts} onAlertAction={handleAlertAction} onBulkAction={handleBulkAction} />
        </div>
    );
}

export default App;

