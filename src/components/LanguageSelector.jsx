import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', nativeName: 'Kinyarwanda' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:block font-medium">{currentLang.nativeName}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
        >
          ▼
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 z-10 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2 min-w-[200px] z-20"
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;