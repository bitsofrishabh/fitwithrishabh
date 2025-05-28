import React, { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { PROGRAM_SECTIONS } from '../lib/constants';
import { motion, useReducedMotion } from 'framer-motion';
import CloudinaryImage from '../components/CloudinaryImage';

export default function ProgramFeatures() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFeature, setActiveFeature] = useState(0);
  const features = PROGRAM_SECTIONS.uniqueFeatures;

  const fadeInAnimation = shouldReduceMotion ? {} : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">
            How We Help You Achieve Your Goals
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Interactive Feature Cards */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              {features.map((feature, index) => {
                const isActive = index === activeFeature;

                return (
                  <div
                    key={feature.id}
                    className={`relative p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'bg-teal-50 shadow-lg transform -translate-x-2' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-l-2xl" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 ${
                        isActive ? 'ring-2 ring-teal-600' : ''
                      }`}>
                        <CloudinaryImage
                          publicId={feature.image}
                          alt={feature.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className={`text-base md:text-lg font-semibold mb-2 ${
                          isActive ? 'text-teal-600' : 'text-gray-900'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Representation */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {features.map((feature, index) => {
                    const isActive = index === activeFeature;

                    return (
                      <motion.div
                        key={feature.id}
                        className="absolute w-[280px] md:w-[400px]"
                        {...fadeInAnimation}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.8,
                          display: isActive ? 'block' : 'none'
                        }}
                      >
                        <div className="relative">
                          {/* Background Circles */}
                          <div className="absolute -inset-4 bg-teal-200 rounded-full opacity-20 animate-pulse" />
                          <div className="absolute -inset-8 bg-teal-200 rounded-full opacity-10 animate-pulse delay-100" />
                          <div className="absolute -inset-12 bg-teal-200 rounded-full opacity-5 animate-pulse delay-200" />
                          
                          {/* Feature Image */}
                          <div className="relative overflow-hidden rounded-3xl shadow-xl">
                            <CloudinaryImage
                              publicId={feature.image}
                              alt={feature.title}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-teal-200 rounded-full opacity-20" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-300 rounded-full opacity-10" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-400 rounded-full opacity-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}