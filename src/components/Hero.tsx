'use client';

import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

interface HeroProps {
  onShowSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onShowSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Optional: Add any side effects when Hero becomes visible
    }
  }, [isVisible]);

  return (
    <InView as="section" id="hero" onChange={setIsVisible} threshold={0.3} className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-500 to-green-700 text-white overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className={`relative z-10 text-white px-6 py-12 rounded-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg animate-bounce-in">
          Guthinabailu Organics
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md animate-slide-up">
          Pure & Natural Products Directly from Our Farms to Your Home
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <button
            onClick={() => onShowSection('products')}
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
          >
            Shop Now
          </button>
          <button
            onClick={() => onShowSection('about')}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-green-700 transition duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a
        href="#products"
        className={`absolute bottom-8 z-10 text-white animate-bounce ${isVisible ? 'block' : 'hidden'}`}
        aria-label="Scroll down to products"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </a>
    </InView>
  );
};

export default Hero; 