import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('wenyine_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('wenyine_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (email === 'admin@wenyine.rw' && password === 'admin123') {
          const adminUser = {
            id: 1,
            name: 'Admin User',
            email: 'admin@wenyine.rw',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            joinedAt: '2024-01-01T00:00:00.000Z',
            sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000)
          };
          setUser(adminUser);
          localStorage.setItem('wenyine_user', JSON.stringify(adminUser));
          // Redirect to admin dashboard
          setTimeout(() => navigate('/admin-dashboard'), 100);
          resolve(adminUser);
        } else if (email === 'trainer@wenyine.rw' && password === 'trainer123') {
          const trainerUser = {
            id: 3,
            name: 'John Trainer',
            email: 'trainer@wenyine.rw',
            role: 'trainer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            joinedAt: '2024-01-15T00:00:00.000Z',
            sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000),
            specializations: ['Theory', 'Practical'],
            studentsCount: 15
          };
          setUser(trainerUser);
          localStorage.setItem('wenyine_user', JSON.stringify(trainerUser));
          // Redirect to trainer dashboard
          setTimeout(() => navigate('/trainer-dashboard'), 100);
          resolve(trainerUser);
        } else if (email.endsWith('@student.rw') || email === 'student@test.com') {
          const studentUser = {
            id: 2,
            name: 'Student User',
            email: email,
            role: 'student',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b57da84b?w=150&h=150&fit=crop&crop=face',
            joinedAt: '2024-02-01T00:00:00.000Z',
            sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000),
            progress: {
              theoryCourse: 75,
              practicalCourse: 45,
              mockExams: 60,
              examsTaken: 3,
              examsPassed: 2
            }
          };
          setUser(studentUser);
          localStorage.setItem('wenyine_user', JSON.stringify(studentUser));
          // Redirect to student dashboard
          setTimeout(() => navigate('/dashboard'), 100);
          resolve(studentUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  };

  const register = async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: userData.role || 'student',
          avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3b82f6&color=fff`,
          joinedAt: new Date().toISOString(),
          sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000),
          progress: {
            theoryCourse: 0,
            practicalCourse: 0,
            mockExams: 0,
            examsTaken: 0,
            examsPassed: 0
          }
        };
        setUser(newUser);
        localStorage.setItem('wenyine_user', JSON.stringify(newUser));
        
        // Redirect based on role
        setTimeout(() => {
          if (newUser.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (newUser.role === 'trainer') {
            navigate('/trainer-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 100);
        
        resolve(newUser);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wenyine_user');
    navigate('/');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('wenyine_user', JSON.stringify(updatedUser));
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const isSessionValid = () => {
    if (!user || !user.sessionExpiry) return false;
    return new Date().getTime() < user.sessionExpiry;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    isSessionValid,
    isAdmin: user?.role === 'admin',
    isTrainer: user?.role === 'trainer',
    isStudent: user?.role === 'student',
    isAuthenticated: !!user && isSessionValid()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};