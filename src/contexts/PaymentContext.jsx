import React, { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [hasBasicAccess, setHasBasicAccess] = useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load payment status from localStorage
  useEffect(() => {
    const basicAccess = localStorage.getItem('hasBasicAccess') === 'true';
    const premiumAccess = localStorage.getItem('hasPremiumAccess') === 'true';
    const basicExpiry = localStorage.getItem('basicAccessExpiry');
    const premiumExpiry = localStorage.getItem('premiumAccessExpiry');

    const now = new Date().getTime();

    // Check if basic access is still valid
    if (basicAccess && basicExpiry && now < parseInt(basicExpiry)) {
      setHasBasicAccess(true);
    } else if (basicAccess) {
      // Access expired, remove it
      localStorage.removeItem('hasBasicAccess');
      localStorage.removeItem('basicAccessExpiry');
    }

    // Check if premium access is still valid
    if (premiumAccess && premiumExpiry && now < parseInt(premiumExpiry)) {
      setHasPremiumAccess(true);
      setHasBasicAccess(true); // Premium includes basic
    } else if (premiumAccess) {
      // Access expired, remove it
      localStorage.removeItem('hasPremiumAccess');
      localStorage.removeItem('premiumAccessExpiry');
    }
  }, []);

  const purchaseBasicAccess = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month access
      
      localStorage.setItem('hasBasicAccess', 'true');
      localStorage.setItem('basicAccessExpiry', expiryDate.getTime().toString());
      
      setHasBasicAccess(true);
      
      return { success: true, message: 'Basic access purchased successfully! Access valid for 1 month.' };
    } catch (error) {
      return { success: false, message: 'Payment failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const purchasePremiumAccess = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month access
      
      localStorage.setItem('hasPremiumAccess', 'true');
      localStorage.setItem('premiumAccessExpiry', expiryDate.getTime().toString());
      localStorage.setItem('hasBasicAccess', 'true'); // Premium includes basic
      localStorage.setItem('basicAccessExpiry', expiryDate.getTime().toString());
      
      setHasPremiumAccess(true);
      setHasBasicAccess(true);
      
      return { success: true, message: 'Premium access purchased successfully! Access valid for 1 month.' };
    } catch (error) {
      return { success: false, message: 'Payment failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Check and handle expired access
  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date().getTime();
      
      // Check basic access expiry
      const basicExpiry = localStorage.getItem('basicAccessExpiry');
      if (basicExpiry && now > parseInt(basicExpiry)) {
        localStorage.removeItem('hasBasicAccess');
        localStorage.removeItem('basicAccessExpiry');
        setHasBasicAccess(false);
      }
      
      // Check premium access expiry
      const premiumExpiry = localStorage.getItem('premiumAccessExpiry');
      if (premiumExpiry && now > parseInt(premiumExpiry)) {
        localStorage.removeItem('hasPremiumAccess');
        localStorage.removeItem('premiumAccessExpiry');
        setHasPremiumAccess(false);
      }
    };
    
    // Check on mount and then every minute
    checkExpiry();
    const interval = setInterval(checkExpiry, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const checkAccess = (contentType) => {
    switch (contentType) {
      case 'theory':
        return hasBasicAccess || hasPremiumAccess;
      case 'exams':
      case 'videos':
        return hasPremiumAccess;
      default:
        return false;
    }
  };

  const getRemainingDays = (accessType) => {
    const storageKey = accessType === 'premium' ? 'premiumAccessExpiry' : 'basicAccessExpiry';
    const expiry = localStorage.getItem(storageKey);
    
    if (!expiry) return 0;
    
    const now = new Date().getTime();
    const expiryTime = parseInt(expiry);
    const diffTime = expiryTime - now;
    
    if (diffTime <= 0) return 0;
    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const value = {
    hasBasicAccess,
    hasPremiumAccess,
    isLoading,
    purchaseBasicAccess,
    purchasePremiumAccess,
    checkAccess,
    getRemainingDays
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};