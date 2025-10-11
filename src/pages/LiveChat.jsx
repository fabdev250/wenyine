import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  User,
  Circle,
  Image as ImageIcon,
  File,
  Smile
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';

const LiveChat = () => {
  const { user, isAuthenticated } = useAuth();
  const { hasBasicAccess, hasPremiumAccess } = usePayment();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'trainer',
      senderName: 'John Trainer',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Hello! Welcome to your driving course. How can I help you today?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text'
    },
    {
      id: 2,
      sender: 'student',
      senderName: user?.name || 'Student',
      senderAvatar: user?.avatar,
      content: 'Hi! I had a question about parallel parking techniques.',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: 'text'
    },
    {
      id: 3,
      sender: 'trainer',
      senderName: 'John Trainer',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Great question! Let me share a video tutorial that explains the step-by-step process.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([
    {
      id: 1,
      name: 'John Trainer',
      role: 'trainer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'trainer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b57da84b?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: '2 min ago'
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }
    
    if (!hasBasicAccess && !hasPremiumAccess) {
      navigate('/courses');
      return;
    }
  }, [isAuthenticated, user, hasBasicAccess, hasPremiumAccess, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'student',
      senderName: user.name,
      senderAvatar: user.avatar,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate trainer typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulate trainer response
      const trainerResponse = {
        id: messages.length + 2,
        sender: 'trainer',
        senderName: 'John Trainer',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: getTrainerResponse(newMessage),
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, trainerResponse]);
    }, Math.random() * 2000 + 1000);
  };

  const getTrainerResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Keyword-based responses for more realistic interaction
    if (message.includes('parking') || message.includes('park')) {
      const parkingResponses = [
        "For parallel parking, remember the 3-point method: align, reverse at 45°, then straighten. Would you like me to share a video tutorial?",
        "Parking can be tricky! The key is to go slow and use your mirrors. Practice makes perfect. What specific part are you struggling with?",
        "Great question about parking! Remember to always check your blind spots and take your time. Safety first!"
      ];
      return parkingResponses[Math.floor(Math.random() * parkingResponses.length)];
    }
    
    if (message.includes('speed') || message.includes('limit')) {
      return "In Rwanda, urban speed limits are typically 50 km/h, while highways allow 120 km/h. Always check local signs though! Remember, speed limits are maximums, not targets.";
    }
    
    if (message.includes('traffic') || message.includes('light')) {
      return "Traffic lights are crucial for road safety! Red means stop completely, yellow means prepare to stop (don't speed up!), and green means proceed when safe. Always look both ways even on green.";
    }
    
    if (message.includes('exam') || message.includes('test')) {
      return "Getting ready for your driving exam? I recommend taking our practice tests first. Focus on traffic rules, road signs, and safe driving practices. You've got this! 🚗💪";
    }
    
    if (message.includes('nervous') || message.includes('scared') || message.includes('afraid')) {
      return "It's completely normal to feel nervous when learning to drive! Take deep breaths, start slowly, and remember that every expert was once a beginner. I'm here to help you every step of the way. 😊";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there! 👋 I'm here to help with all your driving questions. What would you like to learn about today?";
    }
    
    if (message.includes('thank') || message.includes('merci')) {
      return "You're very welcome! That's what I'm here for. Feel free to ask me anything else about driving. Happy to help! 😊";
    }
    
    // Default responses for general questions
    const generalResponses = [
      "That's a great question! Let me help you with that. 📚",
      "I understand your concern. Here's what you should know...",
      "Good point! This is actually a common topic students ask about.",
      "I'm glad you asked that. Let me explain the proper technique.",
      "That's exactly the right thing to be thinking about. Safety first! 🛡️",
      "Excellent question! This shows you're thinking like a responsible driver. 🚗",
      "I love helping students with questions like this! Here's my advice..."
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-20 pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-6rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          
          {/* Online Users Sidebar */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Circle className="w-5 h-5 mr-2 text-green-500 fill-current" />
              Online Trainers
            </h3>
            
            <div className="space-y-3">
              {onlineUsers.map((trainer) => (
                <motion.div
                  key={trainer.id}
                  className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <img
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {trainer.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{trainer.name}</div>
                    <div className="text-xs text-gray-500">{trainer.lastSeen}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200/50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <span>Schedule Call</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <Video className="w-4 h-4" />
                  <span>Video Session</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 flex flex-col">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 lg:hidden"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      alt="John Trainer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">John Trainer</h3>
                    <p className="text-sm text-gray-500">Active now</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors duration-200">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'student' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-end space-x-2 ${message.sender === 'student' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <img
                          src={message.senderAvatar}
                          alt={message.senderName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'student'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.sender === 'student' ? 'text-right' : 'text-left'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      alt="John Trainer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200/50">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows="1"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                      <button
                        type="button"
                        className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors duration-200"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors duration-200"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;