import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CloudinaryImage({ 
  publicId, 
  alt, 
  width = 500, 
  height = 500,
  className = ''
}: CloudinaryImageProps) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djdej77pl'
    }
  });

  const myImage = cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(fill().width(width).height(height));

  return (
    <div className={className}>
      <AdvancedImage cldImg={myImage} alt={alt} />
    </div>
  );
}