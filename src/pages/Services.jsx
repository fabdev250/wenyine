import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, ClipboardList, PlayCircle, Clock, Users, Award, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import { usePayment } from '../contexts/PaymentContext';
import Paywall from '../components/Paywall';
import PracticeExam from '../components/PracticeExam';
import VideoLearning from '../components/VideoLearning';
import { theorySections, practiceExams, videos, coursePricing } from '../data/drivingContent';

const Services = () => {
  const { currentLanguage } = useLanguage();
  const { hasBasicAccess, hasPremiumAccess, checkAccess } = usePayment();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const getLocalizedText = (obj, key) => {
    const langKey = currentLanguage === 'rw' ? `${key}Rw` : currentLanguage === 'fr' ? `${key}Fr` : key;
    return obj[langKey] || obj[key];
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const courseOverview = [
    {
      icon: BookOpen,
      title: getTranslation(currentLanguage, 'home.services.theory.title'),
      description: getTranslation(currentLanguage, 'home.services.theory.description'),
      features: getTranslation(currentLanguage, 'home.services.theory.features'),
      sections: theorySections.length,
      duration: '4 hours',
      locked: !checkAccess('theory')
    },
    {
      icon: ClipboardList,
      title: getTranslation(currentLanguage, 'home.services.mockExams.title'),
      description: getTranslation(currentLanguage, 'home.services.mockExams.description'),
      features: getTranslation(currentLanguage, 'home.services.mockExams.features'),
      sections: practiceExams.length,
      duration: '2 hours',
      locked: !checkAccess('exams')
    },
    {
      icon: PlayCircle,
      title: 'Video Tutorials',
      titleRw: 'Amashusho yo Kwigisha',
      titleFr: 'Tutoriels Vidéo',
      description: 'Learn through interactive video lessons',
      descriptionRw: 'Wiga binyuze mu mashusho yo kwigisha',
      descriptionFr: 'Apprenez grâce aux leçons vidéo interactives',
      features: ['HD Video Content', 'Expert Instructions', 'Progress Tracking', 'Mobile Access'],
      sections: videos.length,
      duration: '3 hours',
      locked: !checkAccess('videos')
    }
  ];

  const tabConfig = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'theory', name: 'Theory Lessons', icon: BookOpen },
    { id: 'exams', name: 'Practice Exams', icon: ClipboardList },
    { id: 'videos', name: 'Video Tutorials', icon: PlayCircle }
  ];

  const renderLessonContent = (lesson) => {
    const content = currentLanguage === 'rw' ? lesson.contentRw : 
                   currentLanguage === 'fr' ? lesson.contentFr : lesson.content;
    
    return (
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-line">{content}</div>
        <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-center text-blue-800">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Estimated duration: {lesson.duration}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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

      {/* Access Status */}
      {(hasBasicAccess || hasPremiumAccess) && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">
                  {hasPremiumAccess ? 'Premium Access Active' : 'Basic Access Active'}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Course Navigation Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/50">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:block">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {courseOverview.map((course, index) => {
                const Icon = course.icon;
                return (
                  <motion.div
                    key={course.title}
                    className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {course.locked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                        course.locked ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}>
                        <Icon className={`w-8 h-8 ${course.locked ? 'text-gray-400' : 'text-white'}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {getLocalizedText(course, 'title')}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {getLocalizedText(course, 'description')}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{course.sections}</div>
                          <div className="text-sm text-gray-600">Sections</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-xl">
                          <div className="text-2xl font-bold text-purple-600">{course.duration}</div>
                          <div className="text-sm text-gray-600">Duration</div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {course.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600 text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {course.locked ? (
                        <button
                          onClick={() => handleTabChange(course.title.toLowerCase().includes('exam') ? 'exams' : course.title.toLowerCase().includes('video') ? 'videos' : 'theory')}
                          className="w-full py-3 bg-gray-200 text-gray-500 rounded-2xl font-semibold cursor-not-allowed"
                          disabled
                        >
                          Unlock Required
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTabChange(course.title.toLowerCase().includes('exam') ? 'exams' : course.title.toLowerCase().includes('video') ? 'videos' : 'theory')}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          Start Learning
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Theory Lessons Tab */}
          {activeTab === 'theory' && (
            <Paywall contentType="theory" showPreview={true}>
              <div className="space-y-6">
                {theorySections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  >
                    <div className="p-8 border-b border-gray-200/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {getLocalizedText(section, 'title')}
                        </h3>
                        {section.locked && <Lock className="w-5 h-5 text-gray-400" />}
                      </div>
                      <p className="text-gray-600 mb-6">
                        {getLocalizedText(section, 'description')}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {section.lessons.length} lessons
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            selectedLesson?.id === lesson.id
                              ? 'border-blue-500 bg-blue-50/50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/50'
                          }`}
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {getLocalizedText(lesson, 'title')}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {lesson.duration}
                              </div>
                            </div>
                            <BookOpen className="w-5 h-5 text-blue-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                {/* Lesson Content Modal */}
                {selectedLesson && (
                  <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex min-h-full items-center justify-center p-4">
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLesson(null)} />
                      <motion.div
                        className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-3xl font-bold text-gray-900">
                            {getLocalizedText(selectedLesson, 'title')}
                          </h3>
                          <button
                            onClick={() => setSelectedLesson(null)}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                        {renderLessonContent(selectedLesson)}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Paywall>
          )}

          {/* Practice Exams Tab */}
          {activeTab === 'exams' && (
            <Paywall contentType="exams" title="Unlock Practice Exams" description="Test your knowledge with comprehensive practice exams">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceExams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedExam(exam)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <ClipboardList className="w-8 h-8 text-blue-500" />
                      {exam.locked && <Lock className="w-5 h-5 text-gray-400" />}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {getLocalizedText(exam, 'title')}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {getLocalizedText(exam, 'description')}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{exam.questions}</div>
                        <div className="text-xs text-gray-600">Questions</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{exam.duration}m</div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedExam(exam)}
                      className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Start Exam
                    </button>
                  </motion.div>
                ))}
              </div>
            </Paywall>
          )}

          {/* Video Tutorials Tab */}
          {activeTab === 'videos' && (
            <Paywall contentType="videos" title="Unlock Video Tutorials" description="Learn with expert video tutorials and demonstrations">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowVideoPlayer(true)}
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={getLocalizedText(video, 'title')}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        {video.duration}
                      </div>
                      {video.locked && (
                        <div className="absolute top-3 left-3 bg-black/70 text-white p-2 rounded-lg">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {getLocalizedText(video, 'title')}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {getLocalizedText(video, 'description')}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                          {video.category}
                        </span>
                        <button 
                          onClick={() => setShowVideoPlayer(true)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors duration-300"
                        >
                          Watch
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Paywall>
          )}

        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the plan that fits your learning goals
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {getLocalizedText(coursePricing.basic, 'name')}
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {coursePricing.basic.price.toLocaleString()} {coursePricing.basic.currency}
              </div>
              <p className="text-gray-600 mb-8">
                {getLocalizedText(coursePricing.basic, 'description')}
              </p>
              <ul className="space-y-3 text-left">
                {getLocalizedText(coursePricing.basic, 'features').map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-blue-500 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {getLocalizedText(coursePricing.premium, 'name')}
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {coursePricing.premium.price.toLocaleString()} {coursePricing.premium.currency}
              </div>
              <p className="text-gray-600 mb-8">
                {getLocalizedText(coursePricing.premium, 'description')}
              </p>
              <ul className="space-y-3 text-left">
                {getLocalizedText(coursePricing.premium, 'features').map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
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
            <h2 className="text-4xl font-bold text-white mb-6">
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

    {/* Practice Exam Modal */}
    {selectedExam && (
      <PracticeExam 
        examType={selectedExam.id}
        onClose={() => setSelectedExam(null)}
      />
    )}

    {/* Video Learning Modal */}
    {showVideoPlayer && (
      <VideoLearning 
        onClose={() => setShowVideoPlayer(false)}
      />
    )}
    </>
  );
};

export default Services;
