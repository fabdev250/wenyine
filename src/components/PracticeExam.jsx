import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Play
} from 'lucide-react';
import { usePayment } from '../contexts/PaymentContext';

// Sample exam questions - in a real app, these would come from a database
const EXAM_QUESTIONS = [
  {
    id: 1,
    question: "What is the maximum speed limit in urban areas in Rwanda?",
    options: ["30 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correct: 1,
    explanation: "The maximum speed limit in urban areas in Rwanda is 50 km/h."
  },
  {
    id: 2,
    question: "When should you use hazard lights?",
    options: ["When parking", "During emergency stops", "When turning", "When overtaking"],
    correct: 1,
    explanation: "Hazard lights should be used during emergency stops to warn other drivers."
  },
  {
    id: 3,
    question: "What does a red traffic light mean?",
    options: ["Slow down", "Stop completely", "Proceed with caution", "Yield to traffic"],
    correct: 1,
    explanation: "A red traffic light means you must stop completely and wait."
  },
  {
    id: 4,
    question: "What is the minimum following distance on highways?",
    options: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
    correct: 2,
    explanation: "The minimum following distance on highways should be 3 seconds to ensure safe stopping distance."
  },
  {
    id: 5,
    question: "When is it mandatory to wear a seatbelt?",
    options: ["Only on highways", "Only in the front seat", "Always when driving", "Only during long trips"],
    correct: 2,
    explanation: "It is mandatory to wear a seatbelt always when driving or riding in a vehicle."
  },
  {
    id: 6,
    question: "What should you do at a STOP sign?",
    options: ["Slow down and proceed", "Stop completely then proceed", "Yield to traffic", "Stop only if cars are coming"],
    correct: 1,
    explanation: "At a STOP sign, you must come to a complete stop before proceeding."
  },
  {
    id: 7,
    question: "What is the legal blood alcohol limit for drivers in Rwanda?",
    options: ["0.05%", "0.08%", "0.02%", "0.00%"],
    correct: 3,
    explanation: "Rwanda has a zero-tolerance policy for drinking and driving (0.00% BAC)."
  },
  {
    id: 8,
    question: "When should you use your turn signals?",
    options: ["Only when turning left", "Only when changing lanes", "Before any directional change", "Only on highways"],
    correct: 2,
    explanation: "You should use turn signals before any directional change, including turns and lane changes."
  },
  {
    id: 9,
    question: "What should you do when an emergency vehicle approaches with sirens?",
    options: ["Speed up", "Pull over and stop", "Continue normally", "Flash your lights"],
    correct: 1,
    explanation: "When an emergency vehicle approaches with sirens, pull over to the right and stop."
  },
  {
    id: 10,
    question: "What is the purpose of ABS brakes?",
    options: ["To brake faster", "To prevent wheel lockup", "To increase speed", "To save fuel"],
    correct: 1,
    explanation: "ABS (Anti-lock Braking System) prevents wheel lockup during emergency braking, maintaining steering control."
  }
];

const PracticeExam = ({ examType = "general", onClose }) => {
  const { hasAccess } = usePayment();
  const [examState, setExamState] = useState('start'); // start, active, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions on component mount
  useEffect(() => {
    const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0 && examState === 'active') {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examState === 'active') {
      handleSubmitExam();
    }
  }, [timeLeft, examStarted, examState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    setExamState('active');
    setExamStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(20 * 60);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = shuffledQuestions.filter(question => 
      selectedAnswers[question.id] === question.correct
    ).length;
    return {
      correct: correctAnswers,
      total: shuffledQuestions.length,
      percentage: Math.round((correctAnswers / shuffledQuestions.length) * 100)
    };
  };

  const handleSubmitExam = () => {
    const score = calculateScore();
    
    // Save score to localStorage
    const examHistory = JSON.parse(localStorage.getItem('examHistory') || '[]');
    const newExamResult = {
      id: Date.now(),
      type: examType,
      score: score.percentage,
      correct: score.correct,
      total: score.total,
      date: new Date().toISOString(),
      timeSpent: (20 * 60) - timeLeft,
      passed: score.percentage >= 70
    };
    
    examHistory.push(newExamResult);
    localStorage.setItem('examHistory', JSON.stringify(examHistory));
    
    setExamState('completed');
  };

  const resetExam = () => {
    setExamState('start');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(20 * 60);
    setExamStarted(false);
    setShowExplanation(false);
    
    // Reshuffle questions
    const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  // Access control check
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 text-center">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Feature</h2>
            <p className="text-gray-600 mb-6">Practice exams are available to premium members only.</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Practice Exam</h1>
              <p className="text-gray-600">Test your knowledge with this comprehensive driving theory exam.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Time Limit</h3>
                <p className="text-gray-600 text-sm">20 minutes</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Questions</h3>
                <p className="text-gray-600 text-sm">{EXAM_QUESTIONS.length} multiple choice</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Pass Mark</h3>
                <p className="text-gray-600 text-sm">70% or higher</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={startExam}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Exam</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (examState === 'active' && shuffledQuestions.length > 0) {
    const question = shuffledQuestions[currentQuestion];
    const isAnswered = selectedAnswers[question.id] !== undefined;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {shuffledQuestions.length}
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round(((currentQuestion + 1) / shuffledQuestions.length) * 100)}% Complete
                </div>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className={timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Question */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 mb-6"
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full p-4 text-left rounded-2xl border transition-all duration-300 ${
                    selectedAnswers[question.id] === index
                      ? 'bg-blue-100 border-blue-300 text-blue-900'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[question.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[question.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Show explanation button if answered */}
            {isAnswered && !showExplanation && (
              <motion.button
                onClick={() => setShowExplanation(true)}
                className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Show Explanation
              </motion.button>
            )}

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    {selectedAnswers[question.id] === question.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {selectedAnswers[question.id] === question.correct ? 'Correct!' : 'Incorrect'}
                      </div>
                      <div className="text-gray-600">{question.explanation}</div>
                      {selectedAnswers[question.id] !== question.correct && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="font-medium">Correct answer: </span>
                          {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-4">
              {currentQuestion === shuffledQuestions.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examState === 'completed') {
    const score = calculateScore();
    const passed = score.percentage >= 70;
    const timeSpent = (20 * 60) - timeLeft;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-8">
              {passed ? (
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h1>
              <p className="text-gray-600 text-lg">
                {passed 
                  ? 'You passed the exam with flying colors!' 
                  : 'You need 70% to pass. Review the material and try again.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`rounded-2xl p-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {score.percentage}%
                </div>
                <div className="text-gray-600 font-medium">Your Score</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score.correct}/{score.total}
                </div>
                <div className="text-gray-600 font-medium">Correct Answers</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 font-medium">Time Spent</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Course</span>
              </button>
              <button
                onClick={resetExam}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default PracticeExam;