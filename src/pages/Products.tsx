import React, { useState } from 'react';
import { ShoppingBag, Star, Search } from 'lucide-react';

const products = [
  {
    name: "Digital Weight Scale",
    description: "High-precision weight measurement for accurate progress tracking",
    price: "₹1,299",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
    link: "https://amzn.to/xyz123"
  },
  {
    name: "Resistance Bands Set",
    description: "Complete set of exercise bands for home workouts",
    price: "₹799",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517344368193-41552b6ad3f5",
    link: "https://amzn.to/abc456"
  },
  {
    name: "Premium Yoga Mat",
    description: "Extra thick, non-slip exercise mat for comfort and stability",
    price: "₹999",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    link: "https://amzn.to/def789"
  },
  {
    name: "Smart Fitness Tracker",
    description: "Track your activity, heart rate, and sleep patterns",
    price: "₹2,499",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1557858310-9052820906f7",
    link: "https://amzn.to/ghi012"
  }
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recommended Products
          </h1>
          <p className="text-xl text-gray-600">
            Quality equipment to support your fitness journey
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">{product.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal-600">{product.price}</span>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}