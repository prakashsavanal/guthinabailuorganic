import React from 'react';

const Contact = React.forwardRef((props, ref) => (
  <section ref={ref} id="contact" className="section-padding bg-green-700 text-white text-center">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Pure Organic Goodness?</h2>
      <p className="text-lg mb-8">
        Join the Guthinabailu family and embark on a journey of health and trust. Stay tuned for our mobile app launch for seamless ordering and complete product traceability!
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a href="#" className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300">
          Stay Updated (Coming Soon)
        </a>
        <a href="mailto:info@guthinabailu.com" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-green-700 transition-colors duration-300">
          Contact Us
        </a>
      </div>
      <p className="mt-8 text-sm text-gray-200">
        Guthinabailu Organic Food Product PvT LTD, Mangalore, India
      </p>
    </div>
  </section>
));

export default Contact;
