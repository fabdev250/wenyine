import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  BookOpen,
  Users,
  Award
} from 'lucide-react';
import { usePayment } from '../contexts/PaymentContext';

// Load video lessons from admin content or default lessons
const getVideoLessons = () => {
  const adminVideos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
  if (adminVideos.length > 0) {
    return adminVideos;
  }
  
  // Default video lessons with working video URLs
  return [
    {
      id: 1,
      title: "Introduction to Road Safety",
      description: "Learn the fundamentals of road safety and traffic rules in Rwanda.",
      duration: "5:32",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      chapter: "Introduction",
      topics: ["Basic traffic rules", "Road signs", "Driver responsibilities"]
    },
    {
      id: 2,
      title: "Understanding Traffic Signals",
      description: "Comprehensive guide to traffic lights, signs, and road markings.",
      duration: "4:18",
      thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      chapter: "Traffic Control",
      topics: ["Traffic lights", "Road signs", "Lane markings", "Intersections"]
    },
    {
      id: 3,
      title: "Safe Driving Techniques",
      description: "Essential driving techniques for safe and responsible driving.",
      duration: "6:47",
      thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      chapter: "Driving Techniques",
      topics: ["Defensive driving", "Speed control", "Following distance", "Weather conditions"]
    },
    {
      id: 4,
      title: "Parking and Maneuvering",
      description: "Master parallel parking, three-point turns, and other essential maneuvers.",
      duration: "3:25",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      chapter: "Practical Skills",
      topics: ["Parallel parking", "Three-point turns", "Backing up", "Hill parking"]
    },
    {
      id: 5,
      title: "Emergency Procedures",
      description: "What to do in case of breakdowns, accidents, and other emergencies.",
      duration: "7:12",
      thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      chapter: "Emergency Response",
      topics: ["Breakdown procedures", "Accident response", "First aid", "Emergency contacts"]
    },
    {
      id: 6,
      title: "Advanced Driving Skills",
      description: "Advanced techniques for experienced drivers.",
      duration: "8:54",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      chapter: "Advanced Techniques",
      topics: ["Night driving", "Highway merging", "Weather conditions", "Advanced parking"]
    }
  ];
};

const VIDEO_LESSONS = getVideoLessons();

const VideoLearning = ({ onClose }) => {
  const { hasAccess } = usePayment();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState({});
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Load completed videos from localStorage
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedVideos') || '[]');
    setCompletedVideos(new Set(completed));
  }, []);

  // Save completed videos to localStorage
  const saveCompletedVideos = (completed) => {
    localStorage.setItem('completedVideos', JSON.stringify([...completed]));
  };

  const video = VIDEO_LESSONS[currentVideo];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress(current);
      setDuration(total);

      // Mark video as completed when 90% watched
      if (current / total >= 0.9 && !completedVideos.has(video.id)) {
        const newCompleted = new Set([...completedVideos, video.id]);
        setCompletedVideos(newCompleted);
        saveCompletedVideos(newCompleted);
      }
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const saveNotes = () => {
    const videoNotes = { ...savedNotes, [video.id]: notes };
    setSavedNotes(videoNotes);
    localStorage.setItem('videoNotes', JSON.stringify(videoNotes));
  };

  const previousVideo = () => {
    if (currentVideo > 0) {
      setCurrentVideo(prev => prev - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const nextVideo = () => {
    if (currentVideo < VIDEO_LESSONS.length - 1) {
      setCurrentVideo(prev => prev + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCompletionPercentage = () => {
    return Math.round((completedVideos.size / VIDEO_LESSONS.length) * 100);
  };

  // Access control check
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 text-center">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Feature</h2>
            <p className="text-gray-600 mb-6">Video lessons are available to premium members only.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Lessons</h1>
            <p className="text-gray-600">Learn driving theory through interactive video content</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/50">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">{getCompletionPercentage()}% Complete</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl font-medium hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-white/50">
              {/* Video */}
              <div className="relative bg-black aspect-video">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  onTimeUpdate={handleProgressUpdate}
                  onLoadedMetadata={handleProgressUpdate}
                  className="w-full h-full object-cover"
                  onClick={togglePlayPause}
                />
                
                {/* Play/Pause Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        onClick={togglePlayPause}
                        className="bg-white/20 backdrop-blur-xl rounded-full p-6 hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-12 h-12 text-white ml-1" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div
                    ref={progressRef}
                    className="w-full bg-white/20 rounded-full h-2 mb-4 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlayPause}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                        />
                      </div>

                      <div className="text-white text-sm">
                        {formatTime(progress)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={previousVideo}
                        disabled={currentVideo === 0}
                        className="text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextVideo}
                        disabled={currentVideo === VIDEO_LESSONS.length - 1}
                        className="text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h2>
                    <p className="text-gray-600 mb-4">{video.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{video.chapter}</span>
                      </div>
                    </div>
                  </div>
                  
                  {completedVideos.has(video.id) && (
                    <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Topics Covered:</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Video Lessons</h3>
              <div className="space-y-3">
                {VIDEO_LESSONS.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentVideo(index);
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-300 ${
                      currentVideo === index
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-16 h-10 object-cover rounded-lg"
                        />
                        {completedVideos.has(lesson.id) && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {currentVideo === index && (
                          <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Play className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{getCompletionPercentage()}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {completedVideos.size} of {VIDEO_LESSONS.length} videos completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideoLearning;