import React from 'react';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description?: string;
  icon: string;
  className?: string;
}

export default function FeatureCard({ title, description, icon, className = '' }: FeatureCardProps) {
  const Icon = Icons[icon as keyof typeof Icons] || Icons.Circle;

  return (
    <div className={`group p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors duration-300">
            <Icon className="w-6 h-6 text-teal-600" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}