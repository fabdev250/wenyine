import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  BookOpen, 
  PlayCircle, 
  ClipboardList,
  FileText,
  Upload,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminContent = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('theory');
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [contentData, setContentData] = useState({
    theory: [],
    videos: [],
    exams: []
  });

  // Form states
  const [theoryForm, setTheoryForm] = useState({
    title: '',
    content: '',
    description: '',
    duration: '',
    category: 'traffic-laws'
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    duration: '',
    chapter: '',
    topics: []
  });

  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    questions: [],
    duration: 20,
    difficulty: 'intermediate'
  });

  // Load content from localStorage
  useEffect(() => {
    const loadContent = () => {
      const theory = JSON.parse(localStorage.getItem('adminTheoryPapers') || '[]');
      const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
      const exams = JSON.parse(localStorage.getItem('adminExams') || '[]');
      
      setContentData({ theory, videos, exams });
    };
    
    loadContent();
  }, []);

  // Save content to localStorage
  const saveContent = (type, data) => {
    const storageKey = `admin${type.charAt(0).toUpperCase() + type.slice(1)}${type === 'theory' ? 'Papers' : type === 'exams' ? '' : ''}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
    setContentData(prev => ({ ...prev, [type]: data }));
  };

  // Add new theory paper
  const addTheoryPaper = () => {
    if (!theoryForm.title.trim()) return;
    
    const newPaper = {
      id: Date.now(),
      ...theoryForm,
      createdAt: new Date().toISOString(),
      author: user.name
    };
    
    const updatedTheory = [...contentData.theory, newPaper];
    saveContent('theory', updatedTheory);
    
    setTheoryForm({
      title: '',
      content: '',
      description: '',
      duration: '',
      category: 'traffic-laws'
    });
    setIsAddingContent(false);
  };

  // Add new video
  const addVideo = () => {
    if (!videoForm.title.trim() || !videoForm.videoUrl.trim()) return;
    
    const newVideo = {
      id: Date.now(),
      ...videoForm,
      topics: videoForm.topics.filter(topic => topic.trim()),
      createdAt: new Date().toISOString(),
      author: user.name
    };
    
    const updatedVideos = [...contentData.videos, newVideo];
    saveContent('videos', updatedVideos);
    
    setVideoForm({
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      duration: '',
      chapter: '',
      topics: []
    });
    setIsAddingContent(false);
  };

  // Add new exam
  const addExam = () => {
    if (!examForm.title.trim() || examForm.questions.length === 0) return;
    
    const newExam = {
      id: Date.now(),
      ...examForm,
      createdAt: new Date().toISOString(),
      author: user.name
    };
    
    const updatedExams = [...contentData.exams, newExam];
    saveContent('exams', updatedExams);
    
    setExamForm({
      title: '',
      description: '',
      questions: [],
      duration: 20,
      difficulty: 'intermediate'
    });
    setIsAddingContent(false);
  };

  // Delete content
  const deleteContent = (type, id) => {
    const updated = contentData[type].filter(item => item.id !== id);
    saveContent(type, updated);
  };

  // Add topic to video form
  const addTopic = () => {
    setVideoForm(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const updateTopic = (index, value) => {
    setVideoForm(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const removeTopic = (index) => {
    setVideoForm(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'theory', name: 'Theory Papers', icon: BookOpen, count: contentData.theory.length },
    { id: 'videos', name: 'Video Lessons', icon: PlayCircle, count: contentData.videos.length },
    { id: 'exams', name: 'Practice Exams', icon: ClipboardList, count: contentData.exams.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage theory papers, video lessons, and practice exams</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-xl rounded-2xl p-1 border border-white/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
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
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Add Content Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {isAddingContent ? `Add New ${activeTab === 'theory' ? 'Theory Paper' : activeTab === 'videos' ? 'Video' : 'Exam'}` : 'Quick Actions'}
                </h3>
                {isAddingContent && (
                  <button
                    onClick={() => setIsAddingContent(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!isAddingContent ? (
                <button
                  onClick={() => setIsAddingContent(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add {activeTab === 'theory' ? 'Paper' : activeTab === 'videos' ? 'Video' : 'Exam'}</span>
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Theory Paper Form */}
                  {activeTab === 'theory' && (
                    <>
                      <input
                        type="text"
                        placeholder="Title"
                        value={theoryForm.title}
                        onChange={(e) => setTheoryForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={theoryForm.description}
                        onChange={(e) => setTheoryForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={theoryForm.category}
                        onChange={(e) => setTheoryForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="traffic-laws">Traffic Laws</option>
                        <option value="road-signs">Road Signs</option>
                        <option value="vehicle-operation">Vehicle Operation</option>
                        <option value="safety">Safety</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Duration (e.g., 15 min)"
                        value={theoryForm.duration}
                        onChange={(e) => setTheoryForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Content (supports markdown)"
                        value={theoryForm.content}
                        onChange={(e) => setTheoryForm(prev => ({ ...prev, content: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={addTheoryPaper}
                        className="w-full bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Paper</span>
                      </button>
                    </>
                  )}

                  {/* Video Form */}
                  {activeTab === 'videos' && (
                    <>
                      <input
                        type="text"
                        placeholder="Title"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={videoForm.description}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Video URL"
                        value={videoForm.videoUrl}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Thumbnail URL"
                        value={videoForm.thumbnail}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 10:30)"
                        value={videoForm.duration}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Chapter"
                        value={videoForm.chapter}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, chapter: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Topics</span>
                          <button
                            onClick={addTopic}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        {videoForm.topics.map((topic, index) => (
                          <div key={index} className="flex space-x-2 mb-2">
                            <input
                              type="text"
                              placeholder={`Topic ${index + 1}`}
                              value={topic}
                              onChange={(e) => updateTopic(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => removeTopic(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={addVideo}
                        className="w-full bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Video</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content List */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  {activeTab === 'theory' ? 'Theory Papers' : activeTab === 'videos' ? 'Video Lessons' : 'Practice Exams'}
                </h3>
              </div>
              
              <div className="p-6">
                {contentData[activeTab].length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No content yet</h3>
                    <p className="text-gray-600 mb-6">Start by adding some {activeTab} content.</p>
                    <button
                      onClick={() => setIsAddingContent(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Add First {activeTab === 'theory' ? 'Paper' : activeTab === 'videos' ? 'Video' : 'Exam'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {contentData[activeTab].map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>By {item.author}</span>
                              <span>•</span>
                              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                              {item.duration && (
                                <>
                                  <span>•</span>
                                  <span>{item.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteContent(activeTab, item.id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;