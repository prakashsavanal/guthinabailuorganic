'use client';

import React, { useEffect, useState } from 'react';

export default function Trust() {
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

    const element = document.getElementById('trust');
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
    <section id="trust" className="section-padding bg-green-50">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 
          className={`text-3xl md:text-4xl font-bold mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Our Promise: Radical Transparency & Verifiable Purity
        </h2>
        <p 
          className={`text-lg text-gray-700 mb-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          In a market where trust is often compromised, Guthinabailu stands for absolute authenticity. We guarantee the purity of every product through a rigorous, transparent process:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🌱',
              title: 'Ethical Sourcing',
              description: 'Currently sourced from <strong>Guthinabailu farms</strong>. In the future, based on demand, we will directly partner with local farmers, ensuring fair practices and genuine origin.'
            },
            {
              icon: '🔬',
              title: 'Advanced Testing',
              description: 'Every batch undergoes stringent lab tests, including NMR for honey, to confirm purity and quality.'
            },
            {
              icon: '📲',
              title: 'Digital Traceability',
              description: 'Scan QR codes on our packaging to access batch-specific origin and lab report details.'
            }
          ].map((item, index) => (
            <div 
              key={item.title}
              className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-md transform transition-all duration-1000 delay-${(index + 3) * 100} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <span className="text-5xl mb-4 text-green-700 animate-bounce-in">{item.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p 
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 