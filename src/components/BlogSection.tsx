import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: "10 Simple Ways to Boost Your Energy Naturally",
    excerpt: "Discover natural methods to increase your daily energy levels without relying on caffeine...",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    date: "Mar 15, 2024",
    author: "Dr. Emily Chen"
  },
  {
    title: "The Mind-Body Connection: Understanding Holistic Health",
    excerpt: "Learn how mental and physical health are interconnected and why a holistic approach matters...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    date: "Mar 12, 2024",
    author: "Sarah Johnson"
  },
  {
    title: "Nutrition Tips for Optimal Wellness",
    excerpt: "Expert advice on creating a balanced diet that supports your overall health goals...",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    date: "Mar 10, 2024",
    author: "Mark Williams"
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Latest Articles</h2>
          <button className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
            View All <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{blog.date}</span>
                  <span>By {blog.author}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <button className="text-teal-600 font-semibold hover:text-teal-700">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}