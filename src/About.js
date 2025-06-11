import React from 'react';

const About = React.forwardRef((props, ref) => (
  <section ref={ref} id="about" className="section-padding bg-white">
    <div className="container mx-auto px-6 text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision & Mission</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Our <b>vision</b> at Guthinabailu Organic Food Product PvT LTD is to ignite a revolution in India's food landscape. We aspire to be the nation's most cherished and trusted direct-to-consumer organic brand, a beacon of <b>uncompromising purity, sustainable practices, and empowered local communities</b>. We envision a future where every Indian home effortlessly enjoys <b>truly authentic, farm-fresh organic goodness</b>, fostering profound well-being and unbreakable trust with every bite.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Our <b>mission</b> is to be the unwavering bridge between nature's untouched bounty and your family's table. From our biodiverse farmlands in Mangalore, India, we meticulously source and deliver <b>premium, high-quality organic foods</b> – starting with our unique <b>Organic Forest Honey</b> and pristine <b>Virgin Coconut Oil</b>. We champion <b>radical transparency</b>, empowering you with complete visibility into every step: from origin and cultivation to processing. Our direct relationships empower local farmers, safeguard natural ecosystems, and cultivate a thriving community bound by a shared passion for health, authenticity, and profound trust in every single product we offer.
      </p>
    </div>
  </section>
));

export default About;
