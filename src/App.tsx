import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import AdminBlogList from './pages/AdminBlogList';
import BlogEditor from './pages/BlogEditor';
import ProgramFeatures from './pages/ProgramFeatures';
import GettingStarted from './pages/GettingStarted';
import WorkoutSection from './pages/WorkoutSection';
import Referral from './pages/Referral';
import Products from './pages/Products';
import Schedule from './pages/Schedule';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/blogs" element={<AdminBlogList />} />
              <Route path="/admin/blogs/new" element={<BlogEditor />} />
              <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
              <Route path="/program-features" element={<ProgramFeatures />} />
              <Route path="/getting-started" element={<GettingStarted />} />
              <Route path="/workout-section" element={<WorkoutSection />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/products" element={<Products />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}