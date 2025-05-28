import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, ArrowRight, Star } from 'lucide-react';

const recommendedProducts = [
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
  },
  {
    name: "Protein Shaker Bottle",
    description: "Leak-proof bottle with mixing ball for smooth shakes",
    price: "₹399",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d",
    link: "https://amzn.to/jkl345"
  },
  {
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery",
    price: "₹899",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c",
    link: "https://amzn.to/mno678"
  }
];

const steps = [
  {
    title: "Complete Your Payment",
    description: "Choose your preferred program package and complete the payment process.",
    action: "Book a Consultation"
  },
  {
    title: "Review Terms & Conditions",
    description: "Carefully read and understand our program terms and conditions.",
    action: "Read Terms"
  },
  {
    title: "Initial Consultation",
    description: "Schedule your first call with our team to discuss your goals and create your personalized plan.",
    action: "Schedule Call"
  },
  {
    title: "Get Your Equipment",
    description: "Purchase recommended equipment for effective home workouts.",
    action: "View Products"
  }
];

export default function GettingStarted() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Getting Started Guide
          </h1>
          <p className="text-xl text-gray-600">
            Follow these steps to begin your transformation journey
          </p>
        </div>

        {/* Steps Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  {index === 0 && (
                    <a
                      href="https://topmate.io/fitbyrishab/1033630"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                    >
                      {step.action} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  {index === 1 && (
                    <Link
                      to="/terms"
                      className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                    >
                      {step.action} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  {index === 2 && (
                    <a
                      href="https://calendly.com/your-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                    >
                      {step.action} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-8">Recommended Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
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

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Important Notes:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Equipment is recommended but not mandatory to start the program.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Alternative exercises will be provided if you don't have specific equipment.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">You can gradually build your home gym as you progress in the program.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}