import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getTranslation } from '../translations';

const AdminDashboard = () => {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const [examModalOpen, setExamModalOpen] = useState(false);

  // Mock data for analytics
  const stats = {
    totalUsers: 1247,
    activeExams: 15,
    completedExams: 3890,
    revenue: 2450000 // RWF
  };

  const examStats = [
    { month: 'Jan', exams: 120, passed: 85 },
    { month: 'Feb', exams: 135, passed: 95 },
    { month: 'Mar', exams: 150, passed: 110 },
    { month: 'Apr', exams: 180, passed: 135 },
    { month: 'May', exams: 200, passed: 155 },
    { month: 'Jun', exams: 190, passed: 145 }
  ];

  const recentUsers = [
    { id: 1, name: 'Jean Uwimana', email: 'jean@student.rw', joined: '2024-01-15', status: 'active', examsTaken: 3 },
    { id: 2, name: 'Marie Mukamana', email: 'marie@student.rw', joined: '2024-01-14', status: 'active', examsTaken: 2 },
    { id: 3, name: 'Paul Nkurunziza', email: 'paul@student.rw', joined: '2024-01-13', status: 'inactive', examsTaken: 1 },
    { id: 4, name: 'Claire Uwase', email: 'claire@student.rw', joined: '2024-01-12', status: 'active', examsTaken: 4 },
    { id: 5, name: 'Eric Habimana', email: 'eric@student.rw', joined: '2024-01-11', status: 'active', examsTaken: 2 }
  ];

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'exams', name: 'Exams', icon: '📝' },
    { id: 'payments', name: 'Payments', icon: '💳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Yego {user?.name}, murakaza neza!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Abanyeshuri</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ibizamini Bikora</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeExams}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ibizamini Byarangiye</p>
                <p className="text-3xl font-bold text-purple-600">{stats.completedExams.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Amafaranga</p>
                <p className="text-3xl font-bold text-orange-600">{(stats.revenue / 1000).toFixed(0)}K RWF</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin-content"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 text-center"
            >
              📚 Manage Content
            </Link>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
              📋 Export Reports
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
              ⚙️ System Settings
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-xl rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
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
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ibizamini by Month</h3>
                <div className="space-y-4">
                  {examStats.map((stat, index) => (
                    <div key={stat.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm text-gray-600">{stat.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.passed / stat.exams) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 w-16 text-right">
                        {stat.passed}/{stat.exams}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Pass Rate</span>
                      <span className="font-semibold">76%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-semibold">8.4/10</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">User Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://images.unsplash.com/photo-${1500000000000 + user.id}?w=40&h=40&fit=crop&crop=face`}
                              alt=""
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.examsTaken}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Exam Management</h3>
                <button
                  onClick={() => setExamModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  + Add New Exam
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Traffic Laws Basic', questions: 20, duration: '30 min', attempts: 145 },
                  { title: 'Road Signs Advanced', questions: 25, duration: '35 min', attempts: 98 },
                  { title: 'Practical Driving', questions: 30, duration: '45 min', attempts: 76 },
                  { title: 'Emergency Procedures', questions: 15, duration: '20 min', attempts: 134 }
                ].map((exam, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                    <h4 className="font-bold text-gray-900 mb-2">{exam.title}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span>{exam.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{exam.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attempts:</span>
                        <span>{exam.attempts}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Payment History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'TXN001', user: 'Jean Uwimana', amount: '5,000 RWF', method: 'MTN MoMo', date: '2024-01-15', status: 'completed' },
                    { id: 'TXN002', user: 'Marie Mukamana', amount: '5,000 RWF', method: 'Flutterwave', date: '2024-01-14', status: 'completed' },
                    { id: 'TXN003', user: 'Paul Nkurunziza', amount: '5,000 RWF', method: 'MTN MoMo', date: '2024-01-13', status: 'pending' }
                  ].map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                          💳
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.user}</div>
                          <div className="text-sm text-gray-500">{payment.id} • {payment.method}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{payment.amount}</div>
                        <div className="text-sm text-gray-500">{payment.date}</div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;