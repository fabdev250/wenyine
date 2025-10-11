import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Contact = () => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Send us a message',
      contact: 'hello@wenyine.com',
      href: 'mailto:hello@wenyine.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Office',
      description: 'Visit our location',
      contact: 'San Francisco, CA',
      href: 'https://maps.google.com'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9AM-6PM',
      href: '#chat'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-600/10"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your next project? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-500 mb-3">{method.description}</p>
                  <p className="text-blue-600 font-semibold group-hover:text-purple-600 transition-colors duration-300">
                    {method.contact}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            {submitStatus === 'success' && (
              <motion.div
                className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-green-400 text-xl">✅</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-green-800 font-semibold">
                      Message sent successfully!
                    </p>
                    <p className="text-green-700 text-sm">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
                  placeholder="Tell us about your project or how we can help you..."
                ></textarea>
              </div>

              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Office Hours */}
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl mb-6">
                🕐
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">All times in Pacific Standard Time (PST)</p>
            </motion.div>

            {/* Response Time */}
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-xl mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Response Time</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> Within 24 hours</p>
                <p><strong>Phone:</strong> Immediate during office hours</p>
                <p><strong>Live Chat:</strong> Within 5 minutes</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">We prioritize urgent requests</p>
            </motion.div>

            {/* Support */}
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-xl mb-6">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What We Help With</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Web Development Projects</p>
                <p>• UI/UX Design Services</p>
                <p>• Technical Consulting</p>
                <p>• Project Planning & Strategy</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Free initial consultations available</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
