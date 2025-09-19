import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import NetworkStatus from './components/NetworkStatus';
import LoginForm from './components/LoginForm';
import TrustBadges from './components/TrustBadges';

const Login = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for different user types
  const mockCredentials = {
    asha: {
      username: 'asha_worker',
      password: 'health123',
      phone: '9876543210'
    },
    official: {
      username: 'district_official',
      password: 'admin123',
      phone: '9876543211'
    }
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('healthwatch_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('healthwatch_language', languageCode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { username, password } = formData;

      // Check against mock credentials
      let userRole = null;
      let isValidCredentials = false;

      // Check ASHA worker credentials
      if ((username === mockCredentials?.asha?.username || username === mockCredentials?.asha?.phone) && 
          password === mockCredentials?.asha?.password) {
        userRole = 'asha';
        isValidCredentials = true;
      }
      // Check district official credentials
      else if ((username === mockCredentials?.official?.username || username === mockCredentials?.official?.phone) && 
               password === mockCredentials?.official?.password) {
        userRole = 'official';
        isValidCredentials = true;
      }

      if (isValidCredentials) {
        // Store user session
        localStorage.setItem('healthwatch_user', JSON.stringify({
          role: userRole,
          username: username,
          loginTime: new Date()?.toISOString(),
          language: currentLanguage
        }));

        // Navigate based on role
        if (userRole === 'asha') {
          navigate('/asha-data-collection');
        } else {
          navigate('/district-officials-dashboard');
        }
      } else {
        // Show error with mock credentials hint
        const errorMessages = {
          en: `Invalid credentials. Use: ASHA Worker (${mockCredentials?.asha?.username}/${mockCredentials?.asha?.password}) or District Official (${mockCredentials?.official?.username}/${mockCredentials?.official?.password})`,
          hi: `गलत क्रेडेंशियल। उपयोग करें: आशा कार्यकर्ता (${mockCredentials?.asha?.username}/${mockCredentials?.asha?.password}) या जिला अधिकारी (${mockCredentials?.official?.username}/${mockCredentials?.official?.password})`,
          as: `ভুল ক্ৰেডেনচিয়েল। ব্যৱহাৰ কৰক: আশা কৰ্মী (${mockCredentials?.asha?.username}/${mockCredentials?.asha?.password}) বা জিলা বিষয়া (${mockCredentials?.official?.username}/${mockCredentials?.official?.password})`,
          bn: `ভুল ক্রেডেনশিয়াল। ব্যবহার করুন: আশা কর্মী (${mockCredentials?.asha?.username}/${mockCredentials?.asha?.password}) বা জেলা কর্মকর্তা (${mockCredentials?.official?.username}/${mockCredentials?.official?.password})`,
          mni: `অশুদ্ধ ক্ৰেডেনশিয়েল। শিজিন্নৌ: আশা থবকশিং (${mockCredentials?.asha?.username}/${mockCredentials?.asha?.password}) নত্ত্ৰগা জিল্লাগী অফিসর (${mockCredentials?.official?.username}/${mockCredentials?.official?.password})`
        };
        
        setError(errorMessages?.[currentLanguage] || errorMessages?.en);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      {/* Header with Language Selector and Network Status */}
      <div className="w-full p-4 lg:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <NetworkStatus isOnline={isOnline} />
          </div>
          <div className="w-48">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 mb-6">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
              currentLanguage={currentLanguage}
              onVoiceInput={() => {}} // Add missing required prop
            />
          </div>

          {/* Trust Badges */}
          <TrustBadges currentLanguage={currentLanguage} />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full p-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-text-secondary">
            © {new Date()?.getFullYear()} HealthWatch Northeast. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Ministry of Health & Family Welfare, Government of India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;