import React from 'react';

const Trust = React.forwardRef((props, ref) => (
  <section ref={ref} id="trust" className="section-padding bg-green-50">
    <div className="container mx-auto px-6 text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Promise: Radical Transparency & Verifiable Purity</h2>
      <p className="text-lg text-gray-700 mb-8">
        In a market where trust is often compromised, Guthinabailu stands for absolute authenticity. We guarantee the purity of every product through a rigorous, transparent process:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <span className="text-5xl mb-4 text-green-700">🌱</span>
          <h3 className="text-xl font-semibold mb-2">Ethical Sourcing</h3>
          <p className="text-gray-600">Currently sourced from <b>Guthinabailu farms</b>. In the future, based on demand, we will directly partner with local farmers, ensuring fair practices and genuine origin.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <span className="text-5xl mb-4 text-green-700">🔬</span>
          <h3 className="text-xl font-semibold mb-2">Advanced Testing</h3>
          <p className="text-gray-600">Every batch undergoes stringent lab tests, including NMR for honey, to confirm purity and quality.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <span className="text-5xl mb-4 text-green-700">📲</span>
          <h3 className="text-xl font-semibold mb-2">Digital Traceability</h3>
          <p className="text-gray-600">Scan QR codes on our packaging to access batch-specific origin and lab report details.</p>
        </div>
      </div>
    </div>
  </section>
));

export default Trust;
