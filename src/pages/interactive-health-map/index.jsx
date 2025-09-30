import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MapFilters from './components/MapFilters';
import MapControls from './components/MapControls';
import MapSearch from './components/MapSearch';
import MapLegend from './components/MapLegend';
import MapPopup from './components/MapPopup';
import Icon from '../../components/AppIcon';


const InteractiveHealthMap = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [mapFilters, setMapFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock map data
  const mockMapData = [
    {
      id: 1,
      type: 'health_incident',
      disease: 'Diarrheal Disease',
      location: 'Guwahati, Assam',
      coordinates: { lat: 26.1445, lng: 91.7362 },
      patientCount: 23,
      severity: 'High',
      reportedDate: '12/09/2025',
      symptoms: ['Diarrhea', 'Fever', 'Dehydration']
    },
    {
      id: 2,
      type: 'water_test',
      location: 'Brahmaputra River - Dibrugarh',
      coordinates: { lat: 27.4728, lng: 94.9120 },
      quality: 'Poor',
      cfuCount: 85,
      testDate: '10/09/2025',
      ph: 6.8,
      turbidity: '12 NTU',
      chlorine: '0.2 mg/L'
    },
    {
      id: 3,
      type: 'outbreak',
      location: 'Shillong, Meghalaya',
      coordinates: { lat: 25.5788, lng: 91.8933 },
      status: 'Active',
      affectedPopulation: 156,
      startDate: '08/09/2025',
      primaryDisease: 'Cholera',
      interventionActive: true
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('healthwatch_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('healthwatch_language', languageCode);
  };

  const handleMapClick = (event, dataPoint) => {
    if (dataPoint) {
      setSelectedPopup(dataPoint);
      setPopupPosition({
        x: event?.clientX,
        y: event?.clientY
      });
    } else {
      setSelectedPopup(null);
      setPopupPosition(null);
    }
  };

  const handlePopupAction = (action, data) => {
    console.log('Popup action:', action, data);
    // Handle different popup actions
    switch (action) {
      case 'view_details':
        // Navigate to detailed view
        break;
      case 'create_alert':
        // Open alert creation modal
        break;
      case 'manage_outbreak':
        // Navigate to outbreak management
        break;
      default:
        break;
    }
    setSelectedPopup(null);
    setPopupPosition(null);
  };

  const handleFilterChange = (filters) => {
    setMapFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleClearFilters = () => {
    setMapFilters({});
  };

  const handleLayerToggle = (layer) => {
    console.log('Layer toggled:', layer);
  };

  const handleTimeRangeChange = (timeRange) => {
    console.log('Time range changed:', timeRange);
  };

  const handleZoomChange = (zoomLevel) => {
    console.log('Zoom level changed:', zoomLevel);
  };

  const handleExport = (type) => {
    console.log('Export requested:', type);
    // Handle export functionality
  };

  const handleLocationSelect = (location) => {
    console.log('Location selected:', location);
    // Center map on selected location
  };

  const handleSearch = (query, results) => {
    console.log('Search performed:', query, results);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          userRole="official"
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
        />
        <div className="flex">
          <Sidebar
            userRole="official"
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="h-screen flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto" />
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Loading Interactive Health Map
                </h2>
                <p className="text-sm font-body text-text-secondary">
                  Initializing geographic data and health indicators...
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="official"
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      <div className="flex">
        <Sidebar
          userRole="official"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Map Filters */}
          <MapFilters
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Map Container */}
          <div className="relative h-[calc(100vh-8rem)] bg-surface">
            {/* Map Controls */}
            <MapControls
              onLayerToggle={handleLayerToggle}
              onTimeRangeChange={handleTimeRangeChange}
              onZoomChange={handleZoomChange}
              onExport={handleExport}
            />

            {/* Map Search */}
            <MapSearch
              onLocationSelect={handleLocationSelect}
              onSearch={handleSearch}
            />

            {/* Main Map Area */}
            <div className="w-full h-full relative overflow-hidden">
              {/* Google Maps Iframe */}
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Northeast India Health Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=26.2006,92.9376&z=7&output=embed"
                className="border-0"
              />

              {/* Map Overlay for Data Points */}
              <div className="absolute inset-0 pointer-events-none">
                {mockMapData?.map((dataPoint) => (
                  <div
                    key={dataPoint?.id}
                    className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + (dataPoint?.id * 10)}%`,
                      top: `${40 + (dataPoint?.id * 8)}%`
                    }}
                    onClick={(e) => handleMapClick(e, dataPoint)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      dataPoint?.type === 'health_incident' ? 'bg-red-500' :
                      dataPoint?.type === 'water_test' ? 'bg-blue-500' :
                      dataPoint?.type === 'outbreak' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      <Icon
                        name={
                          dataPoint?.type === 'health_incident' ? 'Activity' :
                          dataPoint?.type === 'water_test' ? 'Droplets' :
                          dataPoint?.type === 'outbreak' ? 'AlertTriangle' : 'Shield'
                        }
                        size={12}
                        color="white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Network Status Overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-1000">
                <div className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-body text-text-primary">
                      Real-time data active
                    </span>
                    <span className="text-xs font-caption text-text-secondary">
                      Last sync: 2 min ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Overlay */}
              <div className="absolute bottom-4 left-4 z-1000">
                <div className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-modal">
                  <h3 className="text-sm font-body font-medium text-text-primary mb-2">
                    Current Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-caption">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-text-secondary">Health Incidents</span>
                      </div>
                      <div className="text-lg font-body font-semibold text-text-primary">1,247</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-text-secondary">Water Tests</span>
                      </div>
                      <div className="text-lg font-body font-semibold text-text-primary">391</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-text-secondary">Active Outbreaks</span>
                      </div>
                      <div className="text-lg font-body font-semibold text-red-600">3</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-text-secondary">Interventions</span>
                      </div>
                      <div className="text-lg font-body font-semibold text-text-primary">28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <MapLegend
              isVisible={isLegendVisible}
              onToggle={() => setIsLegendVisible(!isLegendVisible)}
            />

            {/* Map Popup */}
            {selectedPopup && popupPosition && (
              <MapPopup
                data={selectedPopup}
                position={popupPosition}
                onClose={() => {
                  setSelectedPopup(null);
                  setPopupPosition(null);
                }}
                onAction={handlePopupAction}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InteractiveHealthMap;