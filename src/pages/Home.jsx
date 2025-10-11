import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Globe, Award, TrendingUp, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Home = ({ onGetStartedClick }) => {
  const { currentLanguage } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: getTranslation(currentLanguage, 'home.features.items.onlineLearning.title'),
      description: getTranslation(currentLanguage, 'home.features.items.onlineLearning.description')
    },
    {
      icon: ClipboardList,
      title: getTranslation(currentLanguage, 'home.features.items.practiceExams.title'),
      description: getTranslation(currentLanguage, 'home.features.items.practiceExams.description')
    },
    {
      icon: Globe,
      title: getTranslation(currentLanguage, 'home.features.items.multiLanguage.title'),
      description: getTranslation(currentLanguage, 'home.features.items.multiLanguage.description')
    },
    {
      icon: Award,
      title: getTranslation(currentLanguage, 'home.features.items.certifiedInstructors.title'),
      description: getTranslation(currentLanguage, 'home.features.items.certifiedInstructors.description')
    },
    {
      icon: TrendingUp,
      title: getTranslation(currentLanguage, 'home.features.items.trackProgress.title'),
      description: getTranslation(currentLanguage, 'home.features.items.trackProgress.description')
    },
    {
      icon: Smartphone,
      title: getTranslation(currentLanguage, 'home.features.items.mobileFriendly.title'),
      description: getTranslation(currentLanguage, 'home.features.items.mobileFriendly.description')
    }
  ];

  const testimonials = getTranslation(currentLanguage, 'home.testimonials.items');

  const stats = [
    { number: '2,500+', label: getTranslation(currentLanguage, 'home.stats.studentsServed') },
    { number: '95%', label: getTranslation(currentLanguage, 'home.stats.passRate') },
    { number: '24/7', label: getTranslation(currentLanguage, 'home.stats.support') },
    { number: '8+', label: getTranslation(currentLanguage, 'home.stats.experience') }
  ];

  const services = [
    {
      icon: BookOpen,
      title: getTranslation(currentLanguage, 'home.services.theory.title'),
      description: getTranslation(currentLanguage, 'home.services.theory.description'),
      features: getTranslation(currentLanguage, 'home.services.theory.features')
    },
    {
      icon: BookOpen,
      title: getTranslation(currentLanguage, 'home.services.practical.title'),
      description: getTranslation(currentLanguage, 'home.services.practical.description'),
      features: getTranslation(currentLanguage, 'home.services.practical.features')
    },
    {
      icon: ClipboardList,
      title: getTranslation(currentLanguage, 'home.services.mockExams.title'),
      description: getTranslation(currentLanguage, 'home.services.mockExams.description'),
      features: getTranslation(currentLanguage, 'home.services.mockExams.features')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {getTranslation(currentLanguage, 'home.hero.title')}
              </span>
              <br />
              <span className="text-gray-800">{getTranslation(currentLanguage, 'home.hero.subtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              {getTranslation(currentLanguage, 'home.hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={onGetStartedClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTranslation(currentLanguage, 'home.hero.startLearning')}
              </motion.button>
              <Link
                to="/courses"
                className="border-2 border-gray-300 text-gray-700 px-12 py-4 rounded-2xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {getTranslation(currentLanguage, 'home.hero.viewCourses')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {getTranslation(currentLanguage, 'home.features.title')}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getTranslation(currentLanguage, 'home.features.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {getTranslation(currentLanguage, 'home.services.title')}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getTranslation(currentLanguage, 'home.services.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {getTranslation(currentLanguage, 'home.services.viewAllCourses')}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getTranslation(currentLanguage, 'home.testimonials.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {getTranslation(currentLanguage, 'home.testimonials.subtitle')}
          </motion.p>

          {/* Compact Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-lg"
                />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{testimonial.name}</h4>
                <p className="text-xs text-blue-600 mb-3">{testimonial.role}</p>
                <p className="text-xs text-gray-600 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              {getTranslation(currentLanguage, 'home.cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {getTranslation(currentLanguage, 'home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onGetStartedClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTranslation(currentLanguage, 'home.cta.startCourse')}
              </motion.button>
              <Link
                to="/contact"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {getTranslation(currentLanguage, 'home.cta.getConsultation')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
