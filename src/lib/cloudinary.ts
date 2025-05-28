import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'djdej77pl'
  }
});

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_images');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cld.config.cloud.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  const data = await response.json();
  return data.public_id;
}