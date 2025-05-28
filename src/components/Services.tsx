import React, { useState, useEffect } from 'react';
import { PROGRAM_SECTIONS } from '../lib/constants';
import Stepper from './ui/Stepper';
import * as Icons from 'lucide-react';

export default function Services() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % PROGRAM_SECTIONS.features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = PROGRAM_SECTIONS.features.map(feature => ({
    id: feature.title.toLowerCase().replace(/\s+/g, '-'),
    title: feature.title,
    description: feature.description || '',
    icon: Icons[feature.icon as keyof typeof Icons] ? 
      React.createElement(Icons[feature.icon as keyof typeof Icons], { className: 'w-6 h-6' }) 
      : null
  }));

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Expert guidance for your specific health goals</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Stepper
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
        </div>
      </div>
    </section>
  );
}