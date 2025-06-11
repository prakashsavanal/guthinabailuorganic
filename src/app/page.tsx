'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Trust from '@/components/Trust';
import WhyD2C from '@/components/WhyD2C';
import Contact from '@/components/Contact';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import OrderSuccess from '@/components/OrderSuccess';
import OrderTracking from '@/components/OrderTracking';
import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  quantity?: number;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('guthinabailuCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('guthinabailuCart', JSON.stringify(cart));
  }, [cart]);

  const updateCartCount = () => {
    // This function is now handled internally by Products and Cart components
    // But keeping it here for consistency if needed for other UI elements.
    return cart.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const handleUpdateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
  };

  const handleShowSection = (section: string) => {
    setActiveSection(section);

    // Close all modals first if navigating to a non-modal section
    const isModalSection = ['cart', 'checkout', 'order-success', 'order-tracking', 'login', 'signup'].includes(section);

    if (!isModalSection) {
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(false);
      setIsOrderTrackingOpen(false);
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }

    console.log(`Attempting to show section: ${section}`);

    if (section === 'cart') {
      setIsCartOpen(true);
    } else if (section === 'checkout') {
      setIsCheckoutOpen(true);
    } else if (section === 'order-success') {
      setIsOrderSuccessOpen(true);
    } else if (section === 'order-tracking') {
      setIsOrderTrackingOpen(true);
    } else if (section === 'login') {
      setIsLoginOpen(true);
    } else if (section === 'signup') {
      setIsSignupOpen(true);
    } else if (section === 'products' || section === 'hero' || section === 'about' || section === 'trust' || section === 'why-d2c' || section === 'contact') {
      // Only scroll if it's a section on the main page
      const targetSection = document.getElementById(section);
      if (targetSection) {
        console.log(`Found target section: ${section}. Attempting to scroll.`);
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          console.log(`Scrolled to section: ${section}`);
        }, 100); // Small delay to ensure DOM is ready
      } else {
        console.log(`Target section not found: ${section}`);
      }
    }
  };

  const handleCloseModals = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(false);
    setIsOrderTrackingOpen(false);
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const handleLoginSuccess = () => {
    console.log("User logged in!");
    handleCloseModals();
    // Potentially navigate to a dashboard or show a success message
  };

  const handleSignupSuccess = () => {
    console.log("User signed up!");
    handleCloseModals();
    // Potentially navigate to a dashboard or show a success message
  };

  const handleShowLoginFromSignup = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleShowSignupFromLogin = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <Header onShowSection={handleShowSection} cartItemCount={updateCartCount()} />
      <Hero onShowSection={handleShowSection} />
      <About />
      <Products
        cart={cart}
        setCart={handleUpdateCart}
        updateCartCount={updateCartCount}
        onShowSection={handleShowSection}
      />
      <Trust />
      <WhyD2C />
      <Contact />

      {/* Modals */}
      {isCartOpen && (
        <Cart
          cart={cart}
          setCart={handleUpdateCart}
          updateCartCount={updateCartCount}
          onShowSection={handleShowSection}
          isActive={isCartOpen}
        />
      )}
      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          onShowSection={handleShowSection}
          onClose={handleCloseModals}
          setCart={handleUpdateCart}
          onOrderSuccess={() => handleShowSection('order-success')}
          isActive={isCheckoutOpen}
        />
      )}
      {isOrderSuccessOpen && (
        <OrderSuccess
          onShowSection={handleShowSection}
          isActive={isOrderSuccessOpen}
        />
      )}
      {isOrderTrackingOpen && (
        <OrderTracking
          onClose={handleCloseModals}
          isActive={isOrderTrackingOpen}
        />
      )}

      <LoginModal
        isActive={isLoginOpen}
        onClose={handleCloseModals}
        onShowSignup={handleShowSignupFromLogin}
      />

      <SignupModal
        isActive={isSignupOpen}
        onClose={handleCloseModals}
        onShowLogin={handleShowLoginFromSignup}
      />
    </main>
  );
} 