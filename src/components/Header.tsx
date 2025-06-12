'use client';

import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onShowSection: (section: string) => void;
  cartItemCount: number;
  onShowLogin: () => void;
}

export default function Header({ onShowSection, cartItemCount, onShowLogin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'About', section: 'about' },
    { label: 'Products', section: 'products' },
    { label: 'Trust', section: 'trust' },
    { label: 'Why D2C', section: 'why-d2c' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (section: string) => {
    onShowSection(section);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-2xl font-bold hover:text-green-800 transition-colors"
            >
              <span className="text-green-700">Guthinabailu</span> <span className="text-amber-500">Organic</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onShowLogin}
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors border border-green-700 rounded px-4 py-1 ml-4"
            >
              Login
            </button>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onShowSection('cart')}
              className="relative p-2 rounded-full text-gray-700 hover:text-green-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    handleNavClick(item.section);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-green-700 text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onShowLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-700 text-sm font-medium border border-green-700 rounded px-4 py-1"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}