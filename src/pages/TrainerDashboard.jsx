import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  BookOpen,
  Video,
  Award
} from 'lucide-react';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [onlineStudents] = useState([
    { id: 1, name: 'Jean Uwimana', status: 'online', lastActive: 'now', progress: 75 },
    { id: 2, name: 'Marie Mukamana', status: 'online', lastActive: 'now', progress: 60 },
    { id: 3, name: 'Paul Nkurunziza', status: 'offline', lastActive: '2 hours ago', progress: 45 },
    { id: 4, name: 'Claire Uwase', status: 'online', lastActive: 'now', progress: 85 },
    { id: 5, name: 'Eric Habimana', status: 'offline', lastActive: '1 day ago', progress: 30 }
  ]);

  const [stats] = useState({
    totalStudents: 24,
    activeStudents: 12,
    completedLessons: 156,
    averageProgress: 68,
    pendingQuestions: 8,
    upcomingSchedules: 3
  });

  const [recentMessages] = useState([
    { id: 1, student: 'Jean Uwimana', message: 'Hari questions ku traffic lights...', time: '5 min ago', unread: true },
    { id: 2, student: 'Marie Mukamana', message: 'Mwaramutse teacher, schedule...', time: '15 min ago', unread: true },
    { id: 3, student: 'Paul Nkurunziza', message: 'Murakoze cyane for yesterday...', time: '1 hour ago', unread: false },
    { id: 4, student: 'Claire Uwase', message: 'Can we review parking rules?', time: '2 hours ago', unread: false }
  ]);

  const [upcomingSchedules] = useState([
    { id: 1, student: 'Jean Uwimana', type: 'Practical Lesson', time: '2:00 PM', date: 'Today' },
    { id: 2, student: 'Marie Mukamana', type: 'Theory Review', time: '4:30 PM', date: 'Today' },
    { id: 3, student: 'Eric Habimana', type: 'Mock Exam', time: '9:00 AM', date: 'Tomorrow' }
  ]);

  const tabs = [
    { id: 'students', name: 'Students', icon: Users },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'schedule', name: 'Schedule', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trainer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Ready to teach today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeStudents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg. Progress</p>
                <p className="text-3xl font-bold text-purple-600">{stats.averageProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Questions</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingQuestions}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-xl rounded-2xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'students' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Student List */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">My Students</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {onlineStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                className="h-12 w-12 rounded-full"
                                src={`https://images.unsplash.com/photo-${1500000000000 + student.id}?w=48&h=48&fit=crop&crop=face`}
                                alt=""
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">Last active: {student.lastActive}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{student.progress}%</div>
                              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                            </div>
                            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Start Group Chat</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <Video className="w-5 h-5" />
                      <span>Schedule Lesson</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Create Assignment</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Jean completed Theory Chapter 3</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>Marie passed mock exam #2</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span>New message from Paul</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Recent Messages</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className={`p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors ${
                        message.unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900">{message.student}</div>
                          <div className="text-sm text-gray-500">{message.time}</div>
                        </div>
                        <div className="text-gray-600 text-sm">{message.message}</div>
                        {message.unread && (
                          <div className="mt-2">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                              Unread
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Message Stats</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-semibold">12 minutes</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Messages Today</span>
                      <span className="font-semibold">28</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Student Progress Overview</h3>
                <div className="space-y-4">
                  {onlineStudents.map((student, index) => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <div className="w-16 text-sm text-gray-600">{student.name.split(' ')[0]}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 w-12 text-right">
                        {student.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Teaching Performance</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Student Satisfaction</span>
                      <span className="font-semibold">4.8/5</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Exam Pass Rate</span>
                      <span className="font-semibold">82%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Upcoming Lessons</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingSchedules.map((schedule) => (
                        <div key={schedule.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{schedule.student}</div>
                              <div className="text-sm text-gray-500">{schedule.type}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{schedule.time}</div>
                            <div className="text-sm text-gray-500">{schedule.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Schedule</h3>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Add New Lesson</span>
                  </button>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Lessons</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upcoming</span>
                      <span className="font-semibold text-blue-600">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TrainerDashboard;