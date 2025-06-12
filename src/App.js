import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Trust from './components/Trust';
import WhyD2C from './components/WhyD2C';
import Contact from './components/Contact';
import Footer from './Footer';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import './App.css';

function App() {
  // Section navigation state
  const [section, setSection] = useState('hero');
  // Cart state
  const [cart, setCart] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('guthinabailuCart') : null;
    return stored ? JSON.parse(stored) : [];
  });
  // Cart count
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  // Checkout/order state
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  // Login/signup modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Section navigation
  const handleShowSection = (id) => {
    setSection(id);
    setShowCart(false);
    setShowCheckout(false);
    setShowOrderSuccess(false);
    setShowLogin(false);
    setShowSignup(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Cart logic
  const updateCartCount = (newCart) => {
    // For compatibility with Cart/Products
    // (no-op, handled by state)
  };

  return (
    <div className="bg-stone-50 text-gray-800 min-h-screen font-[Inter,sans-serif]">
      <Header onShowSection={handleShowSection} cartItemCount={cartItemCount} onShowLogin={() => setShowLogin(true)} />
      <main id="main-content">
        <Hero onShopNow={() => handleShowSection('products')} sectionRef={null} />
        <About ref={null} />
        <Products
          cart={cart}
          setCart={setCart}
          updateCartCount={updateCartCount}
          onShowSection={handleShowSection}
        />
        <Trust ref={null} />
        <WhyD2C ref={null} />
        <Contact ref={null} />
        <Cart
          cart={cart}
          setCart={setCart}
          updateCartCount={updateCartCount}
          onShowSection={handleShowSection}
          isActive={showCart}
        />
        <Checkout
          cart={cart}
          onShowSection={handleShowSection}
          isActive={showCheckout}
          onClose={() => setShowCheckout(false)}
          setCart={setCart}
          onOrderSuccess={() => {
            setShowCheckout(false);
            setShowOrderSuccess(true);
            setCart([]);
            localStorage.setItem('guthinabailuCart', '[]');
          }}
        />
        <OrderSuccess
          onShowSection={handleShowSection}
          isActive={showOrderSuccess}
        />
      </main>
      <Footer />
      <LoginModal
        isActive={showLogin}
        onClose={() => setShowLogin(false)}
        onShowSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        isActive={showSignup}
        onClose={() => setShowSignup(false)}
        onShowLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

export default App;
