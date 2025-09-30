import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ currentLanguage, onLanguageChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', flag: '🇮🇳' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative language-selector ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Globe"
        iconPosition="left"
        className="w-full justify-between bg-surface border-border hover:bg-accent"
      >
        <span className="flex items-center space-x-2">
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="font-medium">{currentLang?.nativeName}</span>
        </span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 animate-fade-in">
          {languages?.map((language) => (
            <button
              key={language?.code}
              onClick={() => handleLanguageSelect(language?.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-accent transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === language?.code ? 'bg-accent text-accent-foreground' : 'text-text-primary'
              }`}
            >
              <span className="text-lg">{language?.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{language?.name}</div>
                <div className="text-sm text-text-secondary">{language?.nativeName}</div>
              </div>
              {currentLanguage === language?.code && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;