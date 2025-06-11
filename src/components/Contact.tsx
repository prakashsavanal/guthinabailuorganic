'use client';

import React, { useEffect, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="contact" className="section-padding bg-green-700 text-white text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 
          className={`text-3xl md:text-4xl font-bold mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Ready to Experience Pure Organic Goodness?
        </h2>
        <p 
          className={`text-lg mb-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Join the Guthinabailu family and embark on a journey of health and trust. Stay tuned for our mobile app launch for seamless ordering and complete product traceability!
        </p>
        <div 
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <button
            className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
          >
            Stay Updated (Coming Soon)
          </button>
          <a
            href="mailto:info@guthinabailu.com"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
        <p 
          className={`mt-8 text-sm text-gray-200 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Guthinabailu Organic Food Product PvT LTD, Mangalore, India
        </p>
      </div>
    </section>
  );
} 