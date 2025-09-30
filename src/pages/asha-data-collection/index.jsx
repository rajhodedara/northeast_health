import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // --- 1. IMPORT useNavigate ---
import Header from '../../components/ui/Header';
import PatientDataForm from './components/PatientDataForm';
import WaterTestForm from './components/WaterTestForm';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import QuickActionCards from './components/QuickActionCards';
import VoiceInputHelper from './components/VoiceInputHelper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AshaDataCollection = () => {
  const navigate = useNavigate(); // --- 2. INITIALIZE useNavigate ---

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [pendingCount, setPendingCount] = useState(0);
  const [activeForm, setActiveForm] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  // Mock data for demonstration
  const mockSubmittedData = [
    {
      id: 'patient_1734249849112',
      type: 'patient',
      name: 'Rajesh Kumar',
      symptoms: ['fever', 'diarrhea'],
      submittedAt: '2024-12-15T08:04:09.112Z',
      syncStatus: 'synced'
    },
    {
      id: 'water_test_1734249849113',
      type: 'water_test',
      sampleLocation: 'Village Well - Main Road',
      waterSource: 'tube_well',
      submittedAt: '2024-12-15T07:30:15.445Z',
      syncStatus: 'pending'
    },
    {
      id: 'patient_1734249849114',
      type: 'patient',
      name: 'Priya Sharma',
      symptoms: ['vomiting', 'abdominal_pain'],
      submittedAt: '2024-12-15T06:45:22.778Z',
      syncStatus: 'synced'
    }
  ];

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Load submitted data from localStorage
    const savedData = localStorage.getItem('submittedData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSubmittedData(parsedData);
        // Count pending items
        const pending = parsedData?.filter(item => item?.syncStatus === 'pending')?.length;
        setPendingCount(pending);
      } catch (error) {
        console.error('Error loading submitted data:', error);
        setSubmittedData(mockSubmittedData);
        setPendingCount(1);
      }
    } else {
      setSubmittedData(mockSubmittedData);
      setPendingCount(1);
    }

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOffline(false);
      // Simulate auto-sync when coming back online
      if (pendingCount > 0) {
        setSyncStatus('syncing');
        setTimeout(() => {
          setSyncStatus('synced');
          setPendingCount(0);
        }, 3000);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      setSyncStatus('pending');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingCount]);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const handlePatientDataSubmit = async (data) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newData = [...submittedData, data];
      setSubmittedData(newData);
      localStorage.setItem('submittedData', JSON.stringify(newData));

      if (isOffline) {
        setPendingCount(prev => prev + 1);
        setSyncStatus('pending');
      }

      alert('Patient data submitted successfully!');
      setActiveForm(null);
    } catch (error) {
      throw new Error('Failed to submit patient data');
    }
  };

  const handleWaterTestSubmit = async (data) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newData = [...submittedData, data];
      setSubmittedData(newData);
      localStorage.setItem('submittedData', JSON.stringify(newData));

      if (isOffline) {
        setPendingCount(prev => prev + 1);
        setSyncStatus('pending');
      }

      alert('Water test results submitted successfully!');
      setActiveForm(null);
    } catch (error) {
      throw new Error('Failed to submit water test data');
    }
  };

  const handleSaveDraft = (data) => {
    console.log('Draft saved:', data);
  };

  const handleRetrySync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setPendingCount(0);
    }, 2000);
  };

  // --- 3. THIS FUNCTION IS NOW UPDATED ---
  const handleViewData = () => {
    navigate('/data-log');
  };
  // ------------------------------------

  const getPageTitle = () => {
    const titles = {
      en: 'ASHA Data Collection',
      hi: 'आशा डेटा संग्रह',
      as: 'আশা ডেটা সংগ্ৰহ',
      bn: 'আশা ডেটা সংগ্রহ'
    };
    return titles?.[currentLanguage] || titles?.en;
  };

  const getWelcomeMessage = () => {
    const messages = {
      en: 'Welcome to the field data collection system. Choose an option below to get started.',
      hi: 'फील्ड डेटा संग्रह प्रणाली में आपका स्वागत है। शुरू करने के लिए नीचे एक विकल्प चुनें।',
      as: 'ফিল্ড ডেটা সংগ্ৰহ প্ৰণালীলৈ আপোনাক স্বাগতম। আৰম্ভ কৰিবলৈ তলত এটা বিকল্প বাছক।',
      bn: 'ফিল্ড ডেটা সংগ্রহ সিস্টেমে আপনাকে স্বাগতম। শুরু করতে নিচে একটি বিকল্প বেছে নিন।'
    };
    return messages?.[currentLanguage] || messages?.en;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="asha"
        isOffline={isOffline}
        syncStatus={syncStatus}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                {getPageTitle()}
              </h1>
              <p className="text-lg font-body text-text-secondary">
                {getWelcomeMessage()}
              </p>
            </div>
          </div>

          {/* Back to Dashboard Button */}
         
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Forms */}
          <div className="xl:col-span-3 space-y-8">
            {/* Quick Action Cards */}
            {!activeForm && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  Quick Actions
                </h2>
                <QuickActionCards
                  onPatientFormClick={() => setActiveForm('patient')}
                  onWaterTestClick={() => setActiveForm('water')}
                  onViewDataClick={handleViewData} // This now navigates
                  pendingCount={pendingCount}
                />
              </div>
            )}

            {/* Active Form */}
            {activeForm === 'patient' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Patient Data Collection
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveForm(null)}
                    iconName="X"
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
                <PatientDataForm
                  onSubmit={handlePatientDataSubmit}
                  onSaveDraft={handleSaveDraft}
                  isOffline={isOffline}
                  currentLanguage={currentLanguage}
                />
              </div>
            )}

            {activeForm === 'water' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Water Test Data Collection
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveForm(null)}
                    iconName="X"
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
                <WaterTestForm
                  onSubmit={handleWaterTestSubmit}
                  onSaveDraft={handleSaveDraft}
                  isOffline={isOffline}
                  currentLanguage={currentLanguage}
                />
              </div>
            )}

            {/* Recent Submissions */}
            {!activeForm && submittedData?.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  Recent Submissions
                </h2>
                <div className="bg-card rounded-lg border border-border shadow-sm">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-heading font-medium text-text-primary">
                      Last 3 Submissions
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {submittedData?.slice(-3)?.reverse()?.map((item) => (
                      <div key={item?.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item?.type === 'patient' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                            }`}>
                            <Icon
                              name={item?.type === 'patient' ? 'FileText' : 'Droplets'}
                              size={20}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-body font-medium text-text-primary">
                              {item?.type === 'patient' ? item?.name : item?.sampleLocation}
                            </div>
                            <div className="text-xs font-caption text-text-secondary">
                              {new Date(item.submittedAt)?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-caption ${item?.syncStatus === 'synced' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>
                          {item?.syncStatus === 'synced' ? 'Synced' : 'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status & Tools */}
          <div className="space-y-6">
            {/* Network Status */}
            <NetworkStatusIndicator
              isOffline={isOffline}
              syncStatus={syncStatus}
              pendingCount={pendingCount}
              onRetrySync={handleRetrySync}
            />

            {/* Voice Input Helper */}
            <VoiceInputHelper
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            {/* Help & Tips */}
            <div className="bg-card rounded-lg border border-border shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="HelpCircle" size={20} className="text-primary" />
                <h3 className="text-sm font-body font-medium text-text-primary">
                  Quick Tips
                </h3>
              </div>
              <div className="space-y-2 text-xs font-caption text-text-secondary">
                <div className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="mt-0.5 text-success" />
                  <span>Use voice input for faster data entry</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="mt-0.5 text-success" />
                  <span>Forms are auto-saved as drafts</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="mt-0.5 text-success" />
                  <span>GPS location is required for all entries</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="mt-0.5 text-success" />
                  <span>Data syncs automatically when online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AshaDataCollection;