import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  activeStep: number;
  onStepClick?: (index: number) => void;
}

export default function Stepper({ steps, activeStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <div
              key={step.id}
              className={`relative ${index !== steps.length - 1 ? 'pb-8' : ''}`}
              onClick={() => onStepClick?.(index)}
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-6 top-14 -ml-px h-full w-0.5 transition-colors duration-300 ${
                    isCompleted ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
              
              <div className="group relative flex items-start cursor-pointer">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-teal-600 ring-4 ring-teal-100'
                        : isCompleted
                        ? 'bg-teal-600'
                        : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6 text-white" />
                    ) : (
                      <div className={`${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {step.icon}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 min-w-0 flex-1">
                  <div
                    className={`text-xl font-semibold transition-colors duration-300 ${
                      isActive ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-600'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`mt-2 transition-all duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}