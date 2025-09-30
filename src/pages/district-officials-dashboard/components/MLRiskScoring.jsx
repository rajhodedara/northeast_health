import React, { useState } from 'react';

// --- Helper Components (Placeholders to resolve errors) ---

const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Brain: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2h1Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 18 19.5v-15A2.5 2.5 0 0 0 15.5 2h-1Z"></path></svg>,
    ArrowRight: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    MessageSquare: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Info: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    Lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '', disabled = false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};

// --- Main Component ---

const MLRiskScoring = ({ className = '' }) => {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const riskAlerts = [
    {
      id: 1,
      location: 'Guwahati Central',
      riskScore: 87,
      severity: 'critical',
      confidence: 94,
      predictedOutbreak: 'Cholera',
      timeframe: '2-3 days',
      factors: [
        { factor: 'Water contamination levels', weight: 35, status: 'high' },
        { factor: 'Population density', weight: 25, status: 'high' },
        { factor: 'Recent case patterns', weight: 20, status: 'increasing' },
        { factor: 'Seasonal trends', weight: 15, status: 'peak_season' },
        { factor: 'Infrastructure quality', weight: 5, status: 'poor' }
      ],
      recommendations: [
        'Immediate water source testing and treatment',
        'Deploy medical response team within 24 hours',
        'Initiate community alert system',
        'Increase surveillance in surrounding areas'
      ],
      historicalAccuracy: 89
    },
    {
      id: 2,
      location: 'Jorhat North',
      riskScore: 64,
      severity: 'high',
      confidence: 78,
      predictedOutbreak: 'Diarrheal diseases',
      timeframe: '5-7 days',
      factors: [
        { factor: 'Water quality degradation', weight: 30, status: 'moderate' },
        { factor: 'Monsoon impact', weight: 25, status: 'high' },
        { factor: 'Sanitation conditions', weight: 20, status: 'poor' },
        { factor: 'Healthcare accessibility', weight: 15, status: 'limited' },
        { factor: 'Community awareness', weight: 10, status: 'low' }
      ],
      recommendations: [
        'Enhance water quality monitoring',
        'Conduct preventive health education',
        'Improve sanitation infrastructure',
        'Prepare medical supplies and personnel'
      ],
      historicalAccuracy: 82
    },
    {
      id: 3,
      location: 'Dibrugarh East',
      riskScore: 42,
      severity: 'medium',
      confidence: 71,
      predictedOutbreak: 'Typhoid',
      timeframe: '10-14 days',
      factors: [
        { factor: 'Food safety concerns', weight: 30, status: 'moderate' },
        { factor: 'Water source proximity', weight: 25, status: 'adequate' },
        { factor: 'Vaccination coverage', weight: 20, status: 'moderate' },
        { factor: 'Economic conditions', weight: 15, status: 'stable' },
        { factor: 'Climate conditions', weight: 10, status: 'favorable' }
      ],
      recommendations: [
        'Monitor food safety practices',
        'Continue routine surveillance',
        'Maintain vaccination programs',
        'Regular community health checks'
      ],
      historicalAccuracy: 76
    }
  ];

  const handleSelectRisk = (alert) => {
    if (selectedRisk?.id === alert.id) {
      setSelectedRisk(null);
    } else {
      setSelectedRisk(alert);
      setExplanation('');
      setIsExplaining(false);
    }
  };

  const handleExplainAlert = (e) => {
    e.stopPropagation(); // Prevents the main div's onClick from firing
    if (!selectedRisk) return;

    setIsExplaining(true);
    setExplanation('');

    setTimeout(() => {
        const estimatedCases = Math.floor(selectedRisk.riskScore / 5) + 3;
        const summary = `**Alert Summary for ${selectedRisk.location}:**\n\nA ${selectedRisk.severity}-risk situation has been identified for a potential ${selectedRisk.predictedOutbreak} outbreak. We are tracking approximately ${estimatedCases} potential cases. The primary contributing factors are high levels of ${selectedRisk.factors[0].factor.toLowerCase()} and increased ${selectedRisk.factors[1].factor.toLowerCase()}. Immediate preventative measures are advised.`;
        setExplanation(summary);
        setIsExplaining(false);
    }, 1500); // Simulate a 1.5 second loading time
  };

  const showConfirmationModal = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'medium': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-blue-500';
    return 'text-green-500';
  };

  const getFactorStatusColor = (status) => {
    switch (status) {
      case 'high': case'increasing': case'poor': case'peak_season': return 'text-red-400';
      case 'moderate': case'limited': case'low': return 'text-yellow-400';
      case 'adequate': case'stable': case'favorable': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 90) return { level: 'Very High', color: 'text-green-500' };
    if (confidence >= 80) return { level: 'High', color: 'text-blue-500' };
    if (confidence >= 70) return { level: 'Moderate', color: 'text-yellow-500' };
    return { level: 'Low', color: 'text-red-500' };
  };

  return (
    <>
      <style>{`
        @keyframes progress-bar-animation {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar-animation 1.5s linear forwards;
        }
      `}</style>
      <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">ML Risk Scoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500 dark:text-gray-400">AI Model Active</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center"><p className="text-lg font-bold text-blue-500">94%</p><p className="text-xs text-gray-500 dark:text-gray-400">Model Accuracy</p></div>
            <div className="text-center"><p className="text-lg font-bold text-green-500">156</p><p className="text-xs text-gray-500 dark:text-gray-400">Predictions Made</p></div>
            <div className="text-center"><p className="text-lg font-bold text-yellow-500">3</p><p className="text-xs text-gray-500 dark:text-gray-400">Active Alerts</p></div>
            <div className="text-center"><p className="text-lg font-bold text-gray-800 dark:text-gray-200">2.3h</p><p className="text-xs text-gray-500 dark:text-gray-400">Avg Response Time</p></div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Generated Risk Alerts</h4>
          {riskAlerts?.map((alert) => {
            const confidenceInfo = getConfidenceLevel(alert?.confidence);
            return (
              <div key={alert?.id} className={`border dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md dark:hover:bg-gray-900 ${selectedRisk?.id === alert?.id ? 'ring-2 ring-blue-500' : 'border-gray-200'}`} onClick={() => handleSelectRisk(alert)} >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2 flex-wrap">
                      <h5 className="font-medium text-gray-800 dark:text-gray-100">{alert?.location}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert?.severity)}`}>{alert?.severity}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{confidenceInfo?.level} Confidence</span>
                    </div>
                    <div className="flex items-center space-x-6 mb-3 flex-wrap">
                      <div className="flex items-center space-x-2"><span className="text-sm text-gray-500 dark:text-gray-400">Risk Score:</span><span className={`text-lg font-bold ${getRiskScoreColor(alert?.riskScore)}`}>{alert?.riskScore}/100</span></div>
                      <div className="flex items-center space-x-2"><span className="text-sm text-gray-500 dark:text-gray-400">Predicted:</span><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{alert?.predictedOutbreak}</span></div>
                      <div className="flex items-center space-x-2"><span className="text-sm text-gray-500 dark:text-gray-400">Timeframe:</span><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{alert?.timeframe}</span></div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1"><span className="text-xs text-gray-500 dark:text-gray-400">Risk Level</span><span className={`text-xs font-medium ${confidenceInfo?.color}`}>{alert?.confidence}% confidence</span></div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className={`h-2 rounded-full transition-all duration-300 ${alert?.riskScore >= 80 ? 'bg-red-500' : alert?.riskScore >= 60 ? 'bg-yellow-500' : alert?.riskScore >= 40 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: `${alert?.riskScore}%` }} /></div>
                    </div>
                    {selectedRisk?.id === alert?.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Contributing Factors</h6>
                            <div className="space-y-2">
                              {alert?.factors?.map((factor, index) => (
                                <div key={index} className="flex items-center justify-between text-sm"><div className="flex items-center space-x-2 flex-1"><span className="text-gray-700 dark:text-gray-300">{factor?.factor}</span><span className={`text-xs capitalize ${getFactorStatusColor(factor?.status)}`}>({factor?.status?.replace('_', ' ')})</span></div><div className="flex items-center space-x-2"><span className="text-xs text-gray-500 dark:text-gray-400">{factor?.weight}%</span><div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${factor?.weight * 2}%` }} /></div></div></div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">AI Recommendations</h6>
                            <ul className="space-y-2">
                              {alert?.recommendations?.map((rec, index) => (<li key={index} className="flex items-start space-x-2"><Icon name="ArrowRight" size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span></li>))}
                            </ul>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 my-4"><div className="flex items-center justify-between"><span className="text-sm text-gray-500 dark:text-gray-400">Historical Accuracy for this area:</span><span className="text-sm font-medium text-green-500">{alert?.historicalAccuracy}%</span></div></div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">✨ AI Action Center</h6>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="secondary" size="sm" iconName="Lightbulb" onClick={handleExplainAlert} disabled={isExplaining}>
                                {isExplaining ? 'Generating...' : 'Explain This Alert'}
                              </Button>
                            </div>

                            {isExplaining && (
                                <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <div className="bg-blue-600 h-2 rounded-full animate-progress-bar"></div>
                                </div>
                            )}

                            {explanation && !isExplaining && (
                              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-fade-in">
                                  <h3 className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 mb-2 flex items-center"><Icon name="Lightbulb" size={14} className="mr-2" /> AI Explanation</h3>
                                  <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-wrap">{explanation}</p>
                              </div>
                            )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                          <Button variant="default" size="sm" iconName="AlertTriangle" onClick={(e) => { e.stopPropagation(); showConfirmationModal('Alert Creation', `A new high-priority alert for ${selectedRisk.location} has been created and logged.`); }}>Create Alert</Button>
                          <Button variant="outline" size="sm" iconName="Users" onClick={(e) => { e.stopPropagation(); showConfirmationModal('Team Deployed', `A rapid response team has been dispatched to ${selectedRisk.location}. They will arrive within 12 hours.`); }}>Deploy Team</Button>
                          <Button variant="outline" size="sm" iconName="MessageSquare" onClick={(e) => { e.stopPropagation(); showConfirmationModal('Notification Sent', `A public health notification has been broadcast to all registered officials and residents in the ${selectedRisk.location} area.`); }}>Send Notification</Button>
                          <Button variant="outline" size="sm" iconName="TrendingUp" onClick={(e) => e.stopPropagation()}>View Trends</Button>
                        </div>

                      </div>
                    )}
                  </div>
                  <Icon name={selectedRisk?.id === alert?.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Model last updated: 6 hours ago • Next update: 2 hours</span>
            </div>
            <Button variant="outline" size="sm" iconName="Settings">Model Settings</Button>
          </div>
        </div>

        {/* Modal Component */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in-fast" onClick={() => setShowModal(false)}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm m-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{modalContent.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{modalContent.message}</p>
              <Button variant="default" size="sm" onClick={() => setShowModal(false)} className="w-full">
                OK
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MLRiskScoring;

