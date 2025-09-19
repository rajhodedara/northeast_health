import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInputHelper = ({ currentLanguage, onLanguageChange }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', speechCode: 'hi-IN' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', speechCode: 'as-IN' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' }
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    const speechRecognitionSupported = 
      'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(speechRecognitionSupported);
  }, []);

  const startListening = () => {
    if (!isSupported) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const currentLang = supportedLanguages?.find(lang => lang?.code === currentLanguage);
    recognition.lang = currentLang ? currentLang?.speechCode : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    setIsListening(true);
    setTranscript('');

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event?.resultIndex; i < event?.results?.length; i++) {
        const transcript = event?.results?.[i]?.[0]?.transcript;
        if (event?.results?.[i]?.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
      
      let errorMessage = 'Voice input error occurred.';
      switch (event?.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone not accessible. Please check permissions.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please enable microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = `Voice input error: ${event?.error}`;
      }
      
      alert(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    // The recognition will stop automatically
  };

  if (!isSupported) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="MicOff" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-body font-medium text-text-primary">
              Voice Input Not Available
            </h3>
            <p className="text-xs font-caption text-text-secondary">
              Your browser doesn't support voice input functionality.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Mic" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-body font-medium text-text-primary">
              Voice Input Helper
            </h3>
            <p className="text-xs font-caption text-text-secondary">
              Test voice input functionality
            </p>
          </div>
        </div>

        <Button
          variant={isListening ? "destructive" : "default"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          iconName={isListening ? "MicOff" : "Mic"}
          iconPosition="left"
          className={isListening ? "animate-pulse" : ""}
        >
          {isListening ? 'Stop' : 'Test Voice'}
        </Button>
      </div>
      {/* Language Selection */}
      <div className="mb-4">
        <label className="text-xs font-caption text-text-secondary uppercase tracking-wide mb-2 block">
          Voice Language
        </label>
        <div className="grid grid-cols-2 gap-2">
          {supportedLanguages?.map((language) => (
            <button
              key={language?.code}
              onClick={() => onLanguageChange(language?.code)}
              className={`p-2 rounded-md text-xs font-body text-left transition-colors duration-200 ${
                currentLanguage === language?.code
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="font-medium">{language?.name}</div>
              <div className="opacity-75">{language?.nativeName}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Voice Input Status */}
      {isListening && (
        <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-body text-primary">Listening...</span>
          </div>
          
          {transcript && (
            <div className="text-sm font-body text-text-primary bg-white/50 p-2 rounded border">
              {transcript}
            </div>
          )}
        </div>
      )}
      {/* Instructions */}
      <div className="text-xs font-caption text-text-secondary space-y-1">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={12} />
          <span>Click the microphone button next to any input field to use voice input</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Volume2" size={12} />
          <span>Speak clearly and ensure good microphone access</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Wifi" size={12} />
          <span>Voice recognition requires internet connection</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceInputHelper;