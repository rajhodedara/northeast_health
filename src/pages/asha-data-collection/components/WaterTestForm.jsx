import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WaterTestForm = ({ onSubmit, onSaveDraft, isOffline, currentLanguage }) => {
  const [formData, setFormData] = useState({
    testId: '',
    sampleLocation: '',
    waterSource: '',
    testDate: new Date()?.toISOString()?.split('T')?.[0],
    testTime: new Date()?.toTimeString()?.slice(0, 5),
    ph: '',
    turbidity: '',
    chlorine: '',
    ecoli: '',
    coliform: '',
    temperature: '',
    conductivity: '',
    location: null,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const waterSourceOptions = [
    { value: 'tube_well', label: 'Tube Well' },
    { value: 'hand_pump', label: 'Hand Pump' },
    { value: 'open_well', label: 'Open Well' },
    { value: 'river', label: 'River' },
    { value: 'pond', label: 'Pond' },
    { value: 'spring', label: 'Spring' },
    { value: 'tap_water', label: 'Tap Water' },
    { value: 'other', label: 'Other' }
  ];

  const ecoliOptions = [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
    { value: 'not_tested', label: 'Not Tested' }
  ];

  const coliformOptions = [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
    { value: 'not_tested', label: 'Not Tested' }
  ];

  useEffect(() => {
    loadDraftData();
    generateTestId();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      saveDraftToStorage();
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  const generateTestId = () => {
    const timestamp = Date.now();
    const testId = `WT${timestamp?.toString()?.slice(-8)}`;
    setFormData(prev => ({ ...prev, testId }));
  };

  const loadDraftData = () => {
    try {
      const draftData = localStorage.getItem('waterTestDraft');
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
      localStorage.setItem('waterTestDraft', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving draft data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
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

    if (!formData?.sampleLocation?.trim()) {
      newErrors.sampleLocation = 'Sample location is required';
    }
    if (!formData?.waterSource) {
      newErrors.waterSource = 'Please select water source type';
    }
    if (!formData?.testDate) {
      newErrors.testDate = 'Test date is required';
    }
    if (!formData?.testTime) {
      newErrors.testTime = 'Test time is required';
    }
    if (!formData?.location) {
      newErrors.location = 'Location is required. Please capture GPS location.';
    }
    if (formData?.ph && (parseFloat(formData?.ph) < 0 || parseFloat(formData?.ph) > 14)) {
      newErrors.ph = 'pH value must be between 0 and 14';
    }
    if (formData?.temperature && (parseFloat(formData?.temperature) < -10 || parseFloat(formData?.temperature) > 100)) {
      newErrors.temperature = 'Temperature must be between -10°C and 100°C';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        id: `water_test_${Date.now()}`,
        submittedAt: new Date()?.toISOString(),
        submittedBy: 'asha_worker',
        syncStatus: isOffline ? 'pending' : 'synced'
      };

      await onSubmit(submissionData);

      setFormData({
        testId: '',
        sampleLocation: '',
        waterSource: '',
        testDate: new Date()?.toISOString()?.split('T')?.[0],
        testTime: new Date()?.toTimeString()?.slice(0, 5),
        ph: '',
        turbidity: '',
        chlorine: '',
        ecoli: '',
        coliform: '',
        temperature: '',
        conductivity: '',
        location: null,
        notes: ''
      });

      generateTestId();
      localStorage.removeItem('waterTestDraft');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    saveDraftToStorage();
    onSaveDraft(formData);
    alert('Draft saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Droplets" size={24} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100">
              Water Test Results
            </h2>
            <p className="text-sm font-caption text-gray-600 dark:text-gray-400">
              Record water quality test parameters and results
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Test Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-gray-100">
            Test Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Test Id</span>}
              type="text"
              value={formData?.testId}
              disabled
              description="Auto-generated test identifier"
              className="text-gray-900 dark:text-gray-100"
            />

            <div className="relative">
              <Input
                label={<span className="text-gray-700 dark:text-gray-200">Sample Location</span>}
                type="text"
                placeholder="Enter specific location of water sample"
                value={formData?.sampleLocation}
                onChange={(e) => handleInputChange('sampleLocation', e?.target?.value)}
                error={errors?.sampleLocation}
                required
                className="text-gray-900 dark:text-gray-100"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => startVoiceInput('sampleLocation')}
                iconName="Mic"
                className={`absolute right-2 top-8 ${isListening && activeVoiceField === 'sampleLocation' ? 'text-red-500 animate-pulse' : ''}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label={<span className="text-gray-700 dark:text-gray-200">Water Source Type</span>}
              options={waterSourceOptions}
              value={formData?.waterSource}
              onChange={(value) => handleInputChange('waterSource', value)}
              error={errors?.waterSource}
              required
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Test Date</span>}
              type="date"
              value={formData?.testDate}
              onChange={(e) => handleInputChange('testDate', e?.target?.value)}
              error={errors?.testDate}
              required
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Test Time</span>}
              type="time"
              value={formData?.testTime}
              onChange={(e) => handleInputChange('testTime', e?.target?.value)}
              error={errors?.testTime}
              required
              className="text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Water Quality Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-gray-100">
            Water Quality Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">pH Level</span>}
              type="number"
              placeholder="7.0"
              value={formData?.ph}
              onChange={(e) => handleInputChange('ph', e?.target?.value)}
              error={errors?.ph}
              step="0.1"
              min="0"
              max="14"
              description="Range: 0-14"
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Turbidity (NTU)</span>}
              type="number"
              placeholder="5.0"
              value={formData?.turbidity}
              onChange={(e) => handleInputChange('turbidity', e?.target?.value)}
              step="0.1"
              min="0"
              description="Nephelometric Turbidity Units"
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Free Chlorine (mg/L)</span>}
              type="number"
              placeholder="0.5"
              value={formData?.chlorine}
              onChange={(e) => handleInputChange('chlorine', e?.target?.value)}
              step="0.01"
              min="0"
              description="Milligrams per liter"
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Temperature (°C)</span>}
              type="number"
              placeholder="25"
              value={formData?.temperature}
              onChange={(e) => handleInputChange('temperature', e?.target?.value)}
              error={errors?.temperature}
              step="0.1"
              description="Celsius"
              className="text-gray-900 dark:text-gray-100"
            />

            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Conductivity (μS/cm)</span>}
              type="number"
              placeholder="500"
              value={formData?.conductivity}
              onChange={(e) => handleInputChange('conductivity', e?.target?.value)}
              step="1"
              min="0"
              description="Microsiemens per cm"
              className="text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Bacterial Tests */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-gray-100">
            Bacterial Contamination
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={<span className="text-gray-700 dark:text-gray-200">E. coli</span>}
              options={ecoliOptions}
              value={formData?.ecoli}
              onChange={(value) => handleInputChange('ecoli', value)}
              description="Escherichia coli presence"
              className="text-gray-900 dark:text-gray-100"
            />

            <Select
              label={<span className="text-gray-700 dark:text-gray-200">Total Coliform</span>}
              options={coliformOptions}
              value={formData?.coliform}
              onChange={(value) => handleInputChange('coliform', value)}
              description="Coliform bacteria presence"
              className="text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Location Capture */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-gray-100">
            GPS Location
          </h3>

          <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
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
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-caption">
                  Location captured: {formData?.location?.latitude?.toFixed(6)}, {formData?.location?.longitude?.toFixed(6)}
                </span>
              </div>
            )}

            {errors?.location && (
              <span className="text-sm text-red-500">{errors?.location}</span>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              label={<span className="text-gray-700 dark:text-gray-200">Additional Notes</span>}
              type="text"
              placeholder="Any additional observations or comments"
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              description="Optional field for additional observations"
              className="text-gray-900 dark:text-gray-100"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('notes')}
              iconName="Mic"
              className={`absolute right-2 top-8 ${isListening && activeVoiceField === 'notes' ? 'text-red-500 animate-pulse' : ''}`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            iconName="Save"
            iconPosition="left"
            className="flex-1 text-gray-900 dark:text-gray-100"
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
            {isOffline ? 'Queue for Sync' : 'Submit Test Results'}
          </Button>
        </div>

               {isOffline && (
                 <div className="flex items-center space-x-2 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-md">
                   <Icon name="WifiOff" size={16} />
                   <span className="text-sm font-caption">
                     You are offline. Data will be synced once connection is restored.
                   </span>
                 </div>
               )}
             </form>
           </div>
         );
       };

       export default WaterTestForm;

