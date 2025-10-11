// Driving education content structure

export const theorySections = [
  {
    id: 'traffic-laws',
    title: 'Traffic Laws and Regulations',
    titleRw: 'Amategeko y\'Umuhanda',
    titleFr: 'Lois et Règlements de la Circulation',
    locked: false,
    description: 'Learn the fundamental traffic laws and regulations in Rwanda',
    descriptionRw: 'Wiga amategeko y\'ibanze y\'umuhanda mu Rwanda',
    descriptionFr: 'Apprenez les lois et règlements fondamentaux de la circulation au Rwanda',
    lessons: [
      {
        id: 'basic-rules',
        title: 'Basic Traffic Rules',
        titleRw: 'Amategeko y\'Ibanze y\'Umuhanda',
        titleFr: 'Règles de Base de la Circulation',
        content: `
# Basic Traffic Rules

## Right of Way
In Rwanda, vehicles drive on the right side of the road. Understanding right of way is crucial for safe driving:

- **At intersections**: Vehicles approaching from the right have priority
- **Roundabouts**: Give way to vehicles already in the roundabout
- **Pedestrian crossings**: Always stop for pedestrians

## Speed Limits
- **Urban areas**: 50 km/h maximum
- **Rural roads**: 90 km/h maximum  
- **Highways**: 120 km/h maximum
- **School zones**: 30 km/h maximum

## Traffic Lights
- **Red**: Complete stop required
- **Yellow**: Prepare to stop (don't accelerate)
- **Green**: Proceed with caution

## Important Notes
Always maintain a safe following distance of at least 3 seconds behind the vehicle in front of you.
        `,
        contentRw: `
# Amategeko y'Ibanze y'Umuhanda

## Uburenganzira bwo Kuyobora
Mu Rwanda, ibinyabiziga bitwara ku ruhande rw'iburyo. Gusobanukirwa uburenganzira bwo kuyobora ni ingenzi mu gutwara ubwoba buke:

- **Ku mihuriro**: Ibinyabiziga biva ku ruhande rw'iburyo bifite ubunyangamugayo
- **Ku mihuriro y'uruziga**: Tanga inzira ibinyabiziga bisanzwe biri mu ruziga
- **Aho abantu bambukiramo**: Buri gihe hagarara abantu

## Umuvuduko Mwinshi
- **Mu mijyi**: 50 km/h ntarengwa
- **Ku mihanda y'icyaro**: 90 km/h ntarengwa
- **Ku mihanda mikuru**: 120 km/h ntarengwa
- **Ahakurira amashuri**: 30 km/h ntarengwa

## Amatara y'Umuhanda
- **Umutuku**: Guhagarara byuzuye bisabwa
- **Umuhondo**: Witegure guhagarara (ntukongere umuvuduko)
- **Icyatsi**: Komeza witonze

## Ibintu Byo Kwibuka
Buri gihe bana intera zizeye nibura amasogonda 3 inyuma y'ikinyabiziga kiri imbere yawe.
        `,
        contentFr: `
# Règles de Base de la Circulation

## Priorité de Passage
Au Rwanda, les véhicules roulent sur le côté droit de la route. Comprendre la priorité de passage est crucial pour une conduite sûre:

- **Aux intersections**: Les véhicules venant de la droite ont la priorité
- **Rond-points**: Cédez le passage aux véhicules déjà dans le rond-point
- **Passages piétons**: Arrêtez-vous toujours pour les piétons

## Limitations de Vitesse
- **Zones urbaines**: 50 km/h maximum
- **Routes rurales**: 90 km/h maximum
- **Autoroutes**: 120 km/h maximum
- **Zones scolaires**: 30 km/h maximum

## Feux de Circulation
- **Rouge**: Arrêt complet requis
- **Jaune**: Préparez-vous à vous arrêter (n'accélérez pas)
- **Vert**: Procédez avec prudence

## Notes Importantes
Maintenez toujours une distance de sécurité d'au moins 3 secondes derrière le véhicule qui vous précède.
        `,
        duration: '15 min'
      },
      {
        id: 'road-signs',
        title: 'Road Signs and Markings',
        titleRw: 'Ibimenyetso by\'Umuhanda n\'Amakosa',
        titleFr: 'Panneaux et Marquages Routiers',
        content: `
# Road Signs and Markings

## Warning Signs (Yellow Triangle)
These signs alert you to potential hazards ahead:
- **Curve ahead**: Slow down and prepare for a turn
- **Hill or steep grade**: Adjust speed accordingly
- **School zone**: Reduce speed to 30 km/h
- **Pedestrian crossing**: Be alert for people crossing

## Prohibitory Signs (Red Circle)
These signs indicate what is forbidden:
- **No entry**: Do not enter this road
- **Speed limit**: Maximum speed allowed
- **No parking**: Parking prohibited in this area
- **No overtaking**: Passing other vehicles prohibited

## Mandatory Signs (Blue Circle)
These signs show what you must do:
- **Direction arrows**: Follow the indicated direction
- **Compulsory cycle lane**: Bicycles must use this lane
- **Minimum speed**: Maintain at least this speed

## Information Signs (Blue Rectangle)
These provide helpful information:
- **Hospital**: Medical facility nearby
- **Fuel station**: Gas station ahead
- **Parking**: Designated parking area
- **Tourist information**: Information center

## Road Markings
- **Solid white line**: No overtaking
- **Broken white line**: Overtaking allowed when safe
- **Double solid lines**: Absolutely no crossing
- **Yellow lines**: Parking restrictions
        `,
        duration: '20 min'
      }
    ]
  },
  {
    id: 'vehicle-operation',
    title: 'Vehicle Operation and Safety',
    titleRw: 'Gukoresha Ikinyabiziga n\'Umutekano',
    titleFr: 'Fonctionnement du Véhicule et Sécurité',
    locked: true,
    description: 'Master vehicle controls and safety procedures',
    descriptionRw: 'Menyera ibigenzura by\'ikinyabiziga n\'inzira z\'umutekano',
    descriptionFr: 'Maîtrisez les commandes du véhicule et les procédures de sécurité',
    lessons: [
      {
        id: 'vehicle-controls',
        title: 'Basic Vehicle Controls',
        titleRw: 'Ibigenzura by\'Ibanze by\'Ikinyabiziga',
        titleFr: 'Commandes de Base du Véhicule',
        content: 'Detailed content about vehicle controls...',
        duration: '25 min'
      },
      {
        id: 'safety-checks',
        title: 'Pre-driving Safety Checks',
        titleRw: 'Kugenzura Umutekano Mbere yo Gutwara',
        titleFr: 'Vérifications de Sécurité Avant Conduite',
        content: 'Comprehensive pre-driving checklist...',
        duration: '15 min'
      }
    ]
  },
  {
    id: 'defensive-driving',
    title: 'Defensive Driving Techniques',
    titleRw: 'Uburyo bwo Kwirinda',
    titleFr: 'Techniques de Conduite Défensive',
    locked: true,
    description: 'Learn advanced defensive driving strategies',
    descriptionRw: 'Wiga amayubahe yo kwirinda mu gutwara',
    descriptionFr: 'Apprenez les stratégies avancées de conduite défensive',
    lessons: [
      {
        id: 'hazard-perception',
        title: 'Hazard Perception and Response',
        titleRw: 'Kumenya Akaga no Gusubiza',
        titleFr: 'Perception et Réponse aux Dangers',
        content: 'How to identify and respond to road hazards...',
        duration: '30 min'
      }
    ]
  }
];

export const practiceExams = [
  {
    id: 'theory-test-1',
    title: 'Theory Test - Traffic Laws',
    titleRw: 'Ikizamini cy\'Injyana - Amategeko y\'Umuhanda',
    titleFr: 'Test Théorique - Lois de la Circulation',
    locked: false,
    duration: 30,
    questions: 20,
    description: 'Test your knowledge of basic traffic laws',
    descriptionRw: 'Gerageza ubumenyi bwawe mu mategeko y\'ibanze y\'umuhanda',
    descriptionFr: 'Testez vos connaissances des lois de base de la circulation',
    questions_data: [
      {
        id: 'q1',
        question: 'What is the maximum speed limit in urban areas in Rwanda?',
        questionRw: 'Ni uwuhe muvuduko mwinshi mu mijyi mu Rwanda?',
        questionFr: 'Quelle est la limitation de vitesse maximale en zone urbaine au Rwanda?',
        options: ['30 km/h', '50 km/h', '60 km/h', '70 km/h'],
        optionsRw: ['30 km/h', '50 km/h', '60 km/h', '70 km/h'],
        optionsFr: ['30 km/h', '50 km/h', '60 km/h', '70 km/h'],
        correct: 1,
        explanation: 'In urban areas, the maximum speed limit is 50 km/h for safety reasons.',
        explanationRw: 'Mu mijyi, umuvuduko mwinshi ni 50 km/h kubera impamvu z\'umutekano.',
        explanationFr: 'En zone urbaine, la vitesse maximale est de 50 km/h pour des raisons de sécurité.'
      },
      {
        id: 'q2',
        question: 'When approaching a roundabout, you should:',
        questionRw: 'Iyo ugeze ku ruziga, ugomba:',
        questionFr: 'En approchant d\'un rond-point, vous devez:',
        options: [
          'Enter immediately if no vehicles are visible',
          'Give way to vehicles already in the roundabout',
          'Speed up to merge quickly',
          'Honk your horn to announce your presence'
        ],
        optionsRw: [
          'Kwinjira ako kanya niba nta binyabiziga biboneka',
          'Tanga inzira ibinyabiziga bisanzwe biri mu ruziga',
          'Kongera umuvuduko kugira ngo winjire vuba',
          'Kuvuza impunga kugira ngo umenyekanishe ko uhari'
        ],
        optionsFr: [
          'Entrer immédiatement si aucun véhicule n\'est visible',
          'Céder le passage aux véhicules déjà dans le rond-point',
          'Accélérer pour s\'insérer rapidement',
          'Klaxonner pour annoncer votre présence'
        ],
        correct: 1,
        explanation: 'Always give way to vehicles already circulating in the roundabout.',
        explanationRw: 'Buri gihe tanga inzira ibinyabiziga bisanzwe bizenguruka mu ruziga.',
        explanationFr: 'Cédez toujours le passage aux véhicules qui circulent déjà dans le rond-point.'
      }
    ]
  },
  {
    id: 'theory-test-2',
    title: 'Theory Test - Road Signs',
    titleRw: 'Ikizamini cy\'Injyana - Ibimenyetso by\'Umuhanda',
    titleFr: 'Test Théorique - Panneaux Routiers',
    locked: true,
    duration: 25,
    questions: 15,
    description: 'Comprehensive test on road signs and markings',
    descriptionRw: 'Ikizamini cyuzuye ku bimenyetso by\'umuhanda n\'amakosa',
    descriptionFr: 'Test complet sur les panneaux routiers et marquages'
  },
  {
    id: 'mock-exam-full',
    title: 'Full Mock Exam',
    titleRw: 'Ikizamini Cyuzuye cyo Kwigeneza',
    titleFr: 'Examen Blanc Complet',
    locked: true,
    duration: 45,
    questions: 40,
    description: 'Complete practice exam simulating the real driving test',
    descriptionRw: 'Ikizamini cyuzuye cyo kwigeneza kigereranya ikizamini nyacyo cyo gutwara',
    descriptionFr: 'Examen pratique complet simulant le vrai test de conduite'
  }
];

export const videos = [
  {
    id: 'intro-driving',
    title: 'Introduction to Safe Driving',
    titleRw: 'Imenyekanisha ku Gutwara Ubwoba buke',
    titleFr: 'Introduction à la Conduite Sécuritaire',
    description: 'Basic concepts of safe driving for beginners',
    descriptionRw: 'Ibintu by\'ibanze byo gutwara ubwoba buke ku batangiza',
    descriptionFr: 'Concepts de base de la conduite sécuritaire pour débutants',
    duration: '12:30',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    url: 'https://example.com/video1', // Replace with actual video URLs
    locked: false,
    category: 'basics'
  },
  {
    id: 'vehicle-controls',
    title: 'Understanding Vehicle Controls',
    titleRw: 'Gusobanukirwa Ibigenzura by\'Ikinyabiziga',
    titleFr: 'Comprendre les Commandes du Véhicule',
    description: 'Complete guide to vehicle dashboard and controls',
    descriptionRw: 'Ibimenyetso byuzuye ku kibaho cy\'ikinyabiziga n\'ibigenzura',
    descriptionFr: 'Guide complet du tableau de bord et commandes du véhicule',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=400&h=225&fit=crop',
    url: 'https://example.com/video2',
    locked: true,
    category: 'vehicle'
  },
  {
    id: 'parking-techniques',
    title: 'Parking Techniques and Tips',
    titleRw: 'Uburyo bwo Guhagarara n\'Inama',
    titleFr: 'Techniques et Conseils de Stationnement',
    description: 'Master parallel, perpendicular, and angle parking',
    descriptionRw: 'Menyera guhagarara mu buryo buhuriye, butanyuze, n\'mu kigezi',
    descriptionFr: 'Maîtrisez le stationnement parallèle, perpendiculaire et en angle',
    duration: '15:20',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    url: 'https://example.com/video3',
    locked: true,
    category: 'skills'
  },
  {
    id: 'highway-driving',
    title: 'Highway Driving Safety',
    titleRw: 'Umutekano wo Gutwara ku Mihanda Mikuru',
    titleFr: 'Sécurité de Conduite sur Autoroute',
    description: 'Essential skills for safe highway driving',
    descriptionRw: 'Ubuhanga bwingenzi bwo gutwara ubwoba buke ku mihanda mikuru',
    descriptionFr: 'Compétences essentielles pour une conduite sûre sur autoroute',
    duration: '22:10',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=225&fit=crop',
    url: 'https://example.com/video4',
    locked: true,
    category: 'advanced'
  }
];

export const coursePricing = {
  basic: {
    price: 15000,
    currency: 'RWF',
    name: 'Basic Access',
    nameRw: 'Kwinjira kw\'Ibanze',
    nameFr: 'Accès de Base',
    description: 'Access to theory lessons only',
    descriptionRw: 'Kwinjira mu masomo y\'injyana gusa',
    descriptionFr: 'Accès aux leçons théoriques seulement',
    features: [
      'Theory lessons',
      'Basic progress tracking',
      '30 days access'
    ],
    featuresRw: [
      'Amasomo y\'injyana',
      'Gukurikirana iterambere ry\'ibanze',
      'Kwinjira kw\'iminsi 30'
    ],
    featuresFr: [
      'Leçons théoriques',
      'Suivi de base des progrès',
      'Accès pendant 30 jours'
    ]
  },
  premium: {
    price: 35000,
    currency: 'RWF',
    name: 'Premium Access',
    nameRw: 'Kwinjira Gaciro',
    nameFr: 'Accès Premium',
    description: 'Full access to all content including videos and exams',
    descriptionRw: 'Kwinjira kwuzuye mu bintu byose harimo amashusho n\'ibizamini',
    descriptionFr: 'Accès complet à tout le contenu incluant vidéos et examens',
    features: [
      'All theory lessons',
      'Practice exams',
      'Video tutorials',
      'Progress tracking',
      'Certificate on completion',
      '90 days access'
    ],
    featuresRw: [
      'Amasomo yose y\'injyana',
      'Ibizamini byo kwigeneza',
      'Amashusho yo kwigisha',
      'Gukurikirana iterambere',
      'Icyemezo iyo urangije',
      'Kwinjira kw\'iminsi 90'
    ],
    featuresFr: [
      'Toutes les leçons théoriques',
      'Examens pratiques',
      'Tutoriels vidéo',
      'Suivi des progrès',
      'Certificat à la fin',
      'Accès pendant 90 jours'
    ]
  }
};