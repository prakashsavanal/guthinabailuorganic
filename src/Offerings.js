import React from 'react';

const Offerings = React.forwardRef((props, ref) => (
  <section ref={ref} id="our-offerings" className="section-padding bg-stone-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Pure Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div className="text-6xl mb-6 text-amber-600">🍯</div>
          <h3 className="text-2xl font-semibold mb-4">Organic Forest Honey</h3>
          <p className="text-gray-700 mb-4">
            Our unique Organic Forest Honey is harvested from bee boxes carefully placed on our farmland in Savanal Village, Belthangady Taluk, Mangalore district. This location is adjacent to pristine forest areas, allowing bees to forage on diverse wild flora. The result is pure, raw, and unadulterated honey, rich in natural enzymes, antioxidants, and unique floral notes. Experience honey as nature intended, from our forest-adjacent farm to your home.
          </p>
          <h4 className="text-xl font-bold mt-6 mb-3 text-green-700">Health Benefits of Organic Forest Honey:</h4>
          <ul className="text-left text-gray-600 list-disc list-inside space-y-1">
            <li><b>Natural Energy Booster:</b> Provides quick and sustained energy, ideal for pre-workout or a natural pick-me-up.</li>
            <li><b>Rich in Antioxidants:</b> Contains flavonoids and phenolic acids which help combat oxidative stress and support overall cellular health.</li>
            <li><b>Soothes Coughs & Sore Throats:</b> Acts as a natural demulcent, coating the throat and providing relief from coughs and irritation.</li>
            <li><b>Boosts Immunity:</b> Its antibacterial and anti-inflammatory properties can strengthen the body's natural defenses against illness.</li>
            <li><b>Aids Digestion:</b> Can promote a healthy gut microbiome and may help alleviate mild digestive discomfort.</li>
            <li><b>Wound Healing:</b> Traditionally used topically for its antiseptic properties, aiding in minor wound healing.</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div className="text-6xl mb-6 text-emerald-600">🥥</div>
          <h3 className="text-2xl font-semibold mb-4">Virgin Coconut Oil</h3>
          <p className="text-gray-700 mb-4">
            Our virgin coconut oil is cold-pressed from fresh, organic coconuts, preserving its delicate aroma, flavor, and beneficial medium-chain fatty acids. Perfect for cooking, skin, and hair, it's a versatile superfood for your daily wellness.
          </p>
          <h4 className="text-xl font-bold mt-6 mb-3 text-green-700">Health Benefits of Virgin Coconut Oil:</h4>
          <ul className="text-left text-gray-600 list-disc list-inside space-y-1">
            <li><b>Heart Health Support:</b> Contains healthy fats (MCTs) like lauric acid, which may help improve cholesterol levels and support cardiovascular well-being.</li>
            <li><b>Weight Management Aid:</b> MCTs are easily metabolized by the body for energy, potentially increasing calorie burning and assisting with weight control.</li>
            <li><b>Antimicrobial Properties:</b> Lauric acid converts to monolaurin in the body, which has powerful antibacterial, antiviral, and antifungal effects.</li>
            <li><b>Skin & Hair Nourishment:</b> An excellent natural moisturizer for dry skin and a deep conditioner for hair, promoting softness and shine.</li>
            <li><b>Brain Health:</b> MCTs can serve as an alternative energy source for the brain, potentially improving cognitive function and providing neuroprotective benefits.</li>
            <li><b>Aids Nutrient Absorption:</b> Can help the body absorb fat-soluble vitamins (A, D, E, K) more effectively.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
));

export default Offerings;
