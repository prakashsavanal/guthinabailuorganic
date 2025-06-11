'use client';

import React, { useEffect, useState } from 'react';

export default function WhyD2C() {
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

    const element = document.getElementById('why-d2c');
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
    <section id="why-d2c" className="section-padding bg-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 
          className={`text-3xl md:text-4xl font-bold mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Why Direct-to-Customer?
        </h2>
        <div 
          className={`text-lg text-gray-700 leading-relaxed transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="mb-6">
            Our D2C model ensures that you receive the freshest products directly from the source, without unnecessary intermediaries. This allows us to maintain strict quality control, provide fair compensation to our farmers, and offer you genuine organic products at fair prices.
          </p>
          <p>
            It's about transparency, freshness, and building a direct relationship with you, our valued customer.
          </p>
        </div>
        <div 
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {[
            {
              icon: '🌿',
              title: 'Freshness Guaranteed',
              description: 'Direct from farm to your doorstep, ensuring maximum freshness and nutritional value.'
            },
            {
              icon: '💰',
              title: 'Fair Pricing',
              description: 'No middlemen means better prices for you and fair compensation for our farmers.'
            },
            {
              icon: '🤝',
              title: 'Direct Connection',
              description: 'Build a relationship with the source of your food, knowing exactly where it comes from.'
            }
          ].map((item, index) => (
            <div 
              key={item.title}
              className="bg-green-50 p-6 rounded-lg shadow-md"
            >
              <span className="text-4xl mb-4 block animate-bounce-in">{item.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 