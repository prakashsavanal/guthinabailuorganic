'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
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

// Dynamically import components that use browser APIs
const DynamicProducts = dynamic(() => import('@/components/Products'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  ),
});

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      // Load cart from localStorage
      const savedCart = localStorage.getItem('guthinabailuCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        // Save cart to localStorage
        localStorage.setItem('guthinabailuCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cart, isClient]);

  const updateCartCount = () => {
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
      const targetSection = document.getElementById(section);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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

  const handleShowLogin = () => {
    setIsLoginOpen(true);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      }>
        <Header 
          onShowSection={handleShowSection} 
          cartItemCount={updateCartCount()} 
          onShowLogin={handleShowLogin}
        />
        <Hero onShowSection={handleShowSection} />
        <About />
        <DynamicProducts
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
          onShowSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />

        <SignupModal
          isActive={isSignupOpen}
          onClose={handleCloseModals}
          onShowLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Suspense>
    </main>
  );
} 