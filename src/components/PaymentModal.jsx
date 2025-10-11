import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const PaymentModal = ({ isOpen, onClose, exam, onSuccess }) => {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select'); // select, processing, success, error

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '📱',
      color: 'bg-yellow-500',
      description: 'Kwishyura ukoresheje MTN MoMo'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      icon: '💳',
      color: 'bg-orange-500',
      description: 'Kwishyura ukoresheje amakarita y\'ubwishyu'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      icon: '📲',
      color: 'bg-red-500',
      description: 'Kwishyura ukoresheje Airtel Money'
    }
  ];

  const handlePayment = async () => {
    if (!phoneNumber && selectedMethod !== 'flutterwave') {
      alert('Nyamuneka andika nimero ya telefoni');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (selectedMethod === 'mtn') {
        await processMTNPayment();
      } else if (selectedMethod === 'flutterwave') {
        await processFlutterwavePayment();
      } else if (selectedMethod === 'airtel') {
        await processAirtelPayment();
      }

      setPaymentStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setPaymentStep('select');
      }, 2000);
    } catch (error) {
      setPaymentStep('error');
      setTimeout(() => {
        setPaymentStep('select');
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const processMTNPayment = async () => {
    // Mock MTN MoMo API integration
    const paymentData = {
      phoneNumber,
      amount: exam.price,
      currency: 'RWF',
      externalId: `exam_${exam.id}_${Date.now()}`,
      description: `Kwishyura ikizamini: ${exam.title}`
    };
    
    console.log('Processing MTN payment:', paymentData);
    // In real implementation, this would call MTN MoMo API
    return { status: 'success', transactionId: 'MTN_' + Date.now() };
  };

  const processFlutterwavePayment = async () => {
    // Mock Flutterwave API integration
    const paymentData = {
      customer: {
        email: user.email,
        name: user.name,
        phone: phoneNumber
      },
      amount: exam.price,
      currency: 'RWF',
      tx_ref: `exam_${exam.id}_${Date.now()}`,
      description: `Payment for exam: ${exam.title}`
    };
    
    console.log('Processing Flutterwave payment:', paymentData);
    // In real implementation, this would initialize Flutterwave payment
    return { status: 'success', transactionId: 'FLW_' + Date.now() };
  };

  const processAirtelPayment = async () => {
    // Mock Airtel Money API integration
    const paymentData = {
      phoneNumber,
      amount: exam.price,
      currency: 'RWF',
      reference: `exam_${exam.id}_${Date.now()}`,
      description: `Payment for exam: ${exam.title}`
    };
    
    console.log('Processing Airtel payment:', paymentData);
    return { status: 'success', transactionId: 'AIRTEL_' + Date.now() };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {paymentStep === 'select' && (
            <>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Kwishyura Ikizamini</h2>
                  <p className="text-gray-600">{exam?.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Exam Details */}
              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Igiciro:</span>
                  <span className="text-xl font-bold text-blue-600">{exam?.price?.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Ibibazo:</span>
                  <span className="font-semibold">{exam?.questions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Igihe:</span>
                  <span className="font-semibold">{exam?.duration} min</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hitamo uburyo bwo kwishyura</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                          {method.icon}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Phone Number Input */}
              {selectedMethod !== 'flutterwave' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nimero ya Telefoni
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || (!phoneNumber && selectedMethod !== 'flutterwave')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? 'Gukora...' : `Ishyura ${exam?.price?.toLocaleString()} RWF`}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Gukanda "Ishyura" byerekana ko wemeye amategeko n'amabwiriza yacu
                </p>
              </div>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gukora Kwishyura...</h3>
              <p className="text-gray-600">Nyamuneka tegereza, turagukoresha kwishyura</p>
              {selectedMethod === 'mtn' && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-2xl">
                  <p className="text-sm text-yellow-800">
                    Reba nimero yawe ya telefoni kugirango wemeze kwishyura
                  </p>
                </div>
              )}
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4"
              >
                ✓
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kwishyura Byagenze Neza!</h3>
              <p className="text-gray-600">Ubu ushobora gutangira ikizamini</p>
            </div>
          )}

          {paymentStep === 'error' && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4"
              >
                ✗
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kwishyura Ntibyakunze</h3>
              <p className="text-gray-600 mb-4">Hari ikibazo cyabaye. Nyamuneka gerageza nanone.</p>
              <button
                onClick={() => setPaymentStep('select')}
                className="bg-blue-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                Gerageza Nanone
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;