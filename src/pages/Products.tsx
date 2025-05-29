import React, { useState } from 'react';
import { ShoppingBag, Star, Search } from 'lucide-react';

const products = [
  // Green Tea
  {
    name: "Organic India Green Tea",
    description: "Pure and natural green tea for health and wellness",
    price: "₹199",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
    link: "https://amzn.to/3FrpiFa",
    category: "Green Tea"
  },
  {
    name: "Chamomile Tea",
    description: "Soothing chamomile tea for relaxation and better sleep",
    price: "₹299",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2",
    link: "https://amzn.to/4mAOz0f",
    category: "Green Tea"
  },
  {
    name: "Blue Tea: SpearMint",
    description: "Refreshing spearmint blue tea blend",
    price: "₹249",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2",
    link: "https://amzn.to/43ixKzD",
    category: "Green Tea"
  },
  {
    name: "Flurys Tulsi",
    description: "Traditional tulsi tea for immunity and wellness",
    price: "₹179",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2",
    link: "https://amzn.to/4joY1RA",
    category: "Green Tea"
  },

  // Apple Cider Vinegar
  {
    name: "WOW Life Apple Cider Vinegar",
    description: "Raw, unfiltered apple cider vinegar with mother",
    price: "₹399",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1598346762291-aee88549193f",
    link: "https://amzn.in/d/1og3eCX",
    category: "Apple Cider Vinegar"
  },
  {
    name: "Kapiva Himalayan ACV",
    description: "Premium Himalayan apple cider vinegar",
    price: "₹449",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1598346762291-aee88549193f",
    link: "https://amzn.in/d/3BFiGXi",
    category: "Apple Cider Vinegar"
  },
  {
    name: "The Plant Fix Plix ACV Tablets",
    description: "Convenient ACV tablets for on-the-go wellness",
    price: "₹599",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1598346762291-aee88549193f",
    link: "https://amzn.to/4dW7ejn",
    category: "Apple Cider Vinegar"
  },

  // Seeds and Dry Fruits
  {
    name: "Farmley Edible Seeds Combo",
    description: "Premium quality mixed seeds for daily nutrition",
    price: "₹499",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.to/4jp1yzh",
    category: "Seeds"
  },
  {
    name: "True Elements 7 in 1 Seeds Mix",
    description: "Nutritious blend of seven essential seeds",
    price: "₹449",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.in/d/9sCA51p",
    category: "Seeds"
  },
  {
    name: "Yoga bar Brazil Nuts",
    description: "Premium quality Brazil nuts rich in selenium",
    price: "₹799",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.to/3FfFEAG",
    category: "Dry Fruits"
  },
  {
    name: "Happilo Almonds",
    description: "Premium California almonds",
    price: "₹699",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.in/d/cRRBooR",
    category: "Dry Fruits"
  },

  // Grains
  {
    name: "True Elements Rolled Oats",
    description: "100% whole grain rolled oats",
    price: "₹299",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.in/d/hxnFVnv",
    category: "Grains"
  },
  {
    name: "MB High Protein Oats",
    description: "High protein oats for fitness enthusiasts",
    price: "₹349",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.to/4myu2cy",
    category: "Grains"
  },
  {
    name: "Quaker Oats",
    description: "Classic rolled oats for healthy breakfast",
    price: "₹199",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599002354737-0d0426569d3e",
    link: "https://amzn.in/d/f7ICOu5",
    category: "Grains"
  }
];

const categories = [...new Set(products.map(product => product.category))];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product =>
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recommended Products
          </h1>
          <p className="text-xl text-gray-600">
            Quality products to support your wellness journey
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
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
                <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
                  {product.category}
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