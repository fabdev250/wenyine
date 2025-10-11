import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      avatar: '👨‍💼',
      bio: 'Full-stack developer with 8+ years of experience building scalable web applications.',
      skills: ['React', 'Node.js', 'AWS', 'Leadership']
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Designer',
      avatar: '👩‍🎨',
      bio: 'Creative designer passionate about creating intuitive user experiences and beautiful interfaces.',
      skills: ['UI/UX', 'Figma', 'Branding', 'User Research']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Developer',
      avatar: '👨‍💻',
      bio: 'Backend specialist with expertise in scalable architectures and database optimization.',
      skills: ['Python', 'PostgreSQL', 'Docker', 'DevOps']
    },
    {
      name: 'Emily Davis',
      role: 'Project Manager',
      avatar: '👩‍💼',
      bio: 'Experienced project manager ensuring smooth delivery and client satisfaction.',
      skills: ['Agile', 'Communication', 'Strategy', 'Client Relations']
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is built with attention to detail and best practices.'
    },
    {
      icon: '🤝',
      title: 'Client Partnership',
      description: 'We work as an extension of your team, understanding your goals and challenges deeply.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions for our clients.'
    },
    {
      icon: '🔄',
      title: 'Continuous Learning',
      description: 'Our team constantly evolves, learning new technologies and improving our skills.'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Started as a small freelance team with a vision to create exceptional digital experiences.'
    },
    {
      year: '2020',
      title: 'First Major Client',
      description: 'Landed our first enterprise client and delivered a successful e-commerce platform.'
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Grew our team to include specialists in design, development, and project management.'
    },
    {
      year: '2022',
      title: '100+ Projects',
      description: 'Reached a milestone of 100 completed projects with clients across various industries.'
    },
    {
      year: '2023',
      title: 'Global Reach',
      description: 'Expanded our services globally, working with clients from over 15 countries.'
    },
    {
      year: '2024',
      title: 'Innovation Lab',
      description: 'Launched our innovation lab to explore emerging technologies like AI and Web3.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '📊' },
    { number: '50+', label: 'Happy Clients', icon: '😊' },
    { number: '5', label: 'Years Experience', icon: '🕰️' },
    { number: '15', label: 'Countries Served', icon: '🌍' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-600/10"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                About Wenyine
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of designers, developers, and strategists dedicated to creating digital experiences that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg">
                🎆
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2019, Wenyine started as a small team of developers who believed that great software could change the world. We began by helping local businesses establish their online presence, and over the years, we've grown into a trusted partner for companies worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, we combine technical expertise with creative vision to deliver solutions that not only meet our clients' needs but exceed their expectations. Our journey has been marked by continuous learning, innovation, and an unwavering commitment to quality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every project we take on is an opportunity to push boundaries, solve complex problems, and create something meaningful that drives real business results.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                    🔭
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the go-to technology partner for businesses looking to innovate, scale, and succeed in the digital landscape.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These numbers represent the trust our clients place in us and the results we deliver together.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we work with our clients and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented individuals who make the magic happen behind every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-6xl mb-6">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and evolution as a company.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse text-right' : 'flex-row text-left'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-1 px-8">
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              We'd love to hear about your project and discuss how our team can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <Link
                to="/contact"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
