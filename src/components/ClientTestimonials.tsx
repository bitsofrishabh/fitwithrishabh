import React from 'react';

const testimonialVideos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/qj-kUHSIkMQ',
    title: 'Client Success Story 1'
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/YccLtwZNA-A',
    title: 'Client Success Story 2'
  },
  {
    id: 3,
    url: 'https://www.youtube.com/shorts/_-lfp0PJBXc',
    title: 'Client Success Story 3'
  }
];

export default function ClientTestimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Client Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonialVideos.map((video) => (
            <div key={video.id} className="relative aspect-square">
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}