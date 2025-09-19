import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MLRiskScoring = ({ className = '' }) => {
  const [selectedRisk, setSelectedRisk] = useState(null);

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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-error';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-primary';
    return 'text-success';
  };

  const getFactorStatusColor = (status) => {
    switch (status) {
      case 'high': case'increasing': case'poor': case'peak_season':
        return 'text-error';
      case 'moderate': case'limited': case'low':
        return 'text-warning';
      case 'adequate': case'stable': case'favorable':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 90) return { level: 'Very High', color: 'text-success' };
    if (confidence >= 80) return { level: 'High', color: 'text-primary' };
    if (confidence >= 70) return { level: 'Moderate', color: 'text-warning' };
    return { level: 'Low', color: 'text-error' };
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">ML Risk Scoring</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">AI Model Active</span>
        </div>
      </div>
      {/* Model Performance Summary */}
      <div className="bg-accent rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">94%</p>
            <p className="text-xs text-text-secondary">Model Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">156</p>
            <p className="text-xs text-text-secondary">Predictions Made</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning">3</p>
            <p className="text-xs text-text-secondary">Active Alerts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary">2.3h</p>
            <p className="text-xs text-text-secondary">Avg Response Time</p>
          </div>
        </div>
      </div>
      {/* Risk Alerts */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">AI-Generated Risk Alerts</h4>
        
        {riskAlerts?.map((alert) => {
          const confidenceInfo = getConfidenceLevel(alert?.confidence);
          
          return (
            <div
              key={alert?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRisk?.id === alert?.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedRisk(selectedRisk?.id === alert?.id ? null : alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-text-primary">{alert?.location}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {confidenceInfo?.level} Confidence
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">Risk Score:</span>
                      <span className={`text-lg font-bold ${getRiskScoreColor(alert?.riskScore)}`}>
                        {alert?.riskScore}/100
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">Predicted:</span>
                      <span className="text-sm font-medium text-text-primary">{alert?.predictedOutbreak}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">Timeframe:</span>
                      <span className="text-sm font-medium text-text-primary">{alert?.timeframe}</span>
                    </div>
                  </div>
                  
                  {/* Risk Score Visualization */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">Risk Level</span>
                      <span className={`text-xs font-medium ${confidenceInfo?.color}`}>
                        {alert?.confidence}% confidence
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          alert?.riskScore >= 80 ? 'bg-error' :
                          alert?.riskScore >= 60 ? 'bg-warning' :
                          alert?.riskScore >= 40 ? 'bg-primary' : 'bg-success'
                        }`}
                        style={{ width: `${alert?.riskScore}%` }}
                      />
                    </div>
                  </div>
                  
                  {selectedRisk?.id === alert?.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      {/* Risk Factors */}
                      <div className="mb-4">
                        <h6 className="text-sm font-medium text-text-primary mb-3">Contributing Factors</h6>
                        <div className="space-y-2">
                          {alert?.factors?.map((factor, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 flex-1">
                                <span className="text-sm text-text-primary">{factor?.factor}</span>
                                <span className={`text-xs capitalize ${getFactorStatusColor(factor?.status)}`}>
                                  ({factor?.status?.replace('_', ' ')})
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-text-secondary">{factor?.weight}%</span>
                                <div className="w-16 bg-muted rounded-full h-1">
                                  <div 
                                    className="bg-primary h-1 rounded-full"
                                    style={{ width: `${factor?.weight * 2}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="mb-4">
                        <h6 className="text-sm font-medium text-text-primary mb-3">AI Recommendations</h6>
                        <ul className="space-y-2">
                          {alert?.recommendations?.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                              <span className="text-sm text-text-primary">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Model Performance */}
                      <div className="bg-accent rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Historical Accuracy for this area:</span>
                          <span className="text-sm font-medium text-success">{alert?.historicalAccuracy}%</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" iconName="AlertTriangle">
                          Create Alert
                        </Button>
                        <Button variant="outline" size="sm" iconName="Users">
                          Deploy Team
                        </Button>
                        <Button variant="outline" size="sm" iconName="MessageSquare">
                          Send Notification
                        </Button>
                        <Button variant="outline" size="sm" iconName="TrendingUp">
                          View Trends
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <Icon 
                  name={selectedRisk?.id === alert?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary ml-2"
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* Model Information */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              Model last updated: 6 hours ago • Next update: 2 hours
            </span>
          </div>
          
          <Button variant="outline" size="sm" iconName="Settings">
            Model Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MLRiskScoring;