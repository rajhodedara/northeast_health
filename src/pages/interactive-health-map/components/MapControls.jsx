import React, { useState } from 'react';

// --- Helper Components (Placeholders for a runnable example) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    Layers: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Minus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Camera: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    Download: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    RefreshCw: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
    Home: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Sparkles: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
    ChevronsRight: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    MessageCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>,
  };
  return <div className={className}>{icons[name] || null}</div>;
};

const Button = ({ variant = 'default', size, onClick, iconName, children, className = '', title = '', disabled = false }) => {
  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', icon: 'p-2' };
  const variantClasses = {
    outline: 'border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800',
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
  };
  return (
    <button title={title} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} >
      {iconName && <Icon name={iconName} size={16} className={children ? "mr-2" : ""} />}
      {children}
    </button>
  );
};

const SegmentedControl = ({ options, value, onChange }) => (
    <div className="flex w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
        {options.map(option => (
            <button key={option.value} onClick={() => onChange(option.value)} className={`flex-1 text-center text-sm px-2 py-1 rounded transition-colors duration-200 ${value === option.value ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}`}>
                {option.label}
            </button>
        ))}
    </div>
);

// --- Main Component ---

const MapControls = ({ onLayerToggle = () => {}, onTimeRangeChange = () => {}, onZoomChange = () => {}, onExport = () => {} }) => {
  const [activeLayers, setActiveLayers] = useState(['health', 'water']);
  const [timeRange, setTimeRange] = useState('7days');
  const [zoomLevel, setZoomLevel] = useState(10);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewSummary, setViewSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const layerOptions = [
    { value: 'health', label: 'Incidents' },
    { value: 'water', label: 'Water Quality' },
    { value: 'outbreaks', label: 'Zones' },
    { value: 'interventions', label: 'Response' }
  ];

  const timeRangeOptions = [
    { value: '24hours', label: '24H' },
    { value: '7days', label: '7D' },
    { value: '30days', label: '30D' },
  ];

  const handleGenerateSummary = () => {
    setIsSummarizing(true);
    setViewSummary('');
    // Mock Gemini API call
    setTimeout(() => {
        const layersText = activeLayers.map(l => layerOptions.find(opt => opt.value === l).label).join(', ');
        const timeText = timeRangeOptions.find(opt => opt.value === timeRange).label;
        const summary = `This view focuses on **${layersText}** over the **${timeText}**. The data suggests a correlation between poor water quality areas and recent health incidents. Response teams are active in the designated outbreak zones.`;
        setViewSummary(summary);
        setIsSummarizing(false);
    }, 1500);
  };

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-50">
        <Button size="icon" onClick={() => setIsCollapsed(false)} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg" title="Expand Controls">
          <Icon name="ChevronsRight" size={18}/>
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-72 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 flex items-center"><Icon name="Layers" size={16} className="mr-2 text-blue-500"/> Map Controls</h3>
        <Button size="icon" variant="ghost" onClick={() => setIsCollapsed(true)} title="Collapse Controls"><Icon name="X" size={16}/></Button>
      </div>

      <div className="p-3 space-y-4 flex-1">
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Data Layers</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {layerOptions.map(layer => (
                 <button key={layer.value} onClick={() => { const newLayers = activeLayers.includes(layer.value) ? activeLayers.filter(l => l !== layer.value) : [...activeLayers, layer.value]; setActiveLayers(newLayers); onLayerToggle(newLayers); }} className={`px-2 py-1.5 text-sm rounded-md text-center transition-colors ${activeLayers.includes(layer.value) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                    {layer.label}
                </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Time Period</label>
          <SegmentedControl options={timeRangeOptions} value={timeRange} onChange={(val) => { setTimeRange(val); onTimeRangeChange(val); }}/>
        </div>

        <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Zoom</label>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                <Button variant="ghost" size="icon" onClick={() => { const newZoom = Math.max(zoomLevel - 1, 5); setZoomLevel(newZoom); onZoomChange(newZoom); }}><Icon name="Minus"/></Button>
                <span className="text-sm w-6 text-center text-gray-700 dark:text-gray-200">{zoomLevel}</span>
                <Button variant="ghost" size="icon" onClick={() => { const newZoom = Math.min(zoomLevel + 1, 18); setZoomLevel(newZoom); onZoomChange(newZoom); }}><Icon name="Plus"/></Button>
            </div>
        </div>

        {/* AI Analysis Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">AI Analysis</label>
             <Button variant="secondary" size="sm" onClick={handleGenerateSummary} disabled={isSummarizing} className="w-full mt-2" iconName="MessageCircle">
                {isSummarizing ? 'Analyzing...' : 'Summarize Current View'}
            </Button>
            {isSummarizing && <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"><div className="bg-blue-600 h-1 rounded-full animate-pulse" style={{width: '40%'}}></div></div>}
            {viewSummary && !isSummarizing &&(
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200">
                    <div className="font-semibold mb-1 flex items-center"><Icon name="Sparkles" size={14} className="mr-1.5"/> AI Summary:</div>
                    <p dangerouslySetInnerHTML={{ __html: viewSummary }} />
                </div>
            )}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => onExport('screenshot')} iconName="Camera">Screenshot</Button>
              <Button variant="outline" size="sm" onClick={() => onExport('data')} iconName="Download">Export Data</Button>
              <Button variant="outline" size="sm" iconName="RefreshCw">Refresh</Button>
              <Button variant="outline" size="sm" iconName="Home">Reset View</Button>
          </div>
      </div>
    </div>
  );
};

export default MapControls;

