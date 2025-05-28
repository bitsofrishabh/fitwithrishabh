import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRequireAuth } from '../lib/auth';
import RichTextEditor from '../components/RichTextEditor';
import { uploadImage } from '../lib/cloudinary';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  status: 'draft' | 'published' | 'archived';
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useRequireAuth();

  const { register, handleSubmit, setValue, watch } = useForm<BlogFormData>();
  const content = watch('content');

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) return null;
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    },
    onSuccess: (data) => {
      if (data) {
        setValue('title', data.title);
        setValue('excerpt', data.excerpt);
        setValue('content', data.content);
        setValue('image', data.image);
        setValue('status', data.status);
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      if (id) {
        const docRef = doc(db, 'blogs', id);
        await updateDoc(docRef, {
          ...data,
          updated_at: serverTimestamp()
        });
      } else {
        const docRef = doc(collection(db, 'blogs'));
        await setDoc(docRef, {
          ...data,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/admin/blogs');
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const publicId = await uploadImage(file);
      setValue('image', publicId);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="max-w-4xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            {...register('title')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            {...register('excerpt')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <RichTextEditor
            value={content || ''}
            onChange={(value) => setValue('content', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            {id ? 'Update' : 'Create'} Post
          </button>
        </div>
      </form>
    </div>
  );
}