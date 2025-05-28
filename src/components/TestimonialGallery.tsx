import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CloudinaryImage from './CloudinaryImage';

const transformations = [
  // ... existing transformations array
];

export default function TestimonialGallery() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInAnimation = shouldReduceMotion ? {} : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Transformation Gallery
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transformations.map((item) => (
              <motion.div
                key={item.id}
                {...fadeInAnimation}
                className="aspect-square group"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
                  <CloudinaryImage
                    publicId={item.publicId}
                    alt={item.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}