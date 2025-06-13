import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ProgramFeatures from './pages/ProgramFeatures';
import GettingStarted from './pages/GettingStarted';
import WorkoutSection from './pages/WorkoutSection';
import Referral from './pages/Referral';
import Products from './pages/Products';
import Schedule from './pages/Schedule';
import ClientManagement from './pages/ClientManagement';
import ClientProfile from './pages/ClientProfile';
import Home from './pages/Home';
import Terms from './pages/Terms';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/clients" element={<ClientManagement />} />
              <Route path="/admin/clients/:id" element={<ClientProfile />} />
              <Route path="/program-features" element={<ProgramFeatures />} />
              <Route path="/getting-started" element={<GettingStarted />} />
              <Route path="/workout-section" element={<WorkoutSection />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/products" element={<Products />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}