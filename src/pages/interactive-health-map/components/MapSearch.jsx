import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MapSearch = ({ onLocationSelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const mockLocations = [
    {
      id: 1,
      name: "Guwahati Medical College",
      type: "Health Facility",
      region: "Assam",
      coordinates: { lat: 26.1445, lng: 91.7362 },
      description: "Primary medical facility with 500 beds"
    },
    {
      id: 2,
      name: "Brahmaputra River - Guwahati",
      type: "Water Source",
      region: "Assam",
      coordinates: { lat: 26.1833, lng: 91.7500 },
      description: "Major river water testing site"
    },
    {
      id: 3,
      name: "Dibrugarh District Hospital",
      type: "Health Facility",
      region: "Assam",
      coordinates: { lat: 27.4728, lng: 94.9120 },
      description: "District level healthcare facility"
    },
    {
      id: 4,
      name: "Shillong Civil Hospital",
      type: "Health Facility",
      region: "Meghalaya",
      coordinates: { lat: 25.5788, lng: 91.8933 },
      description: "State civil hospital"
    },
    {
      id: 5,
      name: "Imphal East Water Treatment Plant",
      type: "Water Source",
      region: "Manipur",
      coordinates: { lat: 24.8170, lng: 93.9368 },
      description: "Water treatment and testing facility"
    },
    {
      id: 6,
      name: "Kohima District Hospital",
      type: "Health Facility",
      region: "Nagaland",
      coordinates: { lat: 25.6751, lng: 94.1086 },
      description: "Primary healthcare center"
    },
    {
      id: 7,
      name: "Agartala Government Medical College",
      type: "Health Facility",
      region: "Tripura",
      coordinates: { lat: 23.8315, lng: 91.2868 },
      description: "Medical college and hospital"
    },
    {
      id: 8,
      name: "Aizawl Civil Hospital",
      type: "Health Facility",
      region: "Mizoram",
      coordinates: { lat: 23.7271, lng: 92.7176 },
      description: "State referral hospital"
    }
  ];

  const recentSearches = [
    "Guwahati outbreak zone",
    "Dibrugarh water quality",
    "Shillong health facilities",
    "Imphal intervention sites"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query) => {
    if (!query?.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockLocations?.filter(location =>
        location?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        location?.region?.toLowerCase()?.includes(query?.toLowerCase()) ||
        location?.type?.toLowerCase()?.includes(query?.toLowerCase()) ||
        location?.description?.toLowerCase()?.includes(query?.toLowerCase())
      );

      setSearchResults(filtered);
      setIsSearching(false);
      
      if (onSearch) {
        onSearch(query, filtered);
      }
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleLocationClick = (location) => {
    setSearchQuery(location?.name);
    setShowResults(false);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const getLocationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'health facility':
        return 'MapPin';
      case 'water source':
        return 'Droplets';
      case 'outbreak zone':
        return 'AlertTriangle';
      case 'intervention site':
        return 'Shield';
      default:
        return 'MapPin';
    }
  };

  const getLocationColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'health facility':
        return 'text-red-500';
      case 'water source':
        return 'text-blue-500';
      case 'outbreak zone':
        return 'text-orange-500';
      case 'intervention site':
        return 'text-green-500';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="absolute top-4 right-4 z-1000 w-80" ref={searchRef}>
      <div className="bg-surface border border-border rounded-lg shadow-modal">
        <div className="p-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search locations, facilities, or regions..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {isSearching && (
                <Icon name="Loader2" size={16} className="text-text-secondary animate-spin" />
              )}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-accent rounded-md transition-colors duration-150"
                >
                  <Icon name="X" size={14} className="text-text-secondary" />
                </button>
              )}
              <Icon name="Search" size={16} className="text-text-secondary" />
            </div>
          </div>
        </div>

        {showResults && (
          <div className="border-t border-border max-h-96 overflow-y-auto">
            {searchQuery && searchResults?.length > 0 && (
              <div className="p-2">
                <h4 className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide px-2 py-1">
                  Search Results ({searchResults?.length})
                </h4>
                <div className="space-y-1">
                  {searchResults?.map((location) => (
                    <button
                      key={location?.id}
                      onClick={() => handleLocationClick(location)}
                      className="w-full flex items-start space-x-3 p-2 hover:bg-accent rounded-md transition-colors duration-150 text-left"
                    >
                      <Icon 
                        name={getLocationIcon(location?.type)} 
                        size={16} 
                        className={`mt-1 ${getLocationColor(location?.type)}`} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-body font-medium text-text-primary truncate">
                          {location?.name}
                        </div>
                        <div className="text-xs font-caption text-text-secondary">
                          {location?.type} • {location?.region}
                        </div>
                        <div className="text-xs font-caption text-text-secondary truncate">
                          {location?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults?.length === 0 && !isSearching && (
              <div className="p-4 text-center">
                <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm font-body text-text-secondary">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-xs font-caption text-text-secondary mt-1">
                  Try searching for health facilities, water sources, or regions
                </p>
              </div>
            )}

            {!searchQuery && (
              <div className="p-2">
                <h4 className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide px-2 py-1">
                  Recent Searches
                </h4>
                <div className="space-y-1">
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-accent rounded-md transition-colors duration-150 text-left"
                    >
                      <Icon name="Clock" size={14} className="text-text-secondary" />
                      <span className="text-sm font-body text-text-primary">{search}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 pt-2 border-t border-border">
                  <h4 className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide px-2 py-1">
                    Quick Access
                  </h4>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRecentSearchClick('All health facilities')}
                      iconName="MapPin"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      All Health Facilities
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRecentSearchClick('Water testing sites')}
                      iconName="Droplets"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      Water Testing Sites
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRecentSearchClick('Active outbreaks')}
                      iconName="AlertTriangle"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      Active Outbreaks
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSearch;