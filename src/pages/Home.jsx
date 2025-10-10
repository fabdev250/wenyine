import React from 'react';

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Wenyine</h1>
        <p className="text-lg text-gray-600 mb-6">We build delightful web experiences. Explore our services and get in touch.</p>
        <div className="space-x-4">
          <a href="/services" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold">Our Services</a>
          <a href="/contact" className="inline-block border border-gray-200 px-6 py-3 rounded-2xl font-medium">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default Home;