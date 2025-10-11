import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Services = () => {
  const { currentLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Full-stack web applications built with modern technologies',
      longDescription: 'We create powerful, scalable web applications using the latest technologies. From simple websites to complex enterprise solutions, our development team ensures your project is built to last.',
      features: [
        'React & Next.js Development',
        'Node.js & Express Backend',
        'Database Design & Optimization',
        'API Development & Integration',
        'Cloud Deployment & Hosting',
        'Performance Optimization',
        'Security Implementation',
        'Maintenance & Support'
      ],
      pricing: {
        starter: { price: '$2,999', features: ['Up to 5 pages', 'Responsive design', 'Basic SEO', '30 days support'] },
        professional: { price: '$7,999', features: ['Up to 15 pages', 'Advanced features', 'CMS integration', '90 days support', 'Analytics setup'] },
        enterprise: { price: 'Custom', features: ['Unlimited pages', 'Custom functionality', 'Third-party integrations', '1 year support', 'Priority updates'] }
      }
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, user-centered designs that convert visitors to customers',
      longDescription: 'Our design team creates intuitive, beautiful interfaces that provide exceptional user experiences. We focus on usability, accessibility, and conversion optimization.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Design System Creation',
        'Usability Testing',
        'Responsive Design',
        'Accessibility Standards',
        'Design Handoff & Support'
      ],
      pricing: {
        starter: { price: '$1,999', features: ['5 page designs', 'Mobile responsive', 'Basic branding', '2 revisions'] },
        professional: { price: '$4,999', features: ['15 page designs', 'Design system', 'Advanced branding', '5 revisions', 'Prototyping'] },
        enterprise: { price: 'Custom', features: ['Unlimited designs', 'Complete branding', 'User testing', 'Unlimited revisions', 'Ongoing support'] }
      }
    },
    {
      icon: '📊',
      title: 'Technical Consulting',
      description: 'Strategic guidance to help your business grow and scale',
      longDescription: 'Get expert advice on technology strategy, architecture decisions, and digital transformation. We help businesses make informed decisions about their tech stack.',
      features: [
        'Technology Strategy Planning',
        'Architecture Review & Design',
        'Performance Optimization',
        'Security Audits',
        'Team Training & Mentoring',
        'Code Reviews',
        'Digital Transformation',
        'Ongoing Technical Support'
      ],
      pricing: {
        starter: { price: '$199/hr', features: ['Hourly consultation', 'Email support', 'Basic recommendations', 'Follow-up calls'] },
        professional: { price: '$4,999/mo', features: ['20 hours/month', 'Priority support', 'Detailed reports', 'Team training', 'Strategic planning'] },
        enterprise: { price: 'Custom', features: ['Unlimited hours', 'Dedicated consultant', 'On-site visits', 'Custom solutions', 'Executive reporting'] }
      }
    }
  ];

  const processes = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your goals, target audience, and project requirements through detailed consultations.'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Our design team creates wireframes and prototypes to visualize the user experience before development begins.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using best practices, with continuous testing to ensure quality and performance.'
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'After thorough testing, we launch your project and provide ongoing support to ensure continued success.'
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'TypeScript', icon: '📘', category: 'Language' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'Firebase', icon: '🔥', category: 'Backend' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
                {getTranslation(currentLanguage, 'home.services.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {getTranslation(currentLanguage, 'home.services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedService(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-2xl font-bold text-blue-600">{service.pricing.starter.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service View */}
      {selectedService !== null && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
                  {services[selectedService].icon}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {services[selectedService].title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {services[selectedService].longDescription}
                </p>
              </div>

              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {Object.entries(services[selectedService].pricing).map(([tier, details], index) => (
                  <motion.div
                    key={tier}
                    className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                      tier === 'professional'
                        ? 'border-blue-500 bg-blue-50/50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:shadow-lg'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {tier === 'professional' && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{tier}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-6">{details.price}</div>
                    <ul className="space-y-3">
                      {details.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full mt-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      tier === 'professional'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                    }`}>
                      Choose {tier}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Full Features List */}
              <div className="bg-gray-50/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services[selectedService].features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure every project is delivered on time and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                    {process.step}
                  </div>
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with cutting-edge technologies to build modern, scalable, and maintainable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-xs text-gray-500">{tech.category}</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getTranslation(currentLanguage, 'home.cta.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                {getTranslation(currentLanguage, 'home.cta.subtitle')}
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
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

export default Services;
