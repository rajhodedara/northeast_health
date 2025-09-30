import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Info: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Droplets: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.7-3.02C8.23 8.5 8 7.2 8 6c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.23 2.49-1.3 3.23-.98.63-1.7 1.86-1.7 3.02 0 2.23 1.8 4.05 4 4.05s4-1.82 4-4.05c0-1.16-.57-2.26-1.7-3.02C17.23 8.5 17 7.2 17 6c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.2.23 2.49 1.3 3.23.98.63 1.7 1.86 1.7 3.02 0 2.23-1.8 4.05-4 4.05Z"/></svg>,
    AlertTriangle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    Shield: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    Eye: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    Sparkles: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

// --- Main Component ---
const MapLegend = ({ isVisible, onToggle }) => {
  const [aiInsight, setAiInsight] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const riskLevels = [ { color: "bg-green-500", label: "Low Risk / Safe" }, { color: "bg-yellow-500", label: "Moderate Risk" }, { color: "bg-orange-500", label: "High Risk / Poor" }, { color: "bg-red-600", label: "Critical / Unsafe" } ];
  const markerTypes = [ { icon: "MapPin", color: "text-red-500", label: "Health Facility" }, { icon: "Droplets", color: "text-blue-500", label: "Water Source" }, { icon: "AlertTriangle", color: "text-orange-500", label: "Outbreak Zone" }, { icon: "Shield", color: "text-green-500", label: "Intervention Site" } ];

  const handleGetAiInsight = () => {
    setIsGenerating(true);
    setAiInsight('');
    // Mock Gemini API call
    setTimeout(() => {
        const insight = "<strong>AI Tip:</strong> Look for clusters of 'High Risk' incidents near 'Unsafe' water sources to identify areas needing immediate intervention.";
        setAiInsight(insight);
        setIsGenerating(false);
    }, 1500);
  };


  if (!isVisible) {
    return (
      <button onClick={onToggle} className="fixed bottom-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 z-50" aria-label="Show Map Legend" >
        <Icon name="Eye" size={20} className="text-gray-700 dark:text-gray-200" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 flex flex-col p-3 transition-all duration-300 animate-fade-in-up`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
            <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1.5">Risk Levels</h4>
                <div className="flex items-center space-x-2">
                    {riskLevels.map(level => (
                        <div key={level.label} className="group relative">
                            <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">{level.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
            <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1.5">Map Markers</h4>
                 <div className="flex items-center space-x-4">
                    {markerTypes.map(marker => (
                         <div key={marker.label} className="group relative flex items-center">
                            <Icon name={marker.icon} size={18} className={marker.color} />
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">{marker.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Live Data</span>
            </div>
            <button onClick={onToggle} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-150" aria-label="Hide Map Legend">
                <Icon name="X" size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
        </div>
      </div>

      {(isGenerating || aiInsight) && <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700"></div>}

      <div className="flex items-center justify-between">
        <button onClick={handleGetAiInsight} disabled={isGenerating} className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-wait">
            <Icon name="Sparkles" size={14} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'Analyzing...' : 'Get Focus Tip'}</span>
        </button>
        {aiInsight && !isGenerating && (
            <div className="text-xs text-gray-600 dark:text-gray-300 animate-fade-in-up" dangerouslySetInnerHTML={{ __html: aiInsight }} />
        )}
      </div>

       <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

// --- Wrapper App for Demo ---
const App = () => {
    const [legendVisible, setLegendVisible] = useState(true);
    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <MapLegend isVisible={legendVisible} onToggle={() => setLegendVisible(!legendVisible)} />
        </div>
    );
}

export default App;

