'use client';

import React, { useState } from 'react';
import { FaCreditCard, FaGooglePay, FaApplePay, FaPaypal, FaMobileAlt } from 'react-icons/fa';
import { SiPhonepe, SiPaytm, SiAmazonpay } from 'react-icons/si';
import { BsCreditCard2Front, BsWallet2 } from 'react-icons/bs';

interface PaymentProps {
  total: number;
  onSuccess: () => void;
  onClose: () => void;
  onShowProducts?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ total = 0, onSuccess, onClose, onShowProducts }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [upiValidationError, setUpiValidationError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [walletDetails, setWalletDetails] = useState({
    number: '',
    pin: ''
  });

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <FaCreditCard className="w-6 h-6" />,
      description: 'Pay with Visa, Mastercard, or other credit cards'
    },
    {
      id: 'debit-card',
      name: 'Debit Card',
      icon: <BsCreditCard2Front className="w-6 h-6" />,
      description: 'Pay with your bank debit card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <FaMobileAlt className="w-6 h-6" />,
      description: 'Pay using any UPI app'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: <FaGooglePay className="w-6 h-6" />,
      description: 'Fast and secure payments'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: <SiPhonepe className="w-6 h-6" />,
      description: 'India\'s leading UPI payment app'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: <SiPaytm className="w-6 h-6" />,
      description: 'Pay using Paytm wallet or UPI'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: <FaApplePay className="w-6 h-6" />,
      description: 'Quick and secure payments'
    },
    {
      id: 'amazon-pay',
      name: 'Amazon Pay',
      icon: <SiAmazonpay className="w-6 h-6" />,
      description: 'Pay using your Amazon account'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <BsWallet2 className="w-6 h-6" />,
      description: 'Pay using digital wallet'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="w-6 h-6" />,
      description: 'International payments'
    }
  ];

  const validateUpiId = (id: string, method: string): boolean => {
    // Basic UPI ID format validation
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(id)) {
      setUpiValidationError('Please enter a valid UPI ID (e.g., name@bank)');
      return false;
    }

    // Method-specific validation
    switch (method) {
      case 'google-pay':
        if (!id.toLowerCase().includes('@ok')) {
          setUpiValidationError('Please enter a valid Google Pay UPI ID');
          return false;
        }
        break;
      case 'phonepe':
        if (!id.toLowerCase().includes('@ybl')) {
          setUpiValidationError('Please enter a valid PhonePe UPI ID');
          return false;
        }
        break;
      case 'paytm':
        if (!id.toLowerCase().includes('@paytm')) {
          setUpiValidationError('Please enter a valid Paytm UPI ID');
          return false;
        }
        break;
      default:
        break;
    }

    setUpiValidationError('');
    return true;
  };

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpiId(value);
    if (value) {
      validateUpiId(value, selectedMethod);
    } else {
      setUpiValidationError('');
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;

    // Validate UPI ID if UPI method is selected
    if (['upi', 'google-pay', 'phonepe', 'paytm'].includes(selectedMethod)) {
      if (!validateUpiId(upiId, selectedMethod)) {
        return;
      }
    }
    
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Payment processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWalletInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWalletDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formattedTotal = typeof total === 'number' ? total.toFixed(2) : '0.00';

  const renderPaymentInputs = () => {
    switch (selectedMethod) {
      case 'credit-card':
      case 'debit-card':
        return (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Card Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border rounded-md"
                  maxLength={19}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                  placeholder="John Doe"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded-md"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  className="w-full p-2 border rounded-md"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        );

      case 'upi':
      case 'google-pay':
      case 'phonepe':
      case 'paytm':
        return (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">UPI Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={handleUpiIdChange}
                placeholder={
                  selectedMethod === 'google-pay' ? 'example@ok' :
                  selectedMethod === 'phonepe' ? 'example@ybl' :
                  selectedMethod === 'paytm' ? 'example@paytm' :
                  'example@upi'
                }
                className={`w-full p-2 border rounded-md ${
                  upiValidationError ? 'border-red-500' : ''
                }`}
              />
              {upiValidationError && (
                <p className="text-red-500 text-sm mt-1">{upiValidationError}</p>
              )}
              <div className="mt-4 text-sm text-gray-600">
                <p>Please enter your {selectedMethod === 'google-pay' ? 'Google Pay' :
                  selectedMethod === 'phonepe' ? 'PhonePe' :
                  selectedMethod === 'paytm' ? 'Paytm' : 'UPI'} ID</p>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Wallet Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={walletDetails.number}
                  onChange={handleWalletInputChange}
                  placeholder="Enter wallet number"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN
                </label>
                <input
                  type="password"
                  name="pin"
                  value={walletDetails.pin}
                  onChange={handleWalletInputChange}
                  placeholder="Enter PIN"
                  className="w-full p-2 border rounded-md"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. An order confirmation has been sent to your email.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                onSuccess();
                onShowProducts?.();
              }}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Explore Products
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Select Payment Method</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-700 mb-2">Total Amount</div>
          <div className="text-3xl font-bold text-green-600">₹{formattedTotal}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethod(method.id);
                setUpiId('');
                setUpiValidationError('');
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-4 hover:border-green-500 hover:shadow-md ${
                selectedMethod === method.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-2xl text-gray-700">{method.icon}</div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
            </button>
          ))}
        </div>

        {renderPaymentInputs()}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing || (['upi', 'google-pay', 'phonepe', 'paytm'].includes(selectedMethod) && !upiId)}
            className={`px-6 py-2 rounded-md text-white font-semibold ${
              !selectedMethod || isProcessing || (['upi', 'google-pay', 'phonepe', 'paytm'].includes(selectedMethod) && !upiId)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment; 