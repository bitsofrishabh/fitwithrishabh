import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
}

export default function FlipCard({ icon: Icon, title, description, imageUrl }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[300px] w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-3/4">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="flex items-center gap-3 text-white">
                  <Icon className="w-8 h-8" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-teal-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-center">
            <p className="text-lg leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}