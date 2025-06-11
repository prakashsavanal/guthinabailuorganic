'use client';

import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}

interface CartProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  updateCartCount: (cart: Product[]) => void;
  onShowSection: (sectionId: string) => void;
  isActive: boolean;
}

export default function Cart({ cart, setCart, updateCartCount, onShowSection, isActive }: CartProps) {
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full mx-4 animate-scale-in">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold">Your Shopping Cart</h2>
          <button
            onClick={() => onShowSection('product-order')}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
              <button
                onClick={() => onShowSection('product-order')}
                className="bg-green-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-800 transition-colors duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center bg-gray-50 p-4 rounded-lg animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-contain mr-4 rounded-md transition-transform duration-300 hover:scale-110"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-16 p-2 border rounded text-center">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors transform hover:scale-110 duration-200"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onShowSection('product-order')}
                className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => onShowSection('checkout')}
                className="bg-green-700 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-800 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 