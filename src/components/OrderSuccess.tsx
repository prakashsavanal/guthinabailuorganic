'use client';

import React from 'react';

interface OrderSuccessProps {
  onShowSection: (sectionId: string) => void;
  isActive: boolean;
}

export default function OrderSuccess({ onShowSection, isActive }: OrderSuccessProps) {
  if (!isActive) return null;

  return (
    <section id="order-success" className="section-padding bg-stone-50">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-8xl text-green-600 mb-6">✅</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase from Guthinabailu Organic Food Product PvT LTD. Your order has been received and is being processed.
          </p>
          <p className="text-gray-600 mb-8">
            You will receive an email confirmation shortly with your order details.
          </p>
          <button
            onClick={() => onShowSection('product-order')}
            className="bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-800 transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
} 