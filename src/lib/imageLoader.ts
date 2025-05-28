import { AWS_IMAGE_URL } from './constants';

export const getImageUrl = (path: string): string => {
  // If the image URL is already a full URL (e.g., https://...), return it as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Otherwise, prepend the AWS S3 bucket URL
  return `${AWS_IMAGE_URL}/${path}`;
};