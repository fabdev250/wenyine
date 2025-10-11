import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  Star,
  ChevronRight,
  PlayCircle,
  ClipboardList
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create floating particles animation
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(particleArray);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const suggestedPages = [
    {
      title: 'Theory Lessons',
      description: 'Learn driving theory step by step',
      icon: BookOpen,
      path: '/courses?tab=theory',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Practice Exams',
      description: 'Test your knowledge with mock exams',
      icon: ClipboardList,
      path: '/courses?tab=exams',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch expert driving demonstrations',
      icon: PlayCircle,
      path: '/courses?tab=videos',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Live Chat Support',
      description: 'Get help from driving instructors',
      icon: MessageCircle,
      path: '/chat',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const quickStats = [
    { label: 'Students Enrolled', value: '5,000+', icon: '👨‍🎓' },
    { label: 'Success Rate', value: '94%', icon: '🏆' },
    { label: 'Video Lessons', value: '200+', icon: '📹' },
    { label: 'Expert Instructors', value: '50+', icon: '👨‍🏫' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Animated 404 */}
            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                404
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                😕
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Oops! Lost Your Way?
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't worry! Even the best drivers sometimes take a wrong turn. 
                Let's get you back on the right road to learning.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              className="max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for courses, lessons, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </motion.form>

            {/* Quick Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              
              <Link
                to="/courses"
                className="flex items-center justify-center space-x-2 border-2 border-blue-500 text-blue-500 bg-white/50 backdrop-blur-xl px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Courses</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 border-2 border-green-500 text-green-500 bg-white/50 backdrop-blur-xl px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>Get Help</span>
              </Link>
            </motion.div>
          </div>

          {/* Suggested Pages */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.div
                    key={page.title}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={page.path}
                      className="block bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${page.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{page.description}</p>
                      <div className="flex items-center text-blue-500 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        <span>Explore</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Wenyine?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-gray-600 mb-4">Still can't find what you're looking for?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@wenyine.rw</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
