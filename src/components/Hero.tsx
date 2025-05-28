import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-teal-50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Life Through Holistic Health
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Discover personalized wellness solutions that empower you to live your healthiest, most vibrant life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://topmate.io/fitbyrishab/1033630" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition text-center"
              >
                Book Consultation
              </a>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
                Learn More <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative aspect-video">
            <iframe
              className="w-full h-full rounded-2xl shadow-xl"
              src="https://www.youtube.com/embed/ULHUasd3dck"
              title="Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}