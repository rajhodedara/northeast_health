import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Map: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    Droplets: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.7-3.02C8.23 8.5 8 7.2 8 6c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.23 2.49-1.3 3.23-.98.63-1.7 1.86-1.7 3.02 0 2.23 1.8 4.05 4 4.05s4-1.82 4-4.05c0-1.16-.57-2.26-1.7-3.02C17.23 8.5 17 7.2 17 6c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.2.23 2.49 1.3 3.23.98.63 1.7 1.86 1.7 3.02 0 2.23-1.8 4.05-4 4.05Z"/></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    ArrowLeft: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
    Sparkles: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '', disabled=false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm' };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className="mr-2" />}
      {children}
    </button>
  );
};

// --- Main Component ---

const InteractiveHeatMap = ({ className = '' }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const hotspots = [
    { id: 1, name: "Guwahati Central", lat: 26.14, lng: 91.73, riskLevel: "high", cases: 45, waterQuality: "poor", lastUpdated: "2 hours ago", pos: { top: '45%', left: '42%' } },
    { id: 2, name: "Dibrugarh East", lat: 27.47, lng: 94.91, riskLevel: "medium", cases: 23, waterQuality: "moderate", lastUpdated: "4 hours ago", pos: { top: '30%', left: '80%' } },
    { id: 3, name: "Silchar South", lat: 24.83, lng: 92.77, riskLevel: "low", cases: 8, waterQuality: "good", lastUpdated: "1 hour ago", pos: { top: '80%', left: '58%' } },
    { id: 4, name: "Jorhat North", lat: 26.75, lng: 94.20, riskLevel: "high", cases: 38, waterQuality: "poor", lastUpdated: "3 hours ago", pos: { top: '55%', left: '70%' } },
  ];

  const handleGenerateSummary = () => {
    if (!selectedHotspot) return;
    setIsGenerating(true);
    setAiSummary('');
    // Mock AI analysis for demo
    setTimeout(() => {
        const summary = `The **${selectedHotspot.name}** area is currently a **high-risk zone** due to **${selectedHotspot.cases} active cases** and **poor water quality**. These factors combined indicate a significant threat of further outbreak. Immediate public health interventions are strongly recommended.`;
        setAiSummary(summary);
        setIsGenerating(false);
    }, 1500);
  };

  const getRiskColor = (level, type = 'bg') => {
    switch (level) {
      case 'high': return type === 'bg' ? 'bg-red-500' : 'text-red-500 border-red-500';
      case 'medium': return type === 'bg' ? 'bg-yellow-500' : 'text-yellow-500 border-yellow-500';
      case 'low': return type === 'bg' ? 'bg-green-500' : 'text-green-500 border-green-500';
      default: return type === 'bg' ? 'bg-gray-500' : 'text-gray-500 border-gray-500';
    }
  };

  const getWaterQualityColor = (quality) => {
    switch (quality) {
      case 'poor': return 'text-red-500';
      case 'moderate': return 'text-yellow-500';
      case 'good': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const handleSelectHotspot = (hotspot) => {
    setSelectedHotspot(hotspot);
    setAiSummary(''); // Clear previous summary
  };

  return (
    <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm flex overflow-hidden h-[32rem] ${className}`}>
      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Live Hotspot Analysis</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: 5 min ago</p>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
            {!selectedHotspot ? (
                <div className="space-y-2">
                    {hotspots.map((hotspot) => (
                         <div key={hotspot.id} onClick={() => handleSelectHotspot(hotspot)} className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                             <div className="flex items-center justify-between">
                                 <h4 className="font-medium text-gray-800 dark:text-gray-200">{hotspot.name}</h4>
                                 <span className={`px-2 py-0.5 text-xs rounded-full ${getRiskColor(hotspot.riskLevel, 'bg')}/10 ${getRiskColor(hotspot.riskLevel, 'text')} capitalize`}>{hotspot.riskLevel}</span>
                             </div>
                             <p className="text-sm text-gray-500 dark:text-gray-400">{hotspot.cases} active cases</p>
                         </div>
                    ))}
                </div>
            ) : (
                <div className="p-3 animate-fade-in">
                    <button onClick={() => setSelectedHotspot(null)} className="flex items-center text-sm text-blue-500 hover:underline mb-4">
                        <Icon name="ArrowLeft" size={14} className="mr-1"/>
                        Back to list
                    </button>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{selectedHotspot.name}</h4>
                    <p className={`text-sm font-semibold capitalize ${getRiskColor(selectedHotspot.riskLevel, 'text')} mb-4`}>{selectedHotspot.riskLevel} Risk Zone</p>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400 flex items-center"><Icon name="Users" size={14} className="mr-2"/>Active Cases</span><span className="font-semibold text-gray-800 dark:text-gray-200">{selectedHotspot.cases}</span></div>
                        <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400 flex items-center"><Icon name="Droplets" size={14} className="mr-2"/>Water Quality</span><span className={`font-semibold capitalize ${getWaterQualityColor(selectedHotspot.waterQuality)}`}>{selectedHotspot.waterQuality}</span></div>
                        <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400 flex items-center"><Icon name="Clock" size={14} className="mr-2"/>Last Updated</span><span className="font-semibold text-gray-800 dark:text-gray-200">{selectedHotspot.lastUpdated}</span></div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                         <Button variant="secondary" size="sm" iconName="Sparkles" onClick={handleGenerateSummary} disabled={isGenerating}>
                           {isGenerating ? 'Analyzing...' : 'Generate Area Summary'}
                         </Button>
                         {isGenerating && <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{width: '40%'}}></div></div>}
                         {aiSummary && !isGenerating && (
                             <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                                 <p className="text-sm text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: aiSummary }} />
                             </div>
                         )}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-2/3 relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Northeast India Health Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.882559310652!2d92.9354116154674!3d26.20060008340158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzAyLjIiTiA5MsKwNTYnMTUuNSJF!5e0!3m2!1sen!2sin!4v1619445831924!5m2!1sen!2sin&q=26.2006,92.9376&z=7&output=embed"
          className="absolute inset-0"
        />

        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ ...hotspot.pos }}
            onClick={() => handleSelectHotspot(hotspot)}
            title={hotspot.name}
          >
            <div className={`w-5 h-5 rounded-full ${getRiskColor(hotspot.riskLevel, 'bg')} opacity-75 ring-4 ring-white/30 dark:ring-black/30`}></div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${getRiskColor(hotspot.riskLevel, 'bg')} animate-ping`}></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
            75%, 100% {
                transform: scale(3);
                opacity: 0;
            }
        }
        .animate-ping {
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveHeatMap;


