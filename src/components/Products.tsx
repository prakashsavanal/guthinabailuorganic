'use client';

import React, { useState, useEffect } from 'react';
import ProductGallery from './ProductGallery';
import { useInView } from 'react-intersection-observer';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  quantity?: number;
}

interface ProductsProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  updateCartCount: (cart: Product[]) => void;
  onShowSection: (sectionId: string) => void;
}

const products: Product[] = [
  {
    id: 'honey-500g',
    name: 'Organic Forest Honey (500g)',
    price: 499,
    description: 'Pure, raw, and unadulterated honey from our forest-adjacent farmlands. Rich in natural enzymes.',
    image: '/Honey.jpg', // updated to correct image
    images: [
      '/Honey.jpg',
      '/Honey.jpg',
      '/Honey.jpg',
      '/Honey.jpg'
    ]
  },
  {
    id: 'vco-500ml',
    name: 'Virgin Coconut Oil (500ml)',
    price: 349,
    description: '100% cold-pressed from fresh organic coconuts. Unrefined and pure, perfect for cooking or wellness.',
    image: '/Virgin Coconut Oil.jpg', // updated to correct image
    images: [
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg'
    ]
  },
  {
    id: 'honey-1kg',
    name: 'Organic Forest Honey (1kg)',
    price: 899,
    description: 'Large pack of our signature forest honey, double the goodness for your family.',
    image: '/Honey.jpg', // updated to correct image
    images: [
      '/Honey.jpg',
      '/Honey.jpg',
      '/Honey.jpg',
      '/Honey.jpg'
    ]
  },
  {
    id: 'vco-1l',
    name: 'Virgin Coconut Oil (1 Litre)',
    price: 649,
    description: 'Family-sized bottle of our cold-pressed VCO. A kitchen essential for healthy living.',
    image: '/Virgin Coconut Oil.jpg', // updated to correct image
    images: [
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg',
      '/Virgin Coconut Oil.jpg'
    ]
  }
];

export default function Products({ cart, setCart, updateCartCount, onShowSection }: ProductsProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [itemsAdded, setItemsAdded] = useState<{ [key: string]: boolean }>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showQuickView, setShowQuickView] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsClient(true);
    try {
      // Load wishlist from localStorage
      const savedWishlist = localStorage.getItem('guthinabailuWishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      // Initialize addedToCart state based on cart items
      const initialAddedState: { [key: string]: boolean } = {};
      cart.forEach(item => {
        initialAddedState[item.id] = true;
      });
      setItemsAdded(initialAddedState);

      // Simulate loading products
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error initializing Products component:', error);
      setLoading(false);
    }
  }, [cart]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!isClient) return;

    try {
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
      
      if (newQuantity === 0) {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        updateCartCount(updatedCart);
        localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
        setItemsAdded(prev => ({ ...prev, [productId]: false }));
      } else {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
          const updatedCart = cart.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          setCart(updatedCart);
          updateCartCount(updatedCart);
          localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const addToCart = (product: Product) => {
    if (!isClient) return;

    try {
      const currentQuantity = quantities[product.id] || 1;
      
      if (currentQuantity === 0) {
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
        updateCartCount(updatedCart);
        localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
        setItemsAdded(prev => ({ ...prev, [product.id]: false }));
        return;
      }

      const existingItem = cart.find(item => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: currentQuantity }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: currentQuantity }];
      }

      setCart(updatedCart);
      updateCartCount(updatedCart);
      localStorage.setItem('guthinabailuCart', JSON.stringify(updatedCart));
      setItemsAdded(prev => ({ ...prev, [product.id]: true }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleViewCart = () => {
    onShowSection('cart');
  };

  const toggleWishlist = (product: Product) => {
    if (!isClient) return;

    try {
      const isInWishlist = wishlist.some(item => item === product.id);
      let updatedWishlist;

      if (isInWishlist) {
        updatedWishlist = wishlist.filter(item => item !== product.id);
      } else {
        updatedWishlist = [...wishlist, product.id];
      }

      setWishlist(updatedWishlist);
      localStorage.setItem('guthinabailuWishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item === productId);
  };

  if (!isClient || loading) {
    return (
      <section id="products" className="py-16 bg-gray-50" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-32 h-32 object-contain mx-auto rounded-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
                  onClick={() => setShowQuickView(product.id)}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-0 right-0 text-2xl transition-transform duration-300 hover:scale-110 ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-green-700 mb-4">₹{product.price.toFixed(2)}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, Math.max(0, (quantities[product.id] || 1) - 1))}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-16 p-2 border rounded text-center">
                    {quantities[product.id] || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${
                    itemsAdded[product.id]
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-green-700 text-white hover:bg-green-800'
                  }`}
                >
                  {quantities[product.id] === 0 ? 'Add to Cart' : (itemsAdded[product.id] ? 'Added' : 'Add to Cart')}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <button
            onClick={handleViewCart}
            className="bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-800 transition-colors duration-300"
          >
            View Cart ({cart.length})
          </button>
        </div>
      </div>

      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">{products.find(p => p.id === showQuickView)?.name}</h3>
              <button
                onClick={() => setShowQuickView(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="mb-6">
              <ProductGallery
                images={products.find(p => p.id === showQuickView)?.images || [products.find(p => p.id === showQuickView)?.image || '']}
                productName={products.find(p => p.id === showQuickView)?.name || ''}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-green-700">₹{products.find(p => p.id === showQuickView)?.price.toFixed(2)}</p>
              <button
                onClick={() => {
                  addToCart(products.find(p => p.id === showQuickView) || products[0]);
                  setShowQuickView(null);
                }}
                className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}