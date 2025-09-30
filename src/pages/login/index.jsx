import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import NetworkStatus from './components/NetworkStatus';
import LoginForm from './components/LoginForm';
import TrustBadges from './components/TrustBadges';

// Mock credentials moved outside the component
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

const Login = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('healthwatch_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

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
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { username, password } = formData;
      let userRole = null;
      let isValidCredentials = false;

      if ((username === mockCredentials.asha.username || username === mockCredentials.asha.phone) &&
        password === mockCredentials.asha.password) {
        userRole = 'asha';
        isValidCredentials = true;
      }
      else if ((username === mockCredentials.official.username || username === mockCredentials.official.phone) &&
        password === mockCredentials.official.password) {
        userRole = 'official';
        isValidCredentials = true;
      }

      if (isValidCredentials) {
        localStorage.setItem('healthwatch_user', JSON.stringify({
          role: userRole,
          username: username,
          loginTime: new Date().toISOString(),
          language: currentLanguage
        }));

        navigate(userRole === 'asha' ? '/asha-data-collection' : '/district-officials-dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      {/* Header */}
      <div className="w-full p-4 lg:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <NetworkStatus isOnline={isOnline} />
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
          {/* Login Form Card */}
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 mb-6">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
              currentLanguage={currentLanguage}
              onVoiceInput={() => { }}
            />

            {/* --- MINIMALIST HINT --- */}
            {/* This hint is now inside the card and only appears in development mode */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 pt-4 border-t border-border text-center text-xs text-gray-500">
                <p className="font-semibold mb-2">For Demo</p>
                <div className="flex justify-around">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-600">ASHA Worker</p>
                    <p><code className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">asha_worker / health123</code></p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-600">District Official</p>
                    <p><code className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">district_official / admin123</code></p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <TrustBadges currentLanguage={currentLanguage} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full p-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} HealthWatch Northeast. All rights reserved.
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