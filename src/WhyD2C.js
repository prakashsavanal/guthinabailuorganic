import React from 'react';

const WhyD2C = React.forwardRef((props, ref) => (
  <section ref={ref} id="why-d2c" className="section-padding bg-white">
    <div className="container mx-auto px-6 text-center max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Direct-to-Customer?</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Our D2C model ensures that you receive the freshest products directly from the source, without unnecessary intermediaries. This allows us to maintain strict quality control, provide fair compensation to our farmers, and offer you genuine organic products at fair prices. It's about transparency, freshness, and building a direct relationship with you, our valued customer.
      </p>
    </div>
  </section>
));

export default WhyD2C;
