import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate newsletter subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const quickLinks = [
    { name: getTranslation(currentLanguage, 'nav.home'), path: '/' },
    { name: getTranslation(currentLanguage, 'nav.courses'), path: '/courses' },
    { name: getTranslation(currentLanguage, 'nav.about'), path: '/about' },
    { name: getTranslation(currentLanguage, 'nav.contact'), path: '/contact' }
  ];

  const courses = [
    { name: getTranslation(currentLanguage, 'home.services.theory.title'), path: '/courses' },
    { name: getTranslation(currentLanguage, 'home.services.practical.title'), path: '/courses' },
    { name: getTranslation(currentLanguage, 'home.services.mockExams.title'), path: '/courses' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/wenyine' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/wenyine' },
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/wenyine' },
    { name: 'Dribbble', icon: '🏀', href: 'https://dribbble.com/wenyine' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚗</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Wenyine</span>
                <div className="text-xs text-gray-400">Driving School</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {getTranslation(currentLanguage, 'footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-white">{getTranslation(currentLanguage, 'footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-3 text-white">{getTranslation(currentLanguage, 'footer.courses')}</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.path}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3 text-white">{getTranslation(currentLanguage, 'footer.contactInfo')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <a href="mailto:info@wenyine.rw" className="text-gray-300 hover:text-white transition-colors">
                  info@wenyine.rw
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <a href="tel:+250788123456" className="text-gray-300 hover:text-white transition-colors">
                  +250 788 123 456
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span className="text-gray-300">Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm text-center md:text-left">
            {getTranslation(currentLanguage, 'footer.copyright')}
          </div>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              {getTranslation(currentLanguage, 'footer.privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              {getTranslation(currentLanguage, 'footer.termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
