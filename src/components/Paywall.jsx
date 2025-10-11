import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, X } from 'lucide-react';
import { usePayment } from '../contexts/PaymentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { coursePricing } from '../data/drivingContent';

const Paywall = ({ 
  contentType, 
  children, 
  title, 
  description,
  showPreview = false 
}) => {
  const { checkAccess, purchaseBasicAccess, purchasePremiumAccess, isLoading } = usePayment();
  const { currentLanguage } = useLanguage();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(null);

  const hasAccess = checkAccess(contentType);

  const getLocalizedText = (obj, key) => {
    const langKey = currentLanguage === 'rw' ? `${key}Rw` : currentLanguage === 'fr' ? `${key}Fr` : key;
    return obj[langKey] || obj[key];
  };

  const handlePurchase = async (planType) => {
    const result = planType === 'basic' 
      ? await purchaseBasicAccess() 
      : await purchasePremiumAccess();
    
    setPurchaseResult(result);
    
    if (result.success) {
      setTimeout(() => {
        setShowPricingModal(false);
        setPurchaseResult(null);
      }, 2000);
    }
  };

  if (hasAccess) {
    return children;
  }

  return (
    <div className="relative">
      {/* Preview Content (blurred) */}
      {showPreview && (
        <div className="relative">
          <div className="filter blur-sm pointer-events-none select-none">
            {children}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white"></div>
        </div>
      )}

      {/* Paywall Overlay */}
      <motion.div
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {title || 'Unlock Premium Content'}
        </h3>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {description || 'Get full access to our comprehensive driving course materials.'}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Interactive lessons and quizzes</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Video tutorials from experts</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Progress tracking & certificates</span>
          </div>
        </div>

        <motion.button
          onClick={() => setShowPricingModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Pricing Options
        </motion.button>
      </motion.div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricingModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPricingModal(false)}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                  <p className="text-xl text-gray-600">
                    Start your driving journey with the plan that suits you best
                  </p>
                </div>

                {/* Success/Error Message */}
                {purchaseResult && (
                  <motion.div
                    className={`mb-6 p-4 rounded-2xl ${
                      purchaseResult.success 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full mr-3 ${
                        purchaseResult.success ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {purchaseResult.success && (
                          <CheckCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <p className={`font-semibold ${
                        purchaseResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {purchaseResult.message}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Plan */}
                  <motion.div
                    className="relative p-8 rounded-3xl border-2 border-gray-200 bg-white/50 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {getLocalizedText(coursePricing.basic, 'name')}
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 mb-4">
                      {coursePricing.basic.price.toLocaleString()} {coursePricing.basic.currency}
                    </div>
                    <p className="text-gray-600 mb-6">
                      {getLocalizedText(coursePricing.basic, 'description')}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {getLocalizedText(coursePricing.basic, 'features').map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handlePurchase('basic')}
                      disabled={isLoading}
                      className="w-full py-3 rounded-2xl font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Choose Basic'}
                    </button>
                  </motion.div>

                  {/* Premium Plan */}
                  <motion.div
                    className="relative p-8 rounded-3xl border-2 border-blue-500 bg-blue-50/50 shadow-lg scale-105"
                    whileHover={{ scale: 1.07 }}
                  >
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {getLocalizedText(coursePricing.premium, 'name')}
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 mb-4">
                      {coursePricing.premium.price.toLocaleString()} {coursePricing.premium.currency}
                    </div>
                    <p className="text-gray-600 mb-6">
                      {getLocalizedText(coursePricing.premium, 'description')}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {getLocalizedText(coursePricing.premium, 'features').map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handlePurchase('premium')}
                      disabled={isLoading}
                      className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Choose Premium'}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Paywall;