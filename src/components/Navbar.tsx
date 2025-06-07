import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu"
import { Button } from "../components/ui/button"
import { Menu, X } from 'lucide-react';
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

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            The Balance Diet
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/products" className="text-foreground hover:text-primary px-4 py-2">
                    Products
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/workout-section" className="text-foreground hover:text-primary px-4 py-2">
                    Workouts
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/referral" className="text-foreground hover:text-primary px-4 py-2">
                    Referral
                  </Link>
                </NavigationMenuItem>

                {user && (
                  <NavigationMenuItem>
                    <Link to="/admin/clients" className="text-foreground hover:text-primary px-4 py-2">
                      Clients
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild>
              <Link to="/schedule">
                Book Follow-up
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white shadow-lg border-t">
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/products"
                className="block py-2 text-foreground hover:text-primary"
              >
                Products
              </Link>
              <Link
                to="/workout-section"
                className="block py-2 text-foreground hover:text-primary"
              >
                Workouts
              </Link>
              <Link
                to="/referral"
                className="block py-2 text-foreground hover:text-primary"
              >
                Referral
              </Link>
              {user && (
                <Link
                  to="/admin/clients"
                  className="block py-2 text-foreground hover:text-primary"
                >
                  Clients
                </Link>
              )}
              <Button className="w-full" asChild>
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