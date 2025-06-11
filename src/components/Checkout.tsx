'use client';

import React, { useState } from 'react';
import Payment from '@/components/Payment';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  quantity?: number;
}

interface CheckoutProps {
  cart: Product[];
  onShowSection: (section: string) => void;
  isActive: boolean;
  onClose: () => void;
  setCart: (cart: Product[]) => void;
  onOrderSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  onShowSection,
  isActive,
  onClose,
  setCart,
  onOrderSuccess
}) => {
  const [currentStep, setCurrentStep] = useState('address');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [showPayment, setShowPayment] = useState(false);

  if (!isActive) {
    return null;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowPayment(false);
    onOrderSuccess();
  };

  const handleClose = () => {
    setShowPayment(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>

        {!showPayment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h3>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input type="text" id="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Street address, P.O. box, company name, c/o" required />
                </div>
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                  <input type="text" id="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Apartment, suite, unit, building, floor, etc." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input type="text" id="pincode" value={formData.pincode} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => onShowSection('cart')}
                    className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                  >
                    &larr; Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold text-gray-800">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <Payment total={total} onSuccess={handlePaymentSuccess} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default Checkout; 