'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`max-w-6xl mx-auto ${inView ? 'animate-fade-in' : ''}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">🏡 About Guthinabailu</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing the purest, most authentic organic products—directly from our farms to your table.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Vision & Mission Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🌟</span>
                <h3 className="text-2xl font-bold">Vision & Mission</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3 text-amber-800">Our Vision</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our <strong>vision</strong> at Guthinabailu Organic Food Product PvT LTD is to ignite a revolution in India's food landscape. We aspire to be the nation's most cherished and trusted direct-to-consumer organic brand, a beacon of <strong>uncompromising purity, sustainable practices, and empowered local communities</strong>. We envision a future where every Indian home effortlessly enjoys <strong>truly authentic, farm-fresh organic goodness</strong>, fostering profound well-being and unbreakable trust with every bite.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3 text-green-800">Our Mission</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our <strong>mission</strong> is to be the unwavering bridge between nature's untouched bounty and your family's table. From our biodiverse farmlands in Mangalore, India, we meticulously source and deliver <strong>premium, high-quality organic foods</strong> – starting with our unique <strong>Organic Forest Honey</strong> and pristine <strong>Virgin Coconut Oil</strong>. We champion <strong>radical transparency</strong>, empowering you with complete visibility into every step: from origin and cultivation to processing.
                  </p>
                </div>
              </div>
            </div>

            {/* Legacy Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🌿</span>
                <h3 className="text-2xl font-bold">Our Legacy</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  At Guthinabailu Farms, we have been cultivating nature's goodness for generations. For decades, our family has traditionally produced pure honey and cold-pressed virgin coconut oil, offering them to friends, neighbors, and anyone who sought authentic, farm-fresh products.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What began as a humble, community-driven endeavor has evolved in response to growing demand. As more people began seeking our honey for daily consumption, immunity boosting, and medicinal purposes, we realized the need to bring structure and scalability to our offerings—without compromising on purity or ethics.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Thus, Guthinabailu Organic Food Products Pvt. Ltd. was founded.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Honey Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🍯</span>
                <h3 className="text-2xl font-bold">Our Honey</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our honey is not wild honey collected from forest hives. Instead, it is pure, raw, and unprocessed honey sourced directly from beekeeping boxes placed on our farmland. These bee colonies forage in a biodiverse ecosystem rich in native flowers, herbs, and fruit trees.
              </p>
              <div className="bg-amber-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-amber-800">Key Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">✓</span>
                    Free from antibiotics and pesticides
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">✓</span>
                    Not blended or heated
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">✓</span>
                    Rich in enzymes, antioxidants, and natural flavors
                  </li>
                </ul>
              </div>
            </div>

            {/* Coconut Oil Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🥥</span>
                <h3 className="text-2xl font-bold">Virgin Coconut Oil</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Using traditional cold-pressing techniques, we produce virgin coconut oil from hand-picked, sun-dried coconuts grown organically on our farm. This method preserves the oil's natural properties and nutritional value.
              </p>
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-green-800">Key Benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Natural aroma and flavor
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Rich in lauric acid, vitamins E & K
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Antimicrobial and moisturizing properties
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Promise Card */}
          <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">✅</span>
              <h3 className="text-2xl font-bold">Our Promise</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <span className="text-3xl mb-3 block">🌱</span>
                <h4 className="font-semibold mb-2">Sustainably Farmed</h4>
                <p className="text-gray-600 text-sm">Eco-friendly practices that respect nature</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <span className="text-3xl mb-3 block">🧪</span>
                <h4 className="font-semibold mb-2">100% Natural</h4>
                <p className="text-gray-600 text-sm">No chemicals, no additives, just pure nature</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <span className="text-3xl mb-3 block">🔍</span>
                <h4 className="font-semibold mb-2">Quality Tested</h4>
                <p className="text-gray-600 text-sm">Rigorous testing for purity and quality</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <span className="text-3xl mb-3 block">❤️</span>
                <h4 className="font-semibold mb-2">Crafted with Care</h4>
                <p className="text-gray-600 text-sm">Deep connection to our land and traditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 