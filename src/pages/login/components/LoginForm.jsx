import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ 
  onSubmit, 
  isLoading = false, 
  error = '', 
  currentLanguage = 'en',
  onVoiceInput 
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isListening, setIsListening] = useState({ username: false, password: false });

  const translations = {
    en: {
      title: 'Welcome to HealthWatch Northeast',
      subtitle: 'Secure access for health surveillance',
      username: 'Username / Phone Number',
      usernamePlaceholder: 'Enter Username',
      password: 'Password',
      passwordPlaceholder: 'Enter Password',
      login: 'Sign In',
      forgotPassword: 'Forgot Password?',
      voiceInput: 'Voice Input',
      listening: 'Listening...',
      offlineNote: 'Offline login available with cached credentials'
    },
    hi: {
      title: 'हेल्थवॉच नॉर्थईस्ट में आपका स्वागत है',
      subtitle: 'स्वास्थ्य निगरानी के लिए सुरक्षित पहुंच',
      username: 'उपयोगकर्ता नाम / फोन नंबर',
      usernamePlaceholder: 'अपना उपयोगकर्ता नाम या फोन दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      login: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      voiceInput: 'आवाज इनपुट',
      listening: 'सुन रहा है...',
      offlineNote: 'कैश्ड क्रेडेंशियल्स के साथ ऑफ़लाइन लॉगिन उपलब्ध'
    },
    as: {
      title: 'হেল্থৱাচ নৰ্থইষ্টলৈ আপোনাক স্বাগতম',
      subtitle: 'স্বাস্থ্য নিৰীক্ষণৰ বাবে সুৰক্ষিত প্ৰৱেশ',
      username: 'ব্যৱহাৰকাৰীৰ নাম / ফোন নম্বৰ',
      usernamePlaceholder: 'আপোনাৰ ব্যৱহাৰকাৰীৰ নাম বা ফোন দিয়ক',
      password: 'পাছৱৰ্ড',
      passwordPlaceholder: 'আপোনাৰ পাছৱৰ্ড দিয়ক',
      login: 'ছাইন ইন কৰক',
      forgotPassword: 'পাছৱৰ্ড পাহৰিছে?',
      voiceInput: 'কণ্ঠস্বৰ ইনপুট',
      listening: 'শুনি আছে...',
      offlineNote: 'কেশ্বড ক্ৰেডেনচিয়েলৰ সৈতে অফলাইন লগইন উপলব্ধ'
    },
    bn: {
      title: 'হেলথওয়াচ নর্থইস্টে আপনাকে স্বাগতম',
      subtitle: 'স্বাস্থ্য নিরীক্ষণের জন্য নিরাপদ প্রবেশ',
      username: 'ব্যবহারকারীর নাম / ফোন নম্বর',
      usernamePlaceholder: 'আপনার ব্যবহারকারীর নাম বা ফোন দিন',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড দিন',
      login: 'সাইন ইন করুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      voiceInput: 'ভয়েস ইনপুট',
      listening: 'শুনছে...',
      offlineNote: 'ক্যাশড ক্রেডেনশিয়াল দিয়ে অফলাইন লগইন উপলব্ধ'
    },
    mni: {
      title: 'হেল্থৱাচ নৰ্থইষ্টদা তাৰাং পাওজেল',
      subtitle: 'শৰীৰগী চেংনবা য়েংবগীদমক নিংথিনা চংখল',
      username: 'শিজিন্নৰিবগী মিং / ফোন নম্বৰ',
      usernamePlaceholder: 'নহাকগী শিজিন্নৰিবগী মিং নত্ত্ৰগা ফোন হাল্লু',
      password: 'পাশৱৰ্দ',
      passwordPlaceholder: 'নহাকগী পাশৱৰ্দ হাল্লু',
      login: 'চংখল',
      forgotPassword: 'পাশৱৰ্দ মৰং খ্ৰে?',
      voiceInput: 'খোংজেল ইনপুত',
      listening: 'তাজৰি...',
      offlineNote: 'কেশ তৌৰবা ক্ৰেদেনশিয়েলশিংগা লোইননা অফলাইন লগইন য়াই'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVoiceInput = async (field) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = currentLanguage === 'en' ? 'en-US' : 
                     currentLanguage === 'hi' ? 'hi-IN' :
                     currentLanguage === 'as' ? 'as-IN' :
                     currentLanguage === 'bn' ? 'bn-IN' : 'en-US';
    
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(prev => ({ ...prev, [field]: true }));

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      handleInputChange(field, transcript);
      setIsListening(prev => ({ ...prev, [field]: false }));
    };

    recognition.onerror = () => {
      setIsListening(prev => ({ ...prev, [field]: false }));
    };

    recognition.onend = () => {
      setIsListening(prev => ({ ...prev, [field]: false }));
    };

    recognition?.start();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
          <Icon name="Activity" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          {t?.title}
        </h1>
        <p className="text-text-secondary">
          {t?.subtitle}
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <Input
            label={t?.username}
            type="text"
            placeholder={t?.usernamePlaceholder}
            value={formData?.username}
            onChange={(e) => handleInputChange('username', e?.target?.value)}
            required
            className="text-lg"
          />
          <div classname = "text-text-secondary">(Note: asha_worker/district_official) </div>
{/*           <Button */}
{/*             type="button" */}
{/*             variant="ghost" */}
{/*             size="sm" */}
{/*             onClick={() => handleVoiceInput('username')} */}
{/*             iconName={isListening?.username ? "Mic" : "MicOff"} */}
{/*             iconPosition="left" */}
{/*             disabled={isListening?.username} */}
{/*             className="w-full justify-center" */}
{/*           > */}
{/*             {isListening?.username ? t?.listening : t?.voiceInput} */}
{/*           </Button> */}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label={t?.password}
              type={showPassword ? "text" : "password"}
              placeholder={t?.passwordPlaceholder}
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              required
              className="text-lg pr-12"
            />
            <div classname = "text-text-secondary">(Note: health123/ admin123) </div>
          </div>
{/*           <Button */}
{/*             type="button" */}
{/*             variant="ghost" */}
{/*             size="sm" */}
{/*             onClick={() => handleVoiceInput('password')} */}
{/*             iconName={isListening?.password ? "Mic" : "MicOff"} */}
{/*             iconPosition="left" */}
{/*             disabled={isListening?.password} */}
{/*             className="w-full justify-center" */}
{/*           > */}
{/*             {isListening?.password ? t?.listening : t?.voiceInput} */}
{/*           </Button> */}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="right"
          className="text-lg py-4"
        >
          {t?.login}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            {t?.forgotPassword}
          </button>
        </div>

        {/* Offline Note */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            {t?.offlineNote}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;