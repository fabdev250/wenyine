import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [examScores, setExamScores] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const savedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const savedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]');
    const savedScores = JSON.parse(localStorage.getItem('examScores') || '{}');

    setCompletedLessons(new Set(savedLessons));
    setCompletedVideos(new Set(savedVideos));
    setExamScores(savedScores);
  }, []);

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
    localStorage.setItem('completedVideos', JSON.stringify(Array.from(completedVideos)));
    localStorage.setItem('examScores', JSON.stringify(examScores));
  };

  const markLessonComplete = (lessonId) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
    
    // Save immediately
    localStorage.setItem('completedLessons', JSON.stringify(Array.from(newCompleted)));
  };

  const markVideoComplete = (videoId) => {
    const newCompleted = new Set(completedVideos);
    newCompleted.add(videoId);
    setCompletedVideos(newCompleted);
    
    // Save immediately
    localStorage.setItem('completedVideos', JSON.stringify(Array.from(newCompleted)));
  };

  const saveExamScore = (examId, score, totalQuestions, timeSpent) => {
    const newScores = {
      ...examScores,
      [examId]: {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        timeSpent,
        completedAt: new Date().toISOString(),
        passed: (score / totalQuestions) >= 0.8 // 80% pass rate
      }
    };
    
    setExamScores(newScores);
    
    // Save immediately
    localStorage.setItem('examScores', JSON.stringify(newScores));
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.has(lessonId);
  };

  const isVideoCompleted = (videoId) => {
    return completedVideos.has(videoId);
  };

  const getExamScore = (examId) => {
    return examScores[examId] || null;
  };

  const getOverallProgress = () => {
    // This would be calculated based on total content available
    // For now, return basic stats
    return {
      lessonsCompleted: completedLessons.size,
      videosCompleted: completedVideos.size,
      examsCompleted: Object.keys(examScores).length,
      totalExamsPassed: Object.values(examScores).filter(score => score.passed).length
    };
  };

  const resetProgress = () => {
    setCompletedLessons(new Set());
    setCompletedVideos(new Set());
    setExamScores({});
    
    localStorage.removeItem('completedLessons');
    localStorage.removeItem('completedVideos');
    localStorage.removeItem('examScores');
  };

  return {
    // State
    completedLessons,
    completedVideos,
    examScores,
    
    // Actions
    markLessonComplete,
    markVideoComplete,
    saveExamScore,
    
    // Queries
    isLessonCompleted,
    isVideoCompleted,
    getExamScore,
    getOverallProgress,
    
    // Utility
    resetProgress
  };
};