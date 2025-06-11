import React from 'react';

const Hero = ({ onShopNow, sectionRef }) => (
  <section ref={sectionRef} id="hero" className="relative bg-gradient-to-r from-green-600 to-green-800 text-white text-center py-20 md:py-32 overflow-hidden">
    <div className="container mx-auto px-6 z-10 relative">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        Pure from Farm, Direct to Your Home
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        Guthinabailu Organic Food Product PvT LTD brings you the finest organic forest honey and virgin coconut oil from Mangalore, India – nutrient-rich, wellness-boosting treasures straight from our farms to your table, supporting your health naturally.
      </p>
      <button
        onClick={onShopNow}
        className="inline-block bg-amber-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300"
      >
        Shop Now
      </button>
    </div>
  </section>
);

export default Hero;
