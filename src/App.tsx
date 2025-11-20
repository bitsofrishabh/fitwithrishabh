import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutSection from './pages/WorkoutSection';
import Products from './pages/Products';

export default function App() {
  useEffect(() => {
    // Ensure the app stays in light mode
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<WorkoutSection />} />
            <Route path="/workout-section" element={<WorkoutSection />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<WorkoutSection />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
