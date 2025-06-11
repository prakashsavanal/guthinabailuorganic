'use client';

import React, { useState } from 'react';

interface OrderTrackingProps {
  isActive: boolean;
  onClose: () => void;
}

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export default function OrderTracking({ isActive, onClose }: OrderTrackingProps) {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const trackingSteps: TrackingStep[] = [
    {
      id: 'order-placed',
      title: 'Order Placed',
      description: 'Your order has been successfully placed',
      status: 'completed'
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'We are preparing your order',
      status: 'current'
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Your order is on its way',
      status: 'upcoming'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered',
      status: 'upcoming'
    }
  ];

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracking(true);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 transform transition-all duration-500 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Track Your Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!isTracking ? (
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your order ID"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Track Order
            </button>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="relative">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'completed'
                          ? 'bg-green-500'
                          : step.status === 'current'
                          ? 'bg-amber-500'
                          : 'bg-gray-200'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium text-white">{index + 1}</span>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 w-0.5 h-16 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsTracking(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Track Another Order
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 