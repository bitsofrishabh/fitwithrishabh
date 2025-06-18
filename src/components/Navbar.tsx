import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "./ui/button";
import { Menu, X, Dumbbell } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled || isOpen 
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <div className="p-2 rounded-lg bg-primary/10">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="text-gradient">FitWithRishabh</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/program-features" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Programs
            </Link>
            <Link 
              to="/products" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              to="/workout-section" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Workouts
            </Link>
            <Link 
              to="/referral" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Referral
            </Link>
            {user && (
              <Link 
                to="/admin/clients" 
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Clients
              </Link>
            )}
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/schedule">
                Book Follow-up
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/program-features"
                className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Programs
              </Link>
              <Link
                to="/products"
                className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Products
              </Link>
              <Link
                to="/workout-section"
                className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Workouts
              </Link>
              <Link
                to="/referral"
                className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Referral
              </Link>
              {user && (
                <Link
                  to="/admin/clients"
                  className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Clients
                </Link>
              )}
              <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                <Link to="/schedule">
                  Book Follow-up
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}