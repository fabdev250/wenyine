import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Amategeko y\'Umuhanda - Intangiriro',
      titleEn: 'Traffic Laws - Beginner',
      titleFr: 'Code de la Route - Débutant',
      category: 'theory',
      level: 'beginner',
      duration: '4 ibyumweru',
      durationEn: '4 weeks',
      durationFr: '4 semaines',
      price: 25000,
      image: '/api/placeholder/400/250',
      description: 'Wiga amategeko shingiro y\'umuhanda, ibimenyetso by\'ibanze, n\'amahame y\'umutekano',
      descriptionEn: 'Learn basic traffic laws, fundamental road signs, and safety principles',
      descriptionFr: 'Apprenez les lois de base de la circulation, les panneaux fondamentaux et les principes de sécurité',
      features: [
        'Amategeko 50 y\'ibanze',
        'Ibimenyetso 200 by\'umuhanda',
        'Ibizamini byo kwigeneza',
        'Icyemezo cy\'ubumenyi'
      ],
      featuresEn: [
        '50 basic traffic laws',
        '200 road signs',
        'Practice tests',
        'Certificate of completion'
      ],
      featuresFr: [
        '50 lois de circulation de base',
        '200 panneaux de signalisation',
        'Tests pratiques',
        'Certificat d\'achèvement'
      ]
    },
    {
      id: 2,
      title: 'Gutwara Imodoka - Ibanze',
      titleEn: 'Car Driving - Beginner',
      titleFr: 'Conduite Auto - Débutant',
      category: 'practical',
      level: 'beginner',
      duration: '6 ibyumweru',
      durationEn: '6 weeks',
      durationFr: '6 semaines',
      price: 45000,
      image: '/api/placeholder/400/250',
      description: 'Wiga gutwara imodoka guhera ku ntangiriro: gukoresha clutch, guhindura vitesse, guhagarara',
      descriptionEn: 'Learn to drive from scratch: using clutch, changing gears, parking',
      descriptionFr: 'Apprenez à conduire depuis le début: utiliser l\'embrayage, changer les vitesses, se garer',
      features: [
        'Amasomo 20 y\'ibikorwa',
        'Umwarimu w\'inzobere',
        'Imodoka igezweho',
        'Ikizamini cy\'ubunyangamugayo'
      ],
      featuresEn: [
        '20 practical lessons',
        'Expert instructor',
        'Modern vehicle',
        'Official exam preparation'
      ],
      featuresFr: [
        '20 leçons pratiques',
        'Instructeur expert',
        'Véhicule moderne',
        'Préparation à l\'examen officiel'
      ]
    },
    {
      id: 3,
      title: 'Ibyihutirwa mu Muhanda',
      titleEn: 'Road Emergencies',
      titleFr: 'Urgences Routières',
      category: 'emergency',
      level: 'intermediate',
      duration: '2 ibyumweru',
      durationEn: '2 weeks',
      durationFr: '2 semaines',
      price: 15000,
      image: '/api/placeholder/400/250',
      description: 'Wige gukemura ibibazo by\'ibyihutirwa: kwicuza, gufasha abakomeretse, guhagarika imodoka',
      descriptionEn: 'Learn to handle emergencies: breakdowns, helping injured, vehicle maintenance',
      descriptionFr: 'Apprenez à gérer les urgences: pannes, aide aux blessés, entretien véhicule',
      features: [
        'Kwicuza mu muhanda',
        'Ubufasha bwa mbere',
        'Guhamagara ubufasha',
        'Umutekano w\'imodoka'
      ],
      featuresEn: [
        'Roadside repairs',
        'First aid basics',
        'Emergency calls',
        'Vehicle safety'
      ],
      featuresFr: [
        'Réparations routières',
        'Premiers secours',
        'Appels d\'urgence',
        'Sécurité véhicule'
      ]
    },
    {
      id: 4,
      title: 'Amategeko y\'Umuhanda - Birambuye',
      titleEn: 'Advanced Traffic Laws',
      titleFr: 'Code Avancé de la Route',
      category: 'theory',
      level: 'advanced',
      duration: '3 ibyumweru',
      durationEn: '3 weeks',
      durationFr: '3 semaines',
      price: 30000,
      image: '/api/placeholder/400/250',
      description: 'Wiga amategeko maremare, ibyiciro byinshi by\'imodoka, n\'amahame y\'ubucuruzi',
      descriptionEn: 'Learn complex laws, different vehicle categories, and commercial regulations',
      descriptionFr: 'Apprenez les lois complexes, différentes catégories de véhicules et réglementations commerciales',
      features: [
        'Amategeko y\'imodoka z\'ubucuruzi',
        'Uburenganzira n\'inshingano',
        'Ubwishyu n\'ibihano',
        'Ikizamini cy\'ubuhanga'
      ],
      featuresEn: [
        'Commercial vehicle laws',
        'Rights and responsibilities',
        'Fees and penalties',
        'Professional exam'
      ],
      featuresFr: [
        'Lois véhicules commerciaux',
        'Droits et responsabilités',
        'Frais et pénalités',
        'Examen professionnel'
      ]
    },
    {
      id: 5,
      title: 'Gutwara Pikipiki',
      titleEn: 'Motorcycle Driving',
      titleFr: 'Conduite Moto',
      category: 'practical',
      level: 'intermediate',
      duration: '4 ibyumweru',
      durationEn: '4 weeks',
      durationFr: '4 semaines',
      price: 35000,
      image: '/api/placeholder/400/250',
      description: 'Wige gutwara pikipiki mu buryo butinze: kubana n\'indi modoka, gutambuka, guhagarara',
      descriptionEn: 'Learn safe motorcycle riding: traffic interaction, turning, parking',
      descriptionFr: 'Apprenez la conduite sécuritaire de moto: interaction trafic, virages, stationnement',
      features: [
        'Amasomo 15 y\'ibikorwa',
        'Pikipiki z\'ubwiyunge',
        'Umutekano w\'umwambaro',
        'Ikizamini cya leta'
      ],
      featuresEn: [
        '15 practical lessons',
        'Training motorcycles',
        'Safety equipment',
        'State examination'
      ],
      featuresFr: [
        '15 leçons pratiques',
        'Motos d\'entraînement',
        'Équipement sécurité',
        'Examen d\'état'
      ]
    },
    {
      id: 6,
      title: 'Ubufasha bwa Mbere mu Muhanda',
      titleEn: 'Road First Aid',
      titleFr: 'Premiers Secours Routiers',
      category: 'emergency',
      level: 'beginner',
      duration: '1 icyumweru',
      durationEn: '1 week',
      durationFr: '1 semaine',
      price: 10000,
      image: '/api/placeholder/400/250',
      description: 'Wige gufasha abakomeretse b\'impanuka z\'imodoka: kuraguza amaraso, gufasha abahumeke',
      descriptionEn: 'Learn to help accident victims: stop bleeding, help unconscious people',
      descriptionFr: 'Apprenez à aider les victimes d\'accidents: arrêter saignements, aider inconscients',
      features: [
        'Kuraguza amaraso',
        'Gufasha abahumeke',
        'Guhamagara ubufasha',
        'Icyemezo cy\'ubufasha'
      ],
      featuresEn: [
        'Stop bleeding',
        'Help unconscious',
        'Emergency calls',
        'First aid certificate'
      ],
      featuresFr: [
        'Arrêter saignements',
        'Aider inconscients',
        'Appels urgence',
        'Certificat premiers secours'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Byose', nameEn: 'All', nameFr: 'Tous', icon: '📚' },
    { id: 'theory', name: 'Injyana', nameEn: 'Theory', nameFr: 'Théorie', icon: '📖' },
    { id: 'practical', name: 'Ibikorwa', nameEn: 'Practical', nameFr: 'Pratique', icon: '🚗' },
    { id: 'emergency', name: 'Ibyihutirwa', nameEn: 'Emergency', nameFr: 'Urgence', icon: '🚨' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getCourseTitle = (course) => {
    switch (currentLanguage) {
      case 'en': return course.titleEn;
      case 'fr': return course.titleFr;
      default: return course.title;
    }
  };

  const getCourseDescription = (course) => {
    switch (currentLanguage) {
      case 'en': return course.descriptionEn;
      case 'fr': return course.descriptionFr;
      default: return course.description;
    }
  };

  const getCourseFeatures = (course) => {
    switch (currentLanguage) {
      case 'en': return course.featuresEn;
      case 'fr': return course.featuresFr;
      default: return course.features;
    }
  };

  const getCourseDuration = (course) => {
    switch (currentLanguage) {
      case 'en': return course.durationEn;
      case 'fr': return course.durationFr;
      default: return course.duration;
    }
  };

  const getCategoryName = (category) => {
    switch (currentLanguage) {
      case 'en': return category.nameEn;
      case 'fr': return category.nameFr;
      default: return category.name;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'en' ? 'Our Courses' : 
               currentLanguage === 'fr' ? 'Nos Cours' : 'Amasomo Yacu'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage === 'en' 
                ? 'Master driving skills with our comprehensive courses designed for all levels. From basic traffic laws to advanced practical training.'
                : currentLanguage === 'fr'
                ? 'Maîtrisez les compétences de conduite avec nos cours complets conçus pour tous les niveaux. Des lois de circulation de base à la formation pratique avancée.'
                : 'Menya ubuhanga bwo gutwara imodoka hamwe n\'amasomo yacu yuzuye yakozwe ku rwego rwose. Uhereye ku mategeko shingiro y\'umuhanda ugera ku myitozo igoye.'}
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/50">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{getCategoryName(category)}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-white/50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level === 'beginner' ? 
                      (currentLanguage === 'en' ? 'Beginner' : currentLanguage === 'fr' ? 'Débutant' : 'Intangiriro') :
                     course.level === 'intermediate' ? 
                      (currentLanguage === 'en' ? 'Intermediate' : currentLanguage === 'fr' ? 'Intermédiaire' : 'Hagati') :
                      (currentLanguage === 'en' ? 'Advanced' : currentLanguage === 'fr' ? 'Avancé' : 'Bigoye')
                    }
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="text-2xl font-bold">{course.price.toLocaleString()}</div>
                  <div className="text-sm opacity-90">RWF</div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{getCourseTitle(course)}</h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {getCourseDescription(course)}
                </p>

                {/* Course Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>{getCourseDuration(course)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📋</span>
                    <span>{getCourseFeatures(course).length} {
                      currentLanguage === 'en' ? 'modules' : 
                      currentLanguage === 'fr' ? 'modules' : 'ibice'
                    }</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {getCourseFeatures(course).slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    {currentLanguage === 'en' ? 'Enroll Now' : 
                     currentLanguage === 'fr' ? 'S\'inscrire' : 'Kwiyandikisha'}
                  </button>
                  <Link
                    to={`/course/${course.id}`}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-sm text-center hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                  >
                    {currentLanguage === 'en' ? 'Learn More' : 
                     currentLanguage === 'fr' ? 'En savoir plus' : 'Menya Byinshi'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-lg border border-white/50 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'en' ? 'Ready to Start Your Driving Journey?' : 
               currentLanguage === 'fr' ? 'Prêt à Commencer Votre Parcours de Conduite?' : 'Witeguye Gutangira Urugendo rwo Kwiga Gutwara?'}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {currentLanguage === 'en' 
                ? 'Join thousands of successful drivers who learned with us. Get your license faster with our proven methods.'
                : currentLanguage === 'fr'
                ? 'Rejoignez des milliers de conducteurs qui ont appris avec nous. Obtenez votre permis plus rapidement avec nos méthodes éprouvées.'
                : 'Jya hamwe n\'abashofera b\'ibihumbi bose bwigiye na twe. Bonka uruhushya rwo gutwara vuba ukoresheje uburyo bwacu bwemewe.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {currentLanguage === 'en' ? 'Browse All Courses' : 
                 currentLanguage === 'fr' ? 'Voir Tous les Cours' : 'Reba Amasomo Yose'}
              </button>
              <Link
                to="/contact"
                className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                {currentLanguage === 'en' ? 'Contact Us' : 
                 currentLanguage === 'fr' ? 'Nous Contacter' : 'Twandikire'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;