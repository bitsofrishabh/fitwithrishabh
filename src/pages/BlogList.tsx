import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CloudinaryImage from '../components/CloudinaryImage';

export default function BlogList() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['public-blogs'],
    queryFn: async () => {
      const blogsQuery = query(
        collection(db, 'blogs'),
        where('status', '==', 'published'),
        orderBy('created_at', 'desc')
      );
      
      const snapshot = await getDocs(blogsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Health & Wellness Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog: any) => (
            <article key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <CloudinaryImage
                publicId={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-3">
                  {new Date(blog.created_at).toLocaleDateString()}
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/blog/${blog.id}`} className="hover:text-teal-600">
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-teal-600 font-semibold hover:text-teal-700"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}