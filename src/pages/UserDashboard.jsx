import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  ClipboardList, 
  PlayCircle, 
  MessageCircle, 
  Trophy, 
  Clock, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';
import { useProgress } from '../hooks/useProgress';

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { hasBasicAccess, hasPremiumAccess, getRemainingDays } = usePayment();
  const { getOverallProgress } = useProgress();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for development
  const tabs = [
    { id: 'overview', name: 'Incamake', icon: '📊' },
    { id: 'exams', name: 'Ibizamini', icon: '📝' },
    { id: 'progress', name: 'Iterambere', icon: '📈' },
    { id: 'profile', name: 'Profili', icon: '👤' }
  ];

  const recentExams = [
    { id: 1, title: 'Amategeko y\'Umuhanda', date: '2024-01-15', duration: '45 min', score: 85, status: 'passed' },
    { id: 2, title: 'Ibimenyetso by\'Umuhanda', date: '2024-01-10', duration: '30 min', score: 92, status: 'passed' },
    { id: 3, title: 'Gutwara Ubushake', date: '2024-01-05', duration: '60 min', score: 78, status: 'passed' }
  ];

  const achievements = [
    { title: 'Icyitegererezo cya mbere', description: 'Raguze ikizamini cya mbere', icon: '🎯', earned: true },
    { title: 'Umunyeshuri Mwiza', description: 'Watsindiye ibizamini 5 bikurikiranye', icon: '⭐', earned: true },
    { title: 'Umwarimu w\'Amategeko', description: 'Wabonye amanota 90+ mu bizamini 3', icon: '👨‍🏫', earned: false }
  ];

  const availableExams = [
    { id: 1, title: 'Amategeko Rusange', questions: 30, duration: 45, level: 'beginner', price: 5000 },
    { id: 2, title: 'Ibimenyetso by\'Umuhanda', questions: 25, duration: 30, level: 'intermediate', price: 7000 },
    { id: 3, title: 'Gutwara mu Bikorwa', questions: 40, duration: 60, level: 'advanced', price: 10000 }
  ];

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const progress = getOverallProgress();
  const remainingDays = hasPremiumAccess ? getRemainingDays('premium') : hasBasicAccess ? getRemainingDays('basic') : 0;
  
  // Use user progress data from AuthContext or create default values
  const userProgress = user.progress || { theoryCourse: 0, practicalCourse: 0, mockExams: 0 };
  const combinedProgress = {
    ...progress,
    theoryCourse: userProgress.theoryCourse,
    practicalCourse: userProgress.practicalCourse,
    mockExams: userProgress.mockExams,
    examsTaken: userProgress.examsTaken || progress.examsCompleted,
    examsPassed: userProgress.examsPassed || progress.totalExamsPassed
  };

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your theory lessons',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      link: '/courses?tab=theory',
      locked: !hasBasicAccess && !hasPremiumAccess
    },
    {
      title: 'Practice Exams',
      description: 'Test your knowledge',
      icon: ClipboardList,
      color: 'from-green-500 to-green-600',
      link: '/courses?tab=exams',
      locked: !hasPremiumAccess
    },
    {
      title: 'Video Tutorials',
      description: 'Watch expert demonstrations',
      icon: PlayCircle,
      color: 'from-purple-500 to-purple-600',
      link: '/courses?tab=videos',
      locked: !hasPremiumAccess
    },
    {
      title: 'Live Chat',
      description: 'Chat with your trainer',
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600',
      link: '/chat',
      locked: !hasBasicAccess && !hasPremiumAccess
    }
  ];

  const stats = [
    {
      label: 'Lessons Completed',
      value: combinedProgress.lessonsCompleted,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Videos Watched',
      value: combinedProgress.videosCompleted,
      icon: PlayCircle,
      color: 'text-purple-600'
    },
    {
      label: 'Exams Taken',
      value: combinedProgress.examsCompleted,
      icon: ClipboardList,
      color: 'text-green-600'
    },
    {
      label: 'Exams Passed',
      value: combinedProgress.totalExamsPassed,
      icon: Trophy,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">
                  {hasPremiumAccess ? 'Premium Member' : hasBasicAccess ? 'Basic Member' : 'Guest'}
                  {remainingDays > 0 && ` • ${remainingDays} days remaining`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-red-100 hover:bg-red-200 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-blue-600">{combinedProgress.examsTaken}</div>
            <div className="text-sm text-gray-600">Ibizamini Byakozwe</div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600">{combinedProgress.examsPassed}</div>
            <div className="text-sm text-gray-600">Ibizamini Byatsindiye</div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-purple-600">{Math.round((combinedProgress.examsPassed / Math.max(combinedProgress.examsTaken, 1)) * 100)}%</div>
            <div className="text-sm text-gray-600">Igipimo cyo Gutsinda</div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-orange-600">{Math.round((combinedProgress.theoryCourse + combinedProgress.practicalCourse + combinedProgress.mockExams) / 3)}%</div>
            <div className="text-sm text-gray-600">Iterambere Rusange</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-xl rounded-2xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white shadow-md text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Ibizamini Byaheruka</h3>
                    <Link to="/exam-reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Reba byose →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentExams.map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                            exam.status === 'passed' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {exam.status === 'passed' ? '✓' : '✗'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{exam.title}</div>
                            <div className="text-sm text-gray-500">{exam.date} • {exam.duration}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            exam.status === 'passed' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {exam.score}%
                          </div>
                          <div className="text-sm text-gray-500">{exam.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ibikorwa Byihuse</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/courses"
                      className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors duration-300"
                    >
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                        📚
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Amasomo</div>
                        <div className="text-sm text-gray-600">Komeza kwiga</div>
                      </div>
                    </Link>
                    <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors duration-300">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                        📝
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Ikizamini Gishya</div>
                        <div className="text-sm text-gray-600">Tangira ikizamini</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Iterambere ryawe</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Isomo ry'Injyana</span>
                        <span className="font-semibold">{combinedProgress.theoryCourse}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${combinedProgress.theoryCourse}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Amasomo y'Ibikorwa</span>
                        <span className="font-semibold">{combinedProgress.practicalCourse}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-green-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${combinedProgress.practicalCourse}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Ibizamini byo Kwigeneza</span>
                        <span className="font-semibold">{combinedProgress.mockExams}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-purple-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${combinedProgress.mockExams}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ibyagezweho</h3>
                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-2xl ${
                        achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                      }`}>
                        <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </div>
                          <div className="text-xs text-gray-500">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Ibizamini Bihari</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    Byose
                  </button>
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors">
                    Ntabyishura
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                      exam.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      exam.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.level === 'beginner' ? 'Intangiriro' : 
                       exam.level === 'intermediate' ? 'Hagati' : 'Bigoye'}
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-3">{exam.title}</h4>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Ibibazo:</span>
                        <span>{exam.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Igihe:</span>
                        <span>{exam.duration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Igiciro:</span>
                        <span className="font-semibold text-blue-600">{exam.price.toLocaleString()} RWF</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Tangira Ikizamini
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detailed Progress */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Iterambere mu buryo bwimbitse</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Amategeko y\'Umuhanda', progress: combinedProgress.theoryCourse, color: 'blue' },
                    { title: 'Ibimenyetso by\'Umuhanda', progress: 65, color: 'green' },
                    { title: 'Gutwara mu Bikorwa', progress: combinedProgress.practicalCourse, color: 'purple' },
                    { title: 'Ibyihutirwa', progress: 80, color: 'orange' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <span className="font-semibold">{item.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <motion.div
                          className={`bg-${item.color}-500 h-full rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Streak & Goals */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Intego zawe</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                          📅
                        </div>
                        <span className="font-medium text-gray-900">Kwiga buri munsi</span>
                      </div>
                      <span className="text-blue-600 font-semibold">7/7 iminsi</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                          🎯
                        </div>
                        <span className="font-medium text-gray-900">Gutsinda ibizamini 10</span>
                      </div>
                      <span className="text-green-600 font-semibold">{combinedProgress.examsPassed}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                          ⭐
                        </div>
                        <span className="font-medium text-gray-900">Amanota 90+</span>
                      </div>
                      <span className="text-purple-600 font-semibold">2/5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ibindi byagezweho</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`p-4 rounded-2xl border-2 ${
                        achievement.earned 
                          ? 'bg-yellow-50 border-yellow-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className={`text-2xl mb-2 ${achievement.earned ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className={`font-medium text-sm ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center">
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{user?.name}</h3>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <button className="bg-blue-100 text-blue-600 px-6 py-2 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                    Hindura Ifoto
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Amakuru yawe</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amazina</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imeyili</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefoni</label>
                        <input
                          type="tel"
                          placeholder="+250 788 123 456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Itariki y'Amavuko</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Aderesi</label>
                      <input
                        type="text"
                        placeholder="Kigali, Rwanda"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        Bika Impinduka
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;