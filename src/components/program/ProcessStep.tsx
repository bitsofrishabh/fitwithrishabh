import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export default function ProcessStep({ step, title, description, icon, isActive }: ProcessStepProps) {
  const IconComponent = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;

  return (
    <div className={`flex-1 relative ${isActive ? 'scale-105' : 'opacity-70'}`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          isActive ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {step}
        </div>
        <div className={`flex items-center gap-2 mb-2 ${isActive ? 'text-teal-600' : 'text-gray-500'}`}>
          <IconComponent className="w-5 h-5" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 max-w-xs">{description}</p>
      </div>
      {/* Connector line */}
      <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
        isActive ? 'bg-teal-600' : 'bg-gray-200'
      }`} />
    </div>
  );
}
