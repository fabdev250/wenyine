import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useAuth } from '../contexts/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExamReports = () => {
  const { user } = useAuth();
  const [selectedExam, setSelectedExam] = useState(null);
  const [viewMode, setViewMode] = useState('overview');
  const reportRef = useRef();

  // Mock exam data
  const examHistory = [
    {
      id: 1,
      title: 'Amategeko y\'Umuhanda - Ibanze',
      date: '2024-01-15',
      score: 85,
      status: 'passed',
      duration: '28 min',
      totalQuestions: 20,
      correctAnswers: 17,
      timePerQuestion: 84,
      category: 'theory',
      details: {
        categories: [
          { name: 'Ibimenyetso by\'Umuhanda', score: 90, total: 5 },
          { name: 'Amategeko y\'Ubwoba', score: 80, total: 5 },
          { name: 'Kwirinda Impanuka', score: 85, total: 5 },
          { name: 'Gukoresha Umuhanda', score: 80, total: 5 }
        ],
        timeAnalysis: [
          { question: 1, time: 45, correct: true },
          { question: 2, time: 62, correct: true },
          { question: 3, time: 89, correct: false },
          { question: 4, time: 76, correct: true },
          { question: 5, time: 55, correct: true },
          { question: 6, time: 112, correct: false },
          { question: 7, time: 67, correct: true },
          { question: 8, time: 88, correct: true },
          { question: 9, time: 93, correct: true },
          { question: 10, time: 71, correct: true },
          { question: 11, time: 85, correct: true },
          { question: 12, time: 99, correct: false },
          { question: 13, time: 56, correct: true },
          { question: 14, time: 78, correct: true },
          { question: 15, time: 82, correct: true },
          { question: 16, time: 91, correct: true },
          { question: 17, time: 66, correct: true },
          { question: 18, time: 105, correct: true },
          { question: 19, time: 73, correct: true },
          { question: 20, time: 59, correct: true }
        ]
      }
    },
    {
      id: 2,
      title: 'Ibimenyetso by\'Umuhanda',
      date: '2024-01-10',
      score: 92,
      status: 'passed',
      duration: '32 min',
      totalQuestions: 25,
      correctAnswers: 23,
      timePerQuestion: 77,
      category: 'signs',
      details: {
        categories: [
          { name: 'Ibimenyetso by\'Itegeko', score: 95, total: 8 },
          { name: 'Ibimenyetso by\'Ubwoba', score: 90, total: 7 },
          { name: 'Ibimenyetso by\'Ubuyobozi', score: 88, total: 5 },
          { name: 'Ibimenyetso by\'Amakuru', score: 95, total: 5 }
        ]
      }
    },
    {
      id: 3,
      title: 'Ibyihutirwa n\'Ubwoba',
      date: '2024-01-05',
      score: 68,
      status: 'failed',
      duration: '18 min',
      totalQuestions: 15,
      correctAnswers: 10,
      timePerQuestion: 72,
      category: 'emergency',
      details: {
        categories: [
          { name: 'Gufasha Abakomeretse', score: 60, total: 5 },
          { name: 'Kwirinda Impanuka', score: 70, total: 5 },
          { name: 'Imihindagurikire y\'Ikirere', score: 75, total: 5 }
        ]
      }
    }
  ];

  const performanceData = {
    labels: ['Ukwakira', 'Ugushyingo', 'Ukuboza', 'Mutarama'],
    datasets: [
      {
        label: 'Amanota',
        data: [72, 78, 85, 92],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryPerformance = {
    labels: ['Amategeko', 'Ibimenyetso', 'Ubwoba', 'Ibikorwa'],
    datasets: [
      {
        data: [85, 92, 68, 78],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 0
      }
    ]
  };

  const timeAnalysisData = selectedExam ? {
    labels: selectedExam.details.timeAnalysis.map((_, i) => `Q${i + 1}`),
    datasets: [
      {
        label: 'Igihe (amasegonda)',
        data: selectedExam.details.timeAnalysis.map(q => q.time),
        backgroundColor: selectedExam.details.timeAnalysis.map(q => 
          q.correct ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        ),
        borderColor: selectedExam.details.timeAnalysis.map(q => 
          q.correct ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 1
      }
    ]
  } : null;

  const generatePDF = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`exam-report-${selectedExam?.id || 'overview'}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Raporo z'Ibizamini</h1>
            <p className="text-gray-600">Reba iterambere ryawe n'amanota y'ibizamini</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={generatePDF}
              className="bg-green-100 text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-200 transition-colors flex items-center space-x-2"
            >
              <span>📥</span>
              <span>Kuramo PDF</span>
            </button>
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition-colors flex items-center space-x-2">
              <span>📤</span>
              <span>Gusangira</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-xl rounded-2xl p-1 overflow-x-auto">
            <button
              onClick={() => {setViewMode('overview'); setSelectedExam(null);}}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                viewMode === 'overview'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📊</span>
              <span className="font-medium">Muri Rusange</span>
            </button>
            <button
              onClick={() => setViewMode('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                viewMode === 'history'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📝</span>
              <span className="font-medium">Amateka</span>
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                viewMode === 'analytics'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📈</span>
              <span className="font-medium">Isesengura</span>
            </button>
          </div>
        </div>

        <div ref={reportRef}>
          {viewMode === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-2xl font-bold text-blue-600">{examHistory.length}</div>
                  <div className="text-sm text-gray-600">Ibizamini Byose</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-2xl font-bold text-green-600">{examHistory.filter(e => e.status === 'passed').length}</div>
                  <div className="text-sm text-gray-600">Byatsindiye</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(examHistory.reduce((acc, exam) => acc + exam.score, 0) / examHistory.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Ikigereranyo</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 text-center">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(examHistory.reduce((acc, exam) => acc + exam.timePerQuestion, 0) / examHistory.length)}s
                  </div>
                  <div className="text-sm text-gray-600">Igihe/Ikibazo</div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Iterambere ry'Igihe</h3>
                  <div className="h-64">
                    <Line 
                      data={performanceData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100
                          }
                        }
                      }} 
                    />
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Imibare ku Bwoko</h3>
                  <div className="h-64">
                    <Doughnut 
                      data={categoryPerformance}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Exams */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ibizamini Byaheruka</h3>
                <div className="space-y-4">
                  {examHistory.slice(0, 5).map((exam) => (
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
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            exam.status === 'passed' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {exam.score}%
                          </div>
                          <div className="text-sm text-gray-500">{exam.correctAnswers}/{exam.totalQuestions}</div>
                        </div>
                        <button 
                          onClick={() => {setSelectedExam(exam); setViewMode('detail');}}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Reba
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Amateka y'Ibizamini Byose</h3>
                <div className="flex space-x-2">
                  <select className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm">
                    <option>Byose</option>
                    <option>Byatsindiye</option>
                    <option>Bitatsindiye</option>
                  </select>
                  <select className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm">
                    <option>Ukwezi gushize</option>
                    <option>Amezi 3 ashize</option>
                    <option>Byose</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ikizamini</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Itariki</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Amanota</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Igihe</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Imibare</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ibikorwa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examHistory.map((exam) => (
                      <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{exam.title}</div>
                          <div className="text-sm text-gray-500">{exam.category}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{exam.date}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            exam.status === 'passed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {exam.score}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{exam.duration}</td>
                        <td className="py-4 px-4 text-gray-600">{exam.correctAnswers}/{exam.totalQuestions}</td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => {setSelectedExam(exam); setViewMode('detail');}}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Reba birambuye
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {viewMode === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Strengths and Weaknesses */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Imbaraga n'Intege</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                      <span className="mr-2">💪</span>
                      Imbaraga zawe
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Ibimenyetso by'Umuhanda</span>
                        <span className="font-semibold text-green-600">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Amategeko y'Umuhanda</span>
                        <span className="font-semibold text-green-600">85%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                      <span className="mr-2">📚</span>
                      Bikeneye kwiyongera
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Ibyihutirwa n'Ubwoba</span>
                        <span className="font-semibold text-red-600">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Ibikorwa by'Ubushinzwe</span>
                        <span className="font-semibold text-red-600">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Recommendations */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Inama z'Ubushakashatsi</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Ishungura ry'Ibanze</h4>
                    <p className="text-sm text-blue-700">Wifuze kwiyongera ku byihutirwa. Saba amasomo y'ubwoba n'intege-nke.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-2xl">
                    <h4 className="font-semibold text-yellow-800 mb-2">⏱️ Gucunga Igihe</h4>
                    <p className="text-sm text-yellow-700">Ukoresha igihe kinini ku bibazo. Gerageza gukora vuba cyane.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <h4 className="font-semibold text-green-800 mb-2">📈 Komeza</h4>
                    <p className="text-sm text-green-700">Ufite imbaraga mu bimenyetso by'umuhanda. Komeza ubwoba.</p>
                  </div>
                </div>
              </div>

              {/* Time Analysis */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Isesengura ry'Igihe</h3>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">84s</div>
                    <div className="text-sm text-gray-600">Ikigereranyo cy'Igihe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">45s</div>
                    <div className="text-sm text-gray-600">Igihe Gito Cyane</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">112s</div>
                    <div className="text-sm text-gray-600">Igihe Kinini Cyane</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-sm text-gray-700">
                    <strong>Icyifuzo:</strong> Gerageza gufata hagati ya 60-90 amasegonda ku kibazo kimwe kugirango ubone igihe cyo gusubiza ibindi bibazo.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'detail' && selectedExam && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <div className="mb-6">
                <button
                  onClick={() => setViewMode('history')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>←</span>
                  <span>Subira</span>
                </button>
              </div>

              {/* Exam Header */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedExam.title}</h2>
                    <p className="text-gray-600">{selectedExam.date} • {selectedExam.duration}</p>
                  </div>
                  <div className={`text-3xl font-bold ${
                    selectedExam.status === 'passed' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedExam.score}%
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-2xl">
                    <div className="text-xl font-bold text-blue-600">{selectedExam.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Ibisubizo by'ukuri</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-2xl">
                    <div className="text-xl font-bold text-red-600">{selectedExam.totalQuestions - selectedExam.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Ibisubizo bibi</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <div className="text-xl font-bold text-purple-600">{selectedExam.timePerQuestion}s</div>
                    <div className="text-sm text-gray-600">Igihe/Ikibazo</div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              {selectedExam.details && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Imibare ku Bwoko</h3>
                    <div className="space-y-4">
                      {selectedExam.details.categories.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-900">{category.name}</span>
                            <span className="font-semibold">{category.score}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-3">
                            <motion.div
                              className={`h-3 rounded-full ${
                                category.score >= 80 ? 'bg-green-500' :
                                category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${category.score}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Analysis Chart */}
                  {timeAnalysisData && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Isesengura ry'Igihe</h3>
                      <div className="h-64">
                        <Bar 
                          data={timeAnalysisData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: 'Igihe (amasegonda)'
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamReports;