import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

// --- USE NPOINT AS STORAGE ---
const NPOINT_URL = 'https://api.npoint.io/09942530f105bf8e8e2b';

const PatientDataForm = ({ onSubmit, onSaveDraft, isOffline, currentLanguage }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    symptoms: [],
    temperature: '',
    bloodPressure: '',
    pulseRate: '',
    location: null,
    visitDate: new Date()?.toISOString()?.split('T')?.[0]
  });

  const [errors, setErrors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const symptoms = [
    { id: 'fever', label: 'Fever', icon: 'Thermometer', color: 'text-red-500' },
    { id: 'diarrhea', label: 'Diarrhea', icon: 'Droplets', color: 'text-blue-500' },
    { id: 'vomiting', label: 'Vomiting', icon: 'AlertCircle', color: 'text-orange-500' },
    { id: 'abdominal_pain', label: 'Abdominal Pain', icon: 'Circle', color: 'text-purple-500' },
    { id: 'dehydration', label: 'Dehydration', icon: 'Zap', color: 'text-yellow-500' },
    { id: 'headache', label: 'Headache', icon: 'Brain', color: 'text-pink-500' },
    { id: 'nausea', label: 'Nausea', icon: 'Frown', color: 'text-green-500' },
    { id: 'fatigue', label: 'Fatigue', icon: 'Battery', color: 'text-gray-500' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  // --- Load & auto-save draft ---
  useEffect(() => {
    try {
      const draftData = localStorage.getItem('patientDataDraft');
      if (draftData) {
        const parsed = JSON.parse(draftData);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem('patientDataDraft', JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSymptomToggle = (symptomId) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(id => id !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData(prev => ({
            ...prev,
            location: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              timestamp: new Date().toISOString()
            }
          }));
        },
        (err) => {
          console.error('GPS error:', err);
          alert('Unable to get location. Enable GPS.');
        }
      );
    } else {
      alert('Geolocation not supported.');
    }
  };

  const startVoiceInput = (fieldName) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang =
      currentLanguage === 'hi' ? 'hi-IN' :
        currentLanguage === 'as' ? 'as-IN' :
          currentLanguage === 'bn' ? 'bn-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    setActiveVoiceField(fieldName);

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      handleInputChange(fieldName, transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };
    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition.start();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Patient name is required';
    if (!formData?.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Valid age required';
    if (!formData?.gender) newErrors.gender = 'Gender required';
    if (!formData?.contactNumber?.trim() || !/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, '')))
      newErrors.contactNumber = '10-digit number required';
    if (!formData?.address?.trim()) newErrors.address = 'Address required';
    if (formData.symptoms.length === 0) newErrors.symptoms = 'Select at least one symptom';
    if (!formData?.location) newErrors.location = 'Capture GPS location';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMIT (UPDATED to NPOINT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const getResponse = await fetch(NPOINT_URL);
      let records = await getResponse.json();
      if (!Array.isArray(records)) records = [];

      const submissionData = {
        ...formData,
        id: `patient_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        type: 'syndromic'
      };

      let dynamicRisk = 'Low';
      if (submissionData.symptoms.includes('diarrhea') || submissionData.symptoms.includes('vomiting')) {
        dynamicRisk = Math.random() < 0.7 ? 'High' : 'Medium';
      }

      const mockVillageIds = ['village_1', 'village_2', 'village_3', 'village_4', 'village_5'];
      const randomVillageIndex = Math.floor(Math.random() * mockVillageIds.length);

      records.push({
        ...submissionData,
        predictedRisk: dynamicRisk,
        villageId: mockVillageIds[randomVillageIndex],
      });

      const postResponse = await fetch(NPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(records)
      });
      if (!postResponse.ok) throw new Error('Failed to submit to npoint');

      alert('Data submitted successfully!');
      window.dispatchEvent(new Event("patientData:updated"));
      localStorage.removeItem('patientDataDraft');

      setFormData({
        patientId: '',
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        symptoms: [],
        temperature: '',
        bloodPressure: '',
        pulseRate: '',
        location: null,
        visitDate: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error submitting form. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('patientDataDraft', JSON.stringify(formData));
    onSaveDraft?.(formData);
    alert('Draft saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm text-gray-900 dark:text-gray-100">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold">Patient Syndromic Data</h2>
            <p className="text-sm font-caption text-gray-500 dark:text-gray-300">
              Record patient symptoms and basic health information
            </p>
          </div>
        </div>
      </div>

      {/* --- FORM START --- */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-700 dark:text-gray-200">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Patient Name + Voice */}
            <div className="relative">
              <Input
                label={<span className="text-gray-700 dark:text-gray-200">Patient Name</span>}
                type="text"
                className="text-gray-900 dark:text-gray-100"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors?.name}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => startVoiceInput('name')}
                iconName="Mic"
                className={`absolute right-2 top-8 ${isListening && activeVoiceField === 'name' ? 'text-red-500 animate-pulse' : ''}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input
                label={<span className="text-gray-700 dark:text-gray-200">Age</span>}
                type="number"
                className="text-gray-900 dark:text-gray-100"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                error={errors?.age}
                min="1"
                max="120"
                required
              />
              <Select
                label={<span className="text-gray-700 dark:text-gray-200">Gender</span>}
                options={genderOptions}
                value={formData.gender}
                onChange={(val) => handleInputChange('gender', val)}
                error={errors?.gender}
                required
                className="text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="relative">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Contact Number</span>}
              type="tel"
              className="text-gray-900 dark:text-gray-100"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              error={errors?.contactNumber}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('contactNumber')}
              iconName="Mic"
              className={`absolute right-2 top-8 ${isListening && activeVoiceField === 'contactNumber' ? 'text-red-500 animate-pulse' : ''}`}
            />
          </div>

          {/* Address */}
          <div className="relative">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Address</span>}
              type="text"
              className="text-gray-900 dark:text-gray-100"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={errors?.address}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('address')}
              iconName="Mic"
              className={`absolute right-2 top-8 ${isListening && activeVoiceField === 'address' ? 'text-red-500 animate-pulse' : ''}`}
            />
          </div>
        </div>

        {/* Symptoms Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-medium text-gray-700 dark:text-gray-200">Symptoms</h3>
            {errors?.symptoms && <span className="text-sm text-error">{errors.symptoms}</span>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {symptoms.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSymptomToggle(s.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer ${formData.symptoms.includes(s.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                  }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon
                    name={s.icon}
                    size={32}
                    className={`${s.color} ${formData.symptoms.includes(s.id) ? 'scale-110' : ''
                      } transition-transform duration-200`}
                  />
                  <span className="text-sm text-gray-900 dark:text-gray-100">{s.label}</span>
                  {formData.symptoms.includes(s.id) && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-700 dark:text-gray-200">Vital Signs (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Temperature (°F)</span>}
              type="number"
              className="text-gray-900 dark:text-gray-100"
              value={formData.temperature}
              onChange={(e) => handleInputChange('temperature', e.target.value)}
              step="0.1"
            />
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Blood Pressure</span>}
              type="text"
              className="text-gray-900 dark:text-gray-100"
              value={formData.bloodPressure}
              onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
            />
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Pulse Rate (bpm)</span>}
              type="number"
              className="text-gray-900 dark:text-gray-100"
              value={formData.pulseRate}
              onChange={(e) => handleInputChange('pulseRate', e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-700 dark:text-gray-200">Location Information</h3>
          <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
            <Button type="button" variant="outline" onClick={getCurrentLocation} iconName="MapPin" iconPosition="left">
              Capture GPS Location
            </Button>
            {formData.location && (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">
                  {formData.location.latitude.toFixed(6)}, {formData.location.longitude.toFixed(6)}
                </span>
              </div>
            )}
            {errors?.location && <span className="text-sm text-error">{errors.location}</span>}
          </div>
        </div>

        {/* Visit Date */}
        <div className="space-y-4">
          <Input
            label={<span className="text-gray-700 dark:text-gray-200">Visit Date</span>}
            type="date"
            className="text-gray-900 dark:text-gray-100"
            value={formData.visitDate}
            onChange={(e) => handleInputChange('visitDate', e.target.value)}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={handleSaveDraft} iconName="Save" iconPosition="left" className="flex-1">
            Save Draft
          </Button>
          <Button type="submit" variant="default" loading={isSubmitting} iconName="Send" iconPosition="left" className="flex-1">
            {isOffline ? 'Queue for Sync' : 'Submit Data'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientDataForm;
