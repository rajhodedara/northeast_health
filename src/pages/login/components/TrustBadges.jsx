import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = ({ currentLanguage = 'en', className = '' }) => {
  const translations = {
    en: {
      govCertified: 'Government Certified',
      secureData: 'Secure Data Handling',
      healthAuth: 'Health Authority Approved',
      dataProtection: 'Data Protection Compliant'
    },
    hi: {
      govCertified: 'सरकारी प्रमाणित',
      secureData: 'सुरक्षित डेटा हैंडलिंग',
      healthAuth: 'स्वास्थ्य प्राधिकरण अनुमोदित',
      dataProtection: 'डेटा सुरक्षा अनुपालन'
    },
    as: {
      govCertified: 'চৰকাৰী প্ৰমাণিত',
      secureData: 'সুৰক্ষিত তথ্য পৰিচালনা',
      healthAuth: 'স্বাস্থ্য কৰ্তৃপক্ষ অনুমোদিত',
      dataProtection: 'তথ্য সুৰক্ষা অনুপালন'
    },
    bn: {
      govCertified: 'সরকারি প্রত্যয়িত',
      secureData: 'নিরাপদ ডেটা হ্যান্ডলিং',
      healthAuth: 'স্বাস্থ্য কর্তৃপক্ষ অনুমোদিত',
      dataProtection: 'ডেটা সুরক্ষা সম্মত'
    },
    mni: {
      govCertified: 'সৰকাৰগী প্ৰমাণপত্ৰ',
      secureData: 'নিংথিনা দাতা য়েংবা',
      healthAuth: 'শৰীৰগী মফমগী য়াইফবা',
      dataProtection: 'দাতা নিংথিনা য়েংবা'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const badges = [
    {
      icon: 'Shield',
      text: t?.govCertified,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Lock',
      text: t?.secureData,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Award',
      text: t?.healthAuth,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: 'FileCheck',
      text: t?.dataProtection,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {badges?.map((badge, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 p-3 rounded-lg ${badge?.bgColor} border border-border/50`}
        >
          <Icon name={badge?.icon} size={16} className={badge?.color} />
          <span className={`text-xs font-medium ${badge?.color}`}>
            {badge?.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;