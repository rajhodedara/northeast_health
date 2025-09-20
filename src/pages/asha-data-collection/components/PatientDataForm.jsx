import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
// --- ADD THESE TWO LINES ---
const NPOINT_URL = 'https://api.npoint.io/09942530f105bf8e8e2b';
// --------------------------

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

  useEffect(() => {
    // Load draft from IndexedDB on component mount
    loadDraftData();
  }, []);

  useEffect(() => {
    // Auto-save draft every 30 seconds
    const interval = setInterval(() => {
      saveDraftToStorage();
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  const loadDraftData = () => {
    try {
      const draftData = localStorage.getItem('patientDataDraft');
      if (draftData) {
        const parsed = JSON.parse(draftData);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('Error loading draft data:', error);
    }
  };

  const saveDraftToStorage = () => {
    try {
      localStorage.setItem('patientDataDraft', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving draft data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSymptomToggle = (symptomId) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev?.symptoms?.includes(symptomId)
        ? prev?.symptoms?.filter(id => id !== symptomId)
        : [...prev?.symptoms, symptomId]
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              timestamp: new Date()?.toISOString()
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please ensure location services are enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const startVoiceInput = (fieldName) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 
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

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition?.start();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Patient name is required';
    }

    if (!formData?.age || formData?.age < 1 || formData?.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (!formData?.gender) {
      newErrors.gender = 'Please select gender';
    }

    if (!formData?.contactNumber?.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/?.test(formData?.contactNumber?.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData?.symptoms?.length === 0) {
      newErrors.symptoms = 'Please select at least one symptom';
    }

    if (!formData?.location) {
      newErrors.location = 'Location is required. Please capture GPS location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // ... (rest of your component code above handleSubmit) ...

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    // 1. First, GET the current data from npoint
    const getResponse = await fetch(NPOINT_URL);
    if (!getResponse.ok) {
        throw new Error('Failed to fetch existing data from npoint.');
    }
    let records = await getResponse.json();
    
    // Ensure records is an array
    if (!Array.isArray(records)) {
        records = [];
    }
    
    // 2. Add your new form data to the array
    // (This includes your mock AI and villageId logic from before)
    const submissionData = {
      ...formData,
      id: `patient_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    
    let dynamicSimulatedRisk = 'Low';
    const hasWaterborneSymptoms = submissionData.symptoms.includes('diarrhea') || submissionData.symptoms.includes('vomiting');
    if (hasWaterborneSymptoms) {
        dynamicSimulatedRisk = Math.random() < 0.7 ? 'High' : 'Medium';
    }
    
    const mockVillageIds = ['village_1', 'village_2', 'village_3', 'village_4', 'village_5'];
    const randomVillageIndex = Math.floor(Math.random() * mockVillageIds.length);

    records.push({
      ...submissionData,
      predictedRisk: dynamicSimulatedRisk,
      villageId: mockVillageIds[randomVillageIndex]
    });

    // 3. POST the ENTIRE updated array back to npoint
    const postResponse = await fetch(NPOINT_URL, {
      method: 'POST', // npoint uses POST to update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(records)
    });

    if (!postResponse.ok) {
      throw new Error('Failed to submit data to npoint.');
    }

    alert('Data submitted successfully!');

    // 4. Clear the form
    setFormData({
      patientId: '', name: '', age: '', gender: '', contactNumber: '',
      address: '', symptoms: [], temperature: '', bloodPressure: '',
      pulseRate: '', location: null,
      visitDate: new Date().toISOString().split('T')[0]
    });
    localStorage.removeItem('patientDataDraft');

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred. Please check the console.');
  } finally {
    setIsSubmitting(false);
  }
};


// ... (rest of your component code below handleSubmit) ...

  const handleSaveDraft = () => {
    saveDraftToStorage();
    onSaveDraft(formData);
    alert('Draft saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Patient Syndromic Data
            </h2>
            <p className="text-sm font-caption text-text-secondary">
              Record patient symptoms and basic health information
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                label="Patient Name"
                type="text"
                placeholder="Enter patient's full name"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => startVoiceInput('name')}
                iconName="Mic"
                className={`absolute right-2 top-8 ${
                  isListening && activeVoiceField === 'name' ? 'text-red-500 animate-pulse' : ''
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Age"
                type="number"
                placeholder="Age"
                value={formData?.age}
                onChange={(e) => handleInputChange('age', e?.target?.value)}
                error={errors?.age}
                min="1"
                max="120"
                required
              />
              
              <Select
                label="Gender"
                options={genderOptions}
                value={formData?.gender}
                onChange={(value) => handleInputChange('gender', value)}
                error={errors?.gender}
                required
              />
            </div>
          </div>

          <div className="relative">
            <Input
              label="Contact Number"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData?.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
              error={errors?.contactNumber}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('contactNumber')}
              iconName="Mic"
              className={`absolute right-2 top-8 ${
                isListening && activeVoiceField === 'contactNumber' ? 'text-red-500 animate-pulse' : ''
              }`}
            />
          </div>

          <div className="relative">
            <Input
              label="Address"
              type="text"
              placeholder="Enter patient's address"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('address')}
              iconName="Mic"
              className={`absolute right-2 top-8 ${
                isListening && activeVoiceField === 'address' ? 'text-red-500 animate-pulse' : ''
              }`}
            />
          </div>
        </div>

        {/* Symptoms Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Symptoms
            </h3>
            {errors?.symptoms && (
              <span className="text-sm text-error">{errors?.symptoms}</span>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {symptoms?.map((symptom) => (
              <div
                key={symptom?.id}
                onClick={() => handleSymptomToggle(symptom?.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  formData?.symptoms?.includes(symptom?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    name={symptom?.icon} 
                    size={32} 
                    className={`${symptom?.color} ${
                      formData?.symptoms?.includes(symptom?.id) ? 'scale-110' : ''
                    } transition-transform duration-200`}
                  />
                  <span className="text-sm font-body text-center text-text-primary">
                    {symptom?.label}
                  </span>
                  {formData?.symptoms?.includes(symptom?.id) && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Vital Signs (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Temperature (°F)"
              type="number"
              placeholder="98.6"
              value={formData?.temperature}
              onChange={(e) => handleInputChange('temperature', e?.target?.value)}
              step="0.1"
            />
            
            <Input
              label="Blood Pressure"
              type="text"
              placeholder="120/80"
              value={formData?.bloodPressure}
              onChange={(e) => handleInputChange('bloodPressure', e?.target?.value)}
            />
            
            <Input
              label="Pulse Rate (bpm)"
              type="number"
              placeholder="72"
              value={formData?.pulseRate}
              onChange={(e) => handleInputChange('pulseRate', e?.target?.value)}
            />
          </div>
        </div>

        {/* Location Capture */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Location Information
          </h3>
          
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
              iconName="MapPin"
              iconPosition="left"
            >
              Capture GPS Location
            </Button>
            
            {formData?.location && (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-caption">
                  Location captured: {formData?.location?.latitude?.toFixed(6)}, {formData?.location?.longitude?.toFixed(6)}
                </span>
              </div>
            )}
            
            {errors?.location && (
              <span className="text-sm text-error">{errors?.location}</span>
            )}
          </div>
        </div>

        {/* Visit Date */}
        <div className="space-y-4">
          <Input
            label="Visit Date"
            type="date"
            value={formData?.visitDate}
            onChange={(e) => handleInputChange('visitDate', e?.target?.value)}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save Draft
          </Button>
          
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            {isOffline ? 'Queue for Sync' : 'Submit Data'}
          </Button>
        </div>

        {isOffline && (
          <div className="flex items-center space-x-2 p-3 bg-warning/10 text-warning rounded-md">
            <Icon name="WifiOff" size={16} />
            <span className="text-sm font-caption">
              You're offline. Data will be queued and synced when connection is restored.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientDataForm;