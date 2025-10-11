// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { AuthProvider } from './contexts/AuthContext';
import ProfessionalNav from './components/ProfessionalNav';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminContent from './pages/AdminContent';
import TrainerDashboard from './pages/TrainerDashboard.jsx';
import LiveChat from './pages/LiveChat';
import './App.css';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <LanguageProvider>
      <PaymentProvider>
        <Router>
          <AuthProvider>
            <div className="app">
              <ProfessionalNav onGetStartedClick={openAuthModal} />
              
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home onGetStartedClick={openAuthModal} />} />
                  <Route path="/courses" element={<Services />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin-content" element={<AdminContent />} />
                  <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
                  <Route path="/chat" element={<LiveChat />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
              
              <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={closeAuthModal} 
              />
            </div>
          </AuthProvider>
        </Router>
      </PaymentProvider>
    </LanguageProvider>
  );
}

export default App;
