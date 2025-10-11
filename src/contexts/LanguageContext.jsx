import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('rw');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'fr', 'rw'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      setCurrentLanguage('rw'); // Default to Kinyarwanda
    }
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};